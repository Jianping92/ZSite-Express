const router = require("express").Router();

const UserModel = require("../models/model_user");

const userRegisterValidator = require("../utlis/userRegister_validator");
const userUpdateValidator = require("../utlis/userUpdate_validator");

router.get("/getUserInfo", async (req, res) => {
  const { name } = req.query;
  if (!name) return res.send({
    message: "缺少必要信息",
    code: -1
  })
  const result = await UserModel.findOne({ name });
  if (!result) return res.send({
    message: "查无此人哦！",
    code: -1
  })
  res.json({
    message: "查询完成",
    detail: result,
    code: 200
  })
});

router.post("/registerUserInfo", async (req,res) => {
  const { errors, isValid } = userRegisterValidator(req.body);
  if (!isValid) {
    return res.status(400).json({
      code: -1,
      message: "注册项填写错误！",
      detail: errors
    });
  }
  UserModel.findOne({ name: req.body.name, email: req.body.email, phone: req.body.phone }).then(user => {
    // 如果用户存在
    if (user) {
      return res.status(400).json({
        code: -1,
        message: "当前用户已存在啦，请使用新的信息哦！"
      })
    } else {
      const { name, password, nickname, email, gender, phone, desc } = req.body;
      // 如果不存在则执行新增
      const newUserInfo = new UserModel({
        name,
        password,
        nickname,
        email,
        gender,
        phone,
        desc
      });
      newUserInfo
        .save()
        .then(v => {
          res.json(v);
        })
        .catch(err => {
          console.log(err);
        })
    }
  })
});

router.post("/updateUserInfo", async (req, res) => {
  const { errors, isValid } = userUpdateValidator(req.body);
  if (!isValid) {
    return res.status(400).json({
      code: -1,
      message: "更新项内容填写错误！",
      detail: errors
    });
  }
  UserModel.findOne({ name: req.body.name }).then(user => {
    if (!user) {
      return res.status(400).json({
        code: -1,
        message: "用户不存在，请检查登录状态！"
      })
    } else {
      const { nickname, email, gender, phone, desc } = req.body;
      const updateTime = new Date().toJSON();
      UserModel
        .updateOne({ name: req.body.name }, { nickname, email, gender, phone, desc, updateTime })
        .then(response => {
          if (response) {
            return res.json({
              code: 200,
              message: "修改成功！"
            })
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  })
});

module.exports = router;
