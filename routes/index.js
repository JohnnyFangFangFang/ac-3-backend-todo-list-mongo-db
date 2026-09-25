// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

const home = require("./modules/home");
const todos = require("./modules/todos");
const users = require("./modules/users");
const auth = require("./modules/auth");
const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/todos', authenticator, todos) // 加入驗證程序
// 將網址結構符合 /users 字串開頭的 request 導向 users 模組
router.use("/users", users);
router.use("/auth", auth);
router.use('/', authenticator, home) // 加入驗證程序

// 匯出路由器
module.exports = router;
