let mongoose = require('mongoose');
let DeviceModels = require('../models/device');

let Device = DeviceModels.Device;
let Uplink = DeviceModels.Uplink;

function getAuth(req, res){
  if(req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer') {
              var token = req.headers.authorization.split(' ')[1];
              try{
                var decodedtoken = jwt.decode(token, config.secret);
                return decodedtoken;
              }catch(err){
                return res.send({success: false, msg: 'invlaid token'});
              }
          }
          else {
              return res.json({success:false, msg: 'No header'});
          }
}

function getDevice(req, res){
  Device.findById(req.params.id, (err, device) => {
    if(err) res.send(err);
    if(device.userId == req.decoded._id){
      res.json(device);
    }else{
      return res.status(403).send({
          message: 'Not Authorised.'
      });
    }
  });
}

function deleteDevice(req, res){
    Device.findById(req.params.id, (err, device) => {
      if(err) res.send(err);
      if(device.userId == req.decoded._id){
        Device.remove(req.param.id, (err, result) => {
          res.json({message : "Device successfully deleted!", result })
        });
      }else{
        return res.status(403).send({
            message: 'Not Authorised.'
        });
      }
    });
}

function createDevice(req, res){
  /* Perform action */
  let newDevice = new Device(req.body);
  newDevice.userId = req.decoded._id;
  newDevice.save((err, device) => {
    if(err){
      res.send(err);
    }else{
      res.json({message:"Device successfully created!", device});
    }
  });
}

function updateDevice(req, res){
    Device.findById(req.params.id, (err, device) => {
      if(err) res.send(err);
      if(device.userId == req.decoded._id){
        Object.assign(device, req.body).save((err, device) => {
          if(err) res.send(err);
          res.json({message: "Device updated!", device});
        });
      }
    });

}

module.exports = {getDevice, createDevice, deleteDevice, updateDevice}
