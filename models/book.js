const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "author", required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "genre", required: true }],
});

module.exports = mongoose.model("book", bookSchema);
