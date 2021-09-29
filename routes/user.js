const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const UserModel = require("../models/model_user");

const userRegisterValidator = require("../utlis/userRegister_validator");
const userUpdateValidator = require("../utlis/userUpdate_validator");

const { secretOrKey } = require("../config/keys");
const {use} = require("express/lib/router");

// 登录接口
router.post("/userLogin", async (req, res) => {
  const user = await UserModel.findOne({ name: req.body.name });
  if (!user) {
    return res.status(400).json({
      code: -1,
      message: "用户名或密码错误！"
    });
  }
  const isPasswordValid = bcryptjs.compareSync(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      code: -1,
      message: "用户名或密码不正确！"
    });
  }
  // 创建 jwt 有效期为 1天
  const token = jwt.sign({ id: String(user._id), name: String(user.name) }, secretOrKey, { expiresIn: 60 * 60 * 24 })

  res.json({
    code: 200,
    message: "登录成功！",
    detail: {
      token: "Bearer " + token
    }
  })
});

// 获取用户信息
router.get("/getUserInfo", passport.authenticate("jwt", { session: false }), (req, res) => {
  // 只要查询到结果就是用户信息，否则会在passport里面直接返回401
  const { user } = req;
  // console.log(user);
  res.json({
    code: 200,
    message: "查询完成！",
    detail: {
      id: user?._id ?? "",
      name: user?.name ?? "",
      nickname: user?.nickname ?? "",
      email: user?.email ?? "",
      gender: user?.gender ?? "secret",
      phone: user?.phone ?? "",
      desc: user?.desc ?? ""
    }
  })
});

// 注册用户
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

// 更新用户信息
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
