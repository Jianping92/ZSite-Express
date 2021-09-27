const router = require("express").Router();

const UserModel = require("../models/model_user");

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
    message: "请求成功",
    detail: {...result},
    code: 200
  })
});

router.post("/setUserInfo", async (req, res) => {
  // const { name, password, email, gender, phone, avatar, updateTime, desc } = req.body;
});

module.exports = router;
