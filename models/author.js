const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  country: { type: String, required: true },
});

authorSchema.virtual("name").get(() => {
  return this.fName + " " + this.lName;
});

//add url as a virtual property for routing

module.exports = mongoose.model("author", authorSchema);
