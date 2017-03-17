let jwt = require('jsonwebtoken');
let config = require('config');

exports.authenticate = function(req, res, next) {console.log("HEERE");
  if(req.headers.authorization){
    let token = req.headers.authorization.split(' ')[1];
    if(token){
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err){
          return res.json({message:"Failed to authenticate token."});
        }else{
          req.decoded = decoded;
          next();
        }
      });
    }else{
      return res.status(403).send({
          message: 'No token provided.'
      });
    }
  }else{
  return res.status(403).send({
      message: 'No token provided.'
  });
}
}
