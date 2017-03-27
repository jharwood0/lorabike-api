let mongoose = require('mongoose');
let Device = require('../models/device');
let User = require('../models/user');

let jwt    = require('jsonwebtoken');
let config = require('config');


function getUser(req, res){
  User.findById(req.params.id, (err, user) => {
    if(err) res.send(err);
    console.log(user);
    res.json(user);
  });
}

function deleteUser(req, res){
    User.remove(req.param.id, (err, result) => {
      res.json({message : "User successfully deleted!", result})
    });
}

function createUser(req, res){
  let newUser = new User(req.body);
  console.log("Creating user = ");
  console.log(newUser);
  newUser.save((err, user) => {
    if(err){
      res.send(err);
    }else{
      user.password = null;
      res.json({message:"User successfully created!", user, success: true});
    }
  });
}

function updateUser(req, res){
    User.findById(req.params.id, (err, user) => {
      if(err) res.send(err);
      Object.assign(user, req.body).save((err, user) => {
        if(err) res.send(err);
        res.json({message: "User updated!", user});
      });
    });

}

function authenticateUser(req, res){
  User.findOne({"username":req.body.username}, (err, user) => {
    if(err || !user){
      res.send({message: "incorrect username or password", success: false});
    }else{
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(err) res.send(err);
        if(isMatch){
          let tokenInfo = { username : user.username, _id : user._id, email : user.email}
          console.log(tokenInfo);
          let token = jwt.sign(tokenInfo, config.jwtSecret, {expiresIn: "2 days" });
          res.json({message:"Authentication successful.", token, success: true});
        }else{
          res.json({message:"Authentication failed.", success: false});
        }
      });
    }
  });
}

module.exports = {getUser, createUser, deleteUser, updateUser, authenticateUser}
