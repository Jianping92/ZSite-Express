const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40
  },
  nickname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40
  },
  password: {
    type: String,
    required: true,
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    }
  },
  email: {
    type: String
  },
  gender: {
    type: String,
    required: true,
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
    default: new Date().toJSON()
  },
  desc: {
    type: String,
    maxlength: 300
  }
})

module.exports = UserModel = mongoose.model("user", UserSchema);
