const async = require("async");
const { body, validationResult } = require("express-validator");

const bookModel = require("../models/book.js");
const authorModel = require("../models/author.js");
const genreModel = require("../models/genre.js");

exports.bookList = (req, res) => {
  bookModel
    .find({})
    .populate("author")
    .populate("genre")
    .exec((err, result) => {
      res.render("bookList", { bookList: result });
    });
};

exports.showDetails = (req, res) => {
  bookModel
    .findById({ _id: req.params.bookId })
    .populate("author")
    .populate("genre")
    .exec((err, result) => {
      res.render("bookDetails", { book: result });
    });
};

exports.createBookPage = (req, res) => {
  async.parallel(
    {
      authorList: (cb) => {
        authorModel.find(cb);
      },
      genreList: (cb) => {
        genreModel.find(cb);
      },
    },
    (err, result) => {
      if (err) return console.log(err);
      res.render("bookForm", {
        authorList: result.authorList,
        genreList: result.genreList,
        pageTitle: "Create an entry for a book:",
      });
    }
  );
};

exports.updateBookPage = (req, res) => {
  const pageTitle = "Update the details:";
  const url = "/catalog/books/" + req.params.bookId + "/update";

  async.parallel(
    {
      book: (cb) => {
        bookModel
          .findById({ _id: req.params.bookId })
          .populate("author")
          .populate("genre")
          .exec(cb);
      },
      authorList: (cb) => {
        authorModel.find(cb);
      },
      genreList: (cb) => {
        genreModel.find(cb);
      },
    },
    (err, result) => {
      if (err) return console.log(err);

      for (let j = 0; j < result.genreList.length; j++) {
        for (let i = 0; i < result.book.genre.length; i++) {
          if (
            result.genreList[j]._id.toString() !=
            result.book.genre[i]._id.toString()
          )
            continue;
          result.genreList[j].checked = "true";
        }
      }

      res.render("bookForm", {
        pageTitle: pageTitle,
        url: url,
        book: result.book,
        authorList: result.authorList,
        genreList: result.genreList,
      });
    }
  );
};

exports.deleteBook = (req, res) => {
  bookModel.deleteOne({ _id: req.params.bookId }, (err) => {
    res.redirect("/catalog/books");
  });
};

exports.createBook = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },
  body("title", "Title shouldn't be empty!")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author").trim().escape(),
  body("genre.*").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const doc = new bookModel({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
    });

    if (errors.isEmpty()) {
      doc.save((err) => {
        res.redirect("/catalog/books");
      });
      return;
    }

    async.parallel(
      {
        authorList: (cb) => {
          authorModel.find(cb);
        },
        genreList: (cb) => {
          genreModel.find(cb);
        },
      },
      (err, result) => {
        if (err) return console.log(err);

        console.log(errors);

        res.render("bookForm", {
          authorList: result.authorList,
          genreList: result.genreList,
          pageTitle: "Create an entry for a book:",
          errors: errors.array(),
        });
      }
    );
  },
];

exports.updateBook = (req, res) => {
  const doc = new bookModel({
    _id: req.params.bookId,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  });

  bookModel.findByIdAndUpdate(req.params.bookId, doc, {}, (err, result) => {
    if (err) console.log(err);
    res.redirect("/catalog/books");
  });
};
