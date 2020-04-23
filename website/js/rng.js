#!/usr/bin/env node
//////////////////////////////////////////
// Shows how to use InfluxDB write API. //
//////////////////////////////////////////

const {InfluxDB, Point, HttpError} = require('@influxdata/influxdb-client')
const {url, token, org, bucket} = require('./env')
const {hostname} = require('os')

console.log('*** WRITE POINTS ***')
const writeApi = new InfluxDB({url, token}).getWriteApi(org, bucket)
// setup default tags for all writes through this API
writeApi.useDefaultTags({location: hostname()})

while (true){
    const sound1 = new Point('sound')
        .tag('example', 'write.ts')
        .floatField('Room One', (450 * Math.random()))
    writeApi.writePoint(sound1)
    console.log(` ${sound1}`)
}
/*const sound2 = new Point('sound')
  .tag('example', 'write.ts')
  .floatField('value', (100 * Math.random()) / 10)
writeApi.writePoint(sound2)
console.log(` ${sound2}`)*/

// flush pending writes and close writeApi
/*writeApi
  .close()
  .then(() => {
    console.log('FINISHED ... now try ./query.ts')
  })
  .catch(e => {
    console.error(e)
    if (e instanceof HttpError && e.statusCode === 401) {
      console.log('Run ./onboarding.js to setup a new InfluxDB database.')
    }
    console.log('\nFinished ERROR')
  })*/