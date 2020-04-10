var express = require("express");
var router = express.Router();
var { Mongoose } = require("../service/db");
var changes = require("../models/changemodel");
var jwt = require("jsonwebtoken");

var client = Mongoose;
/* GET users listing. */
router.get("/", verifyToken, function (req, res, next) {
  changes.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else
      console.log(
        "Error in retriving details from db : " + JSON.stringify(err)
      );
  });
});
router.get("/public", function (req, res, next) {
  changes.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else
      console.log(
        "Error in retriving details from db : " + JSON.stringify(err)
      );
  });
});
router.post("/", verifyToken, function (req, res, next) {
  var chng = new changes({
    Title: req.body.Title,
    Type: req.body.Type,
    Content: req.body.Content,
    UpdatedDate: new Date(),
  });
  console.log(chng);
  if (chng != null) {
    changes.insertMany(chng, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error in inserting details : " + JSON.stringify(err));
    });
  }
});

router.delete("/", verifyToken, function (req, res, next) {
  const id = req.query.id;
  console.log(id);
  if (id != null) {
    changes.findByIdAndDelete(id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error in deleting a record: " + JSON.stringify(err));
    });
  }
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
  } else if (usermode == "social") {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized request" });
  }
}
module.exports = router;
