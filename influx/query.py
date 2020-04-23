import time

import smtplib
from datetime import datetime
from influxdb_client import Point, InfluxDBClient
from influxdb_client.client.write_api import SYNCHRONOUS

influx_cloud_url = 'https://us-west-2-1.aws.cloud2.influxdata.com'
influx_cloud_token = '_iuIDTW5tIiQyIHNeU6H8s9Iz8x2NxS8MqV0dHawMoMQOPqn6VYrbj5tlHtK8wVp5S7KfTqI2_Z327xf3M8MVQ=='
bucket = 'testing'
org = 'ohiggins@kent.edu'
kind = 'roomOne'

client = InfluxDBClient(url=influx_cloud_url, token=influx_cloud_token) 
query =f'from(bucket:"{bucket}")|>range(start: -1d)|>filter(fn:(r)=>r._measurement == "{kind}")'

query_api = client.query_api()
tables = query_api.query(query=query,org=org)

for table in tables: 
    for row in table.records:
        print(f'{row.values["_time"]}:'f'{row.values["_value"]} ')