const express = require("express");
const app = express();
const cors = require("cors");

const apiRouter = require("./routes/api");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.use(apiRouter);

const port = process.env.PORT || 3000;

var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
