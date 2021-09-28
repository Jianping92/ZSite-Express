const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function userRegisterValidator(data) {
  let errors = {};

  const genderList = ["male", "female", "secret"];

  data.name = !isEmpty(data.name) ? data.name : "";
  data.nickname = !isEmpty(data.nickname) ? data.nickname : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";

  if (!validator.isLength(data.name, {min: 2, max: 40})) {
    errors.name = "用户名长度不能小于2字且不能大于40字!";
  }
  if (isEmpty(data.name)) {
    errors.name = "用户名不能为空!";
  }
  if (!validator.isLength(data.nickname, {min: 2, max: 40})) {
    errors.name = "昵称长度不能小于2字且不能大于40字!";
  }
  if (isEmpty(data.nickname)) {
    errors.name = "昵称不能为空!";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "邮箱格式不正确!";
  }
  if (isEmpty(data.gender)) {
    errors.gender = "性别不能为空!";
  } else if (!genderList.includes(data.gender)) {
    errors.gender = "性别信息异常！";
  }
  if (!validator.isMobilePhone(data.phone, "zh-CN")) {
    errors.phone = "请输入正确的手机号码!";
  }
  if (!validator.isLength(data.desc, { min: 0, max: 300 })) {
    errors.desc = "个人介绍字数不能大于300字!";
  }
  if (isEmpty(data.password)) {
    errors.password = "密码不能为空!"
  } else if (isEmpty(data.password2)) {
    errors.password2 = "确认密码不能为空!"
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "两次密码输入不一致!"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
