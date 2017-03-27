
var request = require('request');
var base = "http://eu.thethings.network:8084";
var setDeviceUrl = "/applications/lorabike/devices";
var key = "ttn-account-v2.fGzE7iwVW8iw_JlhlwelYOJs7kPztjd_B2A4UWt4pMs";

module.exports = function(devId, devEui, description){
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
  console.log(device);
  var options = {
    url : base+setDeviceUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "key "+key
    },
    json: device
  };
  request(options, function(err, res, body){
    console.log(err);
    console.log(res.status);
    console.log(body);
  });
};
