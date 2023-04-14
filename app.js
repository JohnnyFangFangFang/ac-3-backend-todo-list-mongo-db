// 載入 express 並建構應用程式伺服器
const express = require("express");
// 載入 mongoose
const mongoose = require("mongoose");
// 載入 handlebars
const exphbs = require("express-handlebars");
// 載入 body-parser
const bodyParser = require("body-parser");
// 載入 method-override
const methodOverride = require("method-override");
// 引用路由器
const routes = require("./routes");

// 意思是僅在非正式環境時使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

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

// app 相關功能啟用 /////////////////////////////////////////////////
// 設定 handlebars
// 建立名為 hbs 的樣板引擎
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
// 啟用樣板引擎 hbs
app.set("view engine", "hbs");
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride("_method"));
// 將 request 導入路由器，就可以不用在這邊設定路由
app.use(routes);

// 設定 port 3000 /////////////////////////////////////////////////
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
