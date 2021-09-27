const express = require("express");

const { Mongo } = require("./db/db");

const app = express();

app.get("/", (req, res) => {
  res.send("hello Word express server!!!");
});

Mongo.connect();

app.listen(5995, () => {
  console.log("express 已启动！");
})
