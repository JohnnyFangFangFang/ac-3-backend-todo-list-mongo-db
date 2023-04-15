// 載入 express 並建構應用程式伺服器
const express = require("express");
// 載入 handlebars
const exphbs = require("express-handlebars");
// 載入 body-parser
const bodyParser = require("body-parser");
// 載入 method-override
const methodOverride = require("method-override");
// 引用路由器
const routes = require("./routes");

// 引用 mongoose 連線設定檔
require("./config/mongoose");

const app = express();

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
