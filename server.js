let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');

let jwt = require('jsonwebtoken');
let expressJWT = require('express-jwt');

let port = 8080;

/* auth */
let auth = require('./app/auth/auth');

/* models */
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

/* unauthenticated routes */
app.get('/', (req, res) => res.json({message:"Welcome to the LoRaBike API!"}));
app.route('/user/')
    .post(user.createUser);
app.route('/user/authenticate')
    .post(user.authenticateUser)

/* secure routes */
app.use(auth.authenticate);

app.route('/device/')
    .post(device.createDevice);
app.route("/device/:id")
    .get(device.getDevice)
    .delete(device.deleteDevice)
    .put(device.updateDevice);
app.route('/user/:id')
    .get(user.getUser)
    .delete(user.deleteUser)
    .put(user.updateUser);

app.listen(port)
console.log("Listening on port "+port);
module.exports = app;
