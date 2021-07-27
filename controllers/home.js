const mongoose = require("mongoose");

const bookModel = require("../models/book.js");
const authorModel = require("../models/author.js");

exports.getInfo = (req, res) => {
  //bookModel.countDocuments({}, (err, result) => {});
  res.render("index", { title: "Library Info" });
};
