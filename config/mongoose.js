// 載入 mongoose
const mongoose = require("mongoose");

// 意思是僅在非正式環境時使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 資料庫連線設定 /////////////////////////////////////////////////
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 取得資料庫連線狀態
const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

// 匯出以供使用
module.exports = db;
