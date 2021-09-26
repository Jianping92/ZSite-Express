const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello Word express server!!!");
});

app.listen(5995, () => {
  console.log("express 已启动！");
})
