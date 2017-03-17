let mongoose = require('mongoose');
let DeviceModels = require('../models/device');

let Device = DeviceModels.Device;
let Uplink = DeviceModels.Uplink;

function getDevice(req, res){
  /* 2nd Step Authorisation */
  //let token = req.headers.authorisation.split(' ')[1];
  //console.log("Your token is "+token);

  /* Perform action */
  Device.findById(req.params.id, (err, device) => {
    if(err) res.send(err);
    res.json(device);
  });
}

function deleteDevice(req, res){
    /* 2nd Step Authorisation */
    let token = req.headers.authorisation.split(' ')[1];
    console.log("Your token is "+token);

    /* Perform action */
    Device.remove(req.param.id, (err, result) => {
      res.json({message : "Device successfully deleted!", result })
    });
}

function updateDevice(req, res){
    /* 2nd Step Authorisation */
    let token = req.headers.authorisation.split(' ')[1];
    console.log("Your token is "+token);

    /* Perform action */
    Device.findById(req.params.id, (erro, device) => {
      if(err) res.send(err);
      Object.assign(device, req.body).save((err, device) => {
        if(err) res.send(err);
        res.json({message: "Device updated!", device});
      });
    });

}

module.exports = {getDevice, deleteDevice, updateDevice}
