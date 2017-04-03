let express = require('express');
let cors = require('cors');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
var uplinkHandler = require("./uplinkHandler");

var ttn = require('ttn');
var fs = require('fs'); /* fetching cert */
var ttnOptions = {
  protocol: 'mqtts',
  ca: [ fs.readFileSync('mqtt-ca.pem') ],
}

let jwt = require('jsonwebtoken');
let expressJWT = require('express-jwt');

let port = 8080;

/* auth */
let auth = require('./app/auth/auth');

let device = require('./app/routes/device');
let user = require('./app/routes/user');

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
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error: '));

if(config.util.getEnv('NODE_ENV') !== "test"){
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/json'}));

/* Catch all errorhandler */
router.use(function (err, req, res, next) {
    /* We log the error internaly */
    logger.error(err);

    /*
     * Remove Error's `stack` property. We don't want
     * users to see this at the production env
     */
    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

    /* Finaly respond to the request */
    res.status(err.statusCode || 500).json(err);
});

app.use(cors());

/* unauthenticated routes */
app.get('/', (req, res) => res.json({message:"Welcome to the LoRaBike API!"}));
app.route('/api/user/')
    .post(user.createUser);
app.route('/api/user/authenticate')
    .post(user.authenticateUser)

/* secure routes */
app.use(auth.authenticate);

app.route('/api/device/')
    .post(device.createDevice)
    .get(device.getDevices);
app.route("/api/device/:id")
    .get(device.getDevice)
    .delete(device.deleteDevice)
    .put(device.updateDevice);
app.route('/api/user/:id')
    .get(user.getUser)
    .delete(user.deleteUser)
    .put(user.updateUser);

app.listen(port)
console.log("Listening on port "+port);

module.exports = app;
