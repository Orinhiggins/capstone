import time
import serial
import smtplib
from datetime import datetime
from influxdb_client import Point, InfluxDBClient
from influxdb_client.client.write_api import SYNCHRONOUS

influx_cloud_url = 'https://us-west-2-1.aws.cloud2.influxdata.com'
influx_cloud_token = 
bucket = 
org = 
kind = 'roomOne'
ser = serial.Serial('/dev/tty.usbserial-01BE29E7', 9600)
client = InfluxDBClient(url=influx_cloud_url, token=influx_cloud_token) 
while True:
    soundData = ser.readline().decode('utf-8')
    point = Point(kind).field('value', soundData).time(time=datetime.utcnow())
    print(f'Writing to InfluxDB cloud: {point.to_line_protocol()} ...')
    write_api = client.write_api(write_options=SYNCHRONOUS)
    write_api.write(bucket=bucket, org=org, record=point)
 

query =f'from(bucket:"{bucket}")|>range(start: -1d)|>filter(fn:(r)=>r._measurement == "{kind}")'

query_api = client.query_api()
tables = query.api.query(query=query,org=org)

for table in tables: 
    for row in table.records:
        print(f'{row.values["_time"]}:host={row.values["host"]},device={row.values["device"]}'f'{row.values["_value"]}')
# /dev/cu.usbserial-0001 '/dev/tty.usbserial-01BE29E7'


