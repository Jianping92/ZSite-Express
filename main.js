const express = require("express");
const cookieParser = require("cookie-parser");

const { Mongo } = require("./db/db");
const userRouter = require("./routes/user");

const app = express();

app.use(cookieParser()); // 使用 cookies 获取中间件
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 允许跨域
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.get("/", (req, res) => {
  // console.log(req.cookies);
  // console.log(req.params);
  // console.log(req.query);
  // console.log(req.body);
  res.send("hello Word express server!!!");
});

app.use("/users", userRouter);

Mongo.connect();

app.listen(5995, () => {
  console.log("express 已启动！");
});
