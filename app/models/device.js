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
  description: {
    type: String,
    unique: false
  },
  uplinks: {
    type: [],
    default: []
  }
})


var Device = mongoose.model('Device', DeviceSchema);
module.exports = Device;
