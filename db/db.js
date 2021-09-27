const mongoose = require("mongoose");

const Mongo = {
  connect: function () {
    mongoose.connect("mongodb://localhost:27017/zhao", err => {
      if (err) return console.log(err);
      console.log("连接数据库成功！");
    })
  }
}

module.exports = {
  Mongo
}
