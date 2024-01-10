const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Mydata = require("./models/dataSchema");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/// get request///
app.get("/", (req, res) => {
  Mydata.find()
    .then((result) => {
      res.render("index", { arr: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});
app.get("/user/view.html", (req, res) => {
  res.render("user/view");
});
app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});
/////////////////////////

mongoose
  .connect(
    "mongodb+srv://hakim:3hN9Y70U6XCTwJqt@cluster0.pnc7mzh.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://127.0.0.1:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/////////post request//////////////
app.post("/user/add.html", (req, res) => {
  const data = new Mydata(req.body);
  data
    .save()
    .then(() => {
      res.redirect("/user/add.html");
    })
    .catch((ee) => {
      console.log(err);
    });
});

///auto refresh////////////////
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//////////////////////////////
