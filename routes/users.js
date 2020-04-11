var express = require("express");
var router = express.Router();
var User = require("../models/usermodel");
var jwt = require("jsonwebtoken");

router.post("/register", function (req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now(),
  });

  let promise = user.save();

  promise.then(function (doc) {
    return res.status(201).json(doc);
  });

  promise.catch(function (err) {
    return res.status(400).json({ message: "Error registering user." });
  });
});

router.post("/login", function (req, res, next) {
  console.log("Request: " + JSON.stringify(req.body));
  let promise = User.findOne({ username: req.body.username }).exec();

  promise.then(function (doc) {
    if (doc) {
      if (doc.isValid(req.body.password)) {
        // generate token
        let token = jwt.sign({ username: doc.username }, "suriya4code", {
          expiresIn: "3h",
        });

        return res.status(200).json(token);
      } else {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(401).json({ message: "User is not registered yet." });
    }
  });

  promise.catch(function (err) {
    return res.status(500).json({ message: "Some internal error" });
  });
});

router.get("/username", verifyToken, function (req, res, next) {
  return res.status(200).json(decodedToken.username);
});

router.get("/", (req, res) => {
  return res.status(200).Send("I am up and running !!");
});

var decodedToken = "";
function verifyToken(req, res, next) {
  //let token = req.query.token;
  let token = req.header("Authorization");
  let usermode = req.header("UserMode");
  if (usermode == "local") {
    jwt.verify(token, "suriya4code", function (err, tokendata) {
      if (err) {
        return res.status(401).json({ message: "Unauthorized request" });
      }
      if (tokendata) {
        decodedToken = tokendata;
        next();
      }
    });
  } else if ((usermode = "social")) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized request" });
  }
}

module.exports = router;
