const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home.js");
const bookController = require("../controllers/book.js");
const authorController = require("../controllers/author.js");
const genreController = require("../controllers/genre.js");

router.get("/", homeController.getInfo);

//book
router.get("/catalog/books/create", bookController.createBookPage);
router.post("/catalog/books/create", bookController.createBook);

router.get("/catalog/books/:bookId/update", bookController.updateBookPage);
router.post("/catalog/books/:bookId/update", bookController.updateBook);

router.get("/catalog/books/:bookId/delete", bookController.deleteBook);

router.get("/catalog/books/:bookId", bookController.showDetails);
router.get("/catalog/books", bookController.bookList);

// //author
router.get("/catalog/authors/create", authorController.createAuthorPage);
router.post("/catalog/authors/create", authorController.createAuthor);

router.get(
  "/catalog/authors/:authorId/update",
  authorController.updateAuthorPage
);
router.post("/catalog/authors/:authorId/update", authorController.updateAuthor);

router.get("/catalog/authors/:authorId/delete", authorController.deleteAuthor);

router.get("/catalog/authors/:authorId", authorController.showDetails);
router.get("/catalog/authors", authorController.authorList);

//genre
router.get("/catalog/genres/create", genreController.createGenrePage);
router.post("/catalog/genres/create", genreController.createGenre);

router.get("/catalog/genres", genreController.genreList);

module.exports = router;
