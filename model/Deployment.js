const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Deployment = new Schema(
  {
    url: {type: Schema.Types.String},
    templateName: {type: Schema.Types.String},
    version: {type: Schema.Types.String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deployment", Deployment);