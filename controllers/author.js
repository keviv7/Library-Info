const mongoose = require("mongoose");
const authorModel = require("../models/author.js");

exports.authorList = (req, res) => {
  authorModel.find({}, (err, result) => {
    res.render("authorList", { authorList: result });
  });
};

exports.showDetails = (req, res) => {
  authorModel.findById({ _id: req.params.authorId }, (err, result) => {
    res.render("authorDetails", { author: result });
  });
};

exports.createAuthorPage = (req, res) => {
  res.render("authorForm", { pageTitle: "Create an entry for an author:" });
};

exports.updateAuthorPage = (req, res) => {
  const pageTitle = "Update the details:";
  const url = "/catalog/authors/" + req.params.authorId + "/update";
  authorModel.findById({ _id: req.params.authorId }, (err, result) => {
    res.render("authorForm", {
      pageTitle: pageTitle,
      url: url,
      author: result,
    });
  });
};

exports.deleteAuthor = (req, res) => {
  authorModel.deleteOne({ _id: req.params.authorId }, (err) => {
    res.redirect("/catalog/authors");
  });
};

exports.createAuthor = (req, res) => {
  const doc = new authorModel({
    fName: req.body.fName,
    lName: req.body.lName,
    country: req.body.country,
  });

  doc.save((err) => {
    res.redirect("/catalog/authors");
  });
};

exports.updateAuthor = (req, res) => {
  const doc = new authorModel({
    _id: req.params.authorId,
    fName: req.body.fName,
    lName: req.body.lName,
    country: req.body.country,
  });

  authorModel.findByIdAndUpdate(req.params.authorId, doc, {}, (err, result) => {
    if (err) console.log(err);
    res.redirect("/catalog/authors");
  });
};
