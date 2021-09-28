const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function userUpdateValidator(data) {
  let errors = {};

  const genderList = ["male", "female", "secret"];

  data.nickname = !isEmpty(data.nickname) ? data.nickname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";

  if (!validator.isLength(data.nickname, {min: 2, max: 40})) {
    errors.nickname = "用户名长度不能小于2字且不能大于40字!";
  }
  if (isEmpty(data.nickname)) {
    errors.nickname = "用户名不能为空!";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "邮箱格式不正确!";
  }
  if (isEmpty(data.gender)) {
    errors.gender = "性别不能为空!";
  } else if (!genderList.includes(data.gender)) {
    errors.gender = "性别信息错误！";
  }
  if (!validator.isMobilePhone(data.phone, "zh-CN")) {
    errors.phone = "请输入正确的手机号码!";
  }
  if (!validator.isLength(data.desc, { min: 0, max: 300 })) {
    errors.desc = "个人介绍铲毒不能大于300字";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
