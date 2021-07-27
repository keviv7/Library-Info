const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: { type: String, required: true, minLenght: 2, maxLength: 15 },
});

module.exports = mongoose.model("genre", genreSchema);
