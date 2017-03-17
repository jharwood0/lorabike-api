process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let DeviceModels = require('../app/models/device');
let Device = DeviceModels.Device;
let Uplink = DeviceModels.Uplink;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe("Devices", () => {
  beforeEach((done) => {
    Device.remove({}, (err) => {
      done();
    });
  });

  /* GET /device/:id */
  describe("/GET/:id device", () => {
    it("it should GET a device by the given id", (done) => {
      let device = new Device({
        name: "TestDevice",
        activateTime : null,
        userId : null,
        devEUI : "0000000000000000",
        uplink : []
      });
      device.save((err, device) => {
        chai.request(server)
        .get('/device/' + device.id)
        .send(device)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('activateTime');
          res.body.should.have.property('userId');
          res.body.should.have.property('devEUI');
          res.body.should.have.property('uplink');
          res.body.should.have.property('_id').equal(device.id);
          done()
        });
      });
    });
  });
});
