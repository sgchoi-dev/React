const express = require("express");
const app = express();
const path = require("path");

app.listen(8080, function () {
  console.log("listening on 8080");
});

app.use(express.static(path.join(__dirname, "react_project/build")));

app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "react_project/build/index.html"));
});
