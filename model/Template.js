const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Templates = new Schema(
  {
    name: {type: Schema.Types.String},
    versions: {type: Schema.Types.Object}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", Templates);