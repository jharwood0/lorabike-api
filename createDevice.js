
var request = require('request');
var base = "http://eu.thethings.network:8084";
var setDeviceUrl = "/applications/lorabike/devices";
let config = require('config');

module.exports = function(devId, devEui, description, callback){
  var device = {
    app_id: "lorabike",
    dev_id: devId,
    lorawan_device: {
      activation_constraints: "local",
      app_eui: "70B3D57EF00041F8",
      app_id: "lorabike",
      app_key: "6F5A76EE295FB19C6E51095DD606498D",
      dev_addr: devEui.substring(0,8),
      dev_eui:  devEui,
      dev_id: devId,
      disable_f_cnt_check: false,
      f_cnt_down: 0,
      f_cnt_up: 0,
      last_seen: 0,
      uses32_bit_f_cnt: true
    }
  }
  var options = {
    url : base+setDeviceUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "key "+config.ttnAccessKey
    },
    json: device
  };
  request(options, function(err, res, body){
    console.log(err);
    console.log("Status = " + res.statusCode);
    console.log(body);
    if(res.statusCode == 200){
      console.log("Success!");
      callback(null);
    }else{
      console.log("Failed");
      callback(body);
    }
  });
};
