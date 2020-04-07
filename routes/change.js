var express = require("express");
var router = express.Router();
var { Mongoose } = require("../service/db");
var changes = require("../models/changes");
var client = Mongoose;
/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.json({ users: [{ name: "Timmy" }] });
  changes.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else
      console.log(
        "Error in retriving details from db : " + JSON.stringify(err)
      );
  });
});

module.exports = router;
