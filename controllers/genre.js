const { body, validationResult } = require("express-validator");
const genreModel = require("../models/genre.js");

exports.genreList = (req, res) => {
  genreModel.find({}, (err, result) => {
    res.render("genreList", { genreList: result });
  });
};

exports.createGenrePage = (req, res) => {
  res.render("genreForm", { pageTitle: "Create a new Genre:" });
};

exports.createGenre = [
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const doc = new genreModel({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render("genreForm", {
        pageTitle: "Create a new Genre:",
        genre: doc,
        errors: errors.array(),
      });

      return;
    }

    genreModel.findOne({ name: req.body.name }, (err, result) => {
      if (result) {
        res.redirect("/catalog/genres");
        return;
      }
      doc.save((err) => {
        if (err) console.log(err);
        res.redirect("/catalog/genres");
      });
    });
  },
];
