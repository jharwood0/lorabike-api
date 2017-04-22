var ttn = require('ttn');
var fs = require('fs');

let config = require('config');

var CircularBuffer = require("circular-buffer");
let bufferSize = 20;

let mongoose = require('mongoose');
let Device = require('./app/models/device');
let User = require('./app/models/user');

var region = 'eu';
var appId = 'lorabike';
var options = {
  protocol: 'mqtts',
  ca: [ fs.readFileSync('mqtt-ca.pem') ],
}

var client = new ttn.Client(region, appId, config.ttnAccessKey, [options]);

client.on('connect', function(connack) {
  console.log('[DEBUG]', 'Connect:', connack);
  console.log('[DEBUG]', 'Protocol:',
client.mqtt.options.protocol);
  console.log('[DEBUG]', 'Host:', client.mqtt.options.host);
  console.log('[DEBUG]', 'Port:', client.mqtt.options.port);
});

client.on('error', function(err) {
  console.error('[ERROR]', err.message);
});

client.on('activation', function(deviceId, data) {
  console.log('[INFO] ', 'Activation:', deviceId,
JSON.stringify(data, null, 2));
});

client.on('device', null, 'down/scheduled', function(deviceId,
data) {
  console.log('[INFO] ', 'Scheduled:', deviceId,
JSON.stringify(data, null, 2));
});

client.on('message', function(deviceName, data) {
  Device.findOne({"name":deviceName}, (err, device) => {
    if(err || device == null){
      console.log("Device " + deviceName + " does not exist...");
    }else{
      // create circ buf of uplinks
      var buf = new CircularBuffer(bufferSize);
      for(uplink of device.uplinks){
        buf.enq(uplink);
      }
      // push new data
      buf.enq(data.payload_fields)
      // save buf to db
      device.uplinks = buf.toarray();
      device.save((err, device) =>{
        if(err){
          console.log(err);
        }
      });
    }

  });
});
