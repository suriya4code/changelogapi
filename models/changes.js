var mongoose = require("mongoose");

const changes = mongoose.model("changes", {
  Title: { type: String },
  Type: { type: String },
  Content: { type: String },
  UpdatedDate: { type: Date },
});

module.exports = changes;
