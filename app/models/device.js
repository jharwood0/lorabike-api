var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UplinkSchema = new Schema({
  battery: {
    type: Number,
    unique: false,
    required: true
  },
  temperature: {
    type: Number,
    unique: false,
    required: true
  },
  latitude: {
    type: Number,
    unique: false,
    required: true
  },
  longitude: {
    type: Number,
    unique: false,
    required: true
  },
  altitude: {
    type: Number,
    unique: false,
    required: true
  },
  speed: {
    type: Number,
    unique: false,
    required: true
  },
  course: {
    type: Number,
    unique: false,
    required: true
  },
  timestamp: {
    type: Date,
    unique: false,
    required: true
  },
  ttf: {
    type: Number,
    unique: false,
    required: true
  },
  satellites: {
    type: Number,
    unique: false,
    required: true
  },
});

var DeviceSchema = new Schema({
  name:{
    type: String,
    unique: false
  },
  activateTime:{
    type: Date,
    required : false
  },
  userId:{
    type: Schema.Types.ObjectId,
    required: false
  },
  devEUI: {
    type: String,
    unique: true
  },
  uplink: {
    type: [UplinkSchema],
    required : false
  }
});

var Device = mongoose.model('Device', DeviceSchema);
var Uplink = mongoose.model('Uplink', UplinkSchema);

module.exports = {
	Device:Device,
	Uplink:Uplink
}
