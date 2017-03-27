var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var DeviceSchema = new Schema({
  name: {
    type: String,
    unique: false
  },
  devEUI: {
    type: String,
    unique: true
  },
  appKey: {
    type: String,
    unique: true
  },
  uplinks: {
    type: [],
    default: []
  }
})


var Device = mongoose.model('Device', DeviceSchema);
module.exports = Device;
