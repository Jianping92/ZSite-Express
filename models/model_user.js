const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female", "secret"], // 男 女 保密
    default: "secret"
  },
  phone: {
    type: String,
    minlength: 11,
    maxlength: 11
  },
  avatar: {
    type: String
  },
  updateTime: {
    type: Date,
    default: Date.now()
  },
  desc: {
    type: String,
    maxlength: 300
  }
})

module.exports = UserModel = mongoose.model("user", UserSchema);
