let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;

/* models */
let device = require('./app/routes/device');

let config = require('config');
let options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
};

mongoose.connect(config.DBhost, options);
let db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error: '));

if(config.util.getEnv('NODE_ENV') !== "test"){
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/json'}));

app.get('/', (req, res) => res.json({message:"Welcome to the LoRaBike API!"}));

app.route("/device/:id")
    .get(device.getDevice)
    .delete(device.deleteDevice)
    .put(device.updateDevice);

app.listen(port)
console.log("Listening on port "+port);
module.exports = app;
