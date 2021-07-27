const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const catalogRouter = require("./routes/catalog.js");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(compression());

const devDbUrl =
  "mongodb://keviv7:letusdeploy@cluster0-shard-00-00.6urjv.mongodb.net:27017,cluster0-shard-00-01.6urjv.mongodb.net:27017,cluster0-shard-00-02.6urjv.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-l68zlb-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || devDbUrl;

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000);
    console.log("Listening ..");

    app.set("views", "./views");
    app.set("view engine", "pug");

    app.use(express.static(path.resolve("./public")));
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/", catalogRouter);
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error!"));
