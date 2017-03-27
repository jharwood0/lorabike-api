var ttn = require('ttn');
var fs = require('fs');

let mongoose = require('mongoose');
let Device = require('./app/models/device');
let User = require('./app/models/user');

var options = {
  key: "key",
  token: "token",
  region: "eu"
}

var client = new ttn.HTTP(options);
console.log(client.getApplication("lorabike"));
