var ttn = require('ttn');
var fs = require('fs');

let mongoose = require('mongoose');
let Device = require('./app/models/device');
let User = require('./app/models/user');

var region = 'eu';
var appId = 'lorabike';
var accessKey = 'ttn-account-v2.tSEgx_BCi3N_FWw8URlDHWs9oyCSXlCJh_k835mtwGs';
var options = {
  protocol: 'mqtts',
  ca: [ fs.readFileSync('mqtt-ca.pem') ],
}

var client = new ttn.Client(region, appId, accessKey, [options]);

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
      console.log(err);
    }else{
      console.log(deviceId);
      console.log(data.payload_fields);
      device.uplink.push(data.payload_fields);
    }

  });
});
