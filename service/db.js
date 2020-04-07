var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://m001-student:m001-student-basics@sandbox-j4kkt.mongodb.net/changelog?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Mongo DB conected successfully!!");
  }
);

module.exports = mongoose;
