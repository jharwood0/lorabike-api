let jwt = require('jsonwebtoken');
let config = require('config');
let NotRestricted = [
  "/api/user/authenticate",
  "/api/user/",
  "/"
]
exports.authenticate = function(req, res, next) {
  console.log(req.url);

    console.log("Comparing "+req.url);
    console.log(NotRestricted);
    if (!NotRestricted.includes(req.url)) {
      console.log("Comparing "+req.url);
      console.log("in restricted! " + req.headers.authorization);
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1];
            console.log("split token");
            console.log(token);
            if (token) {
            console.log("split 0");
                jwt.verify(token, config.jwtSecret, (err, decoded) => {
                    if (err) {
                      console.log(err);
                    console.log("split 1");
                        return res.json({
                            message: "Failed to authenticate token."
                        });
                    } else {
                    console.log("split 2");
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
            console.log("split 3");
                return res.status(403).send({
                    message: 'No token provided.'
                });
            }
        } else {
        console.log("split 4");
            return res.status(403).send({
                message: 'No token provided.'
            });
        }
    }else{
      console.log("not restricted!");
      next();
    }
}
