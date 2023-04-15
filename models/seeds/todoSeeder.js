// 載入 todo model
const Todo = require("../todo");
// 載入 db
const db = require("../../config/mongoose");

// 與 mongoose 連線有關可省略，只留下新增 10 筆資料的部分即可
db.once("open", () => {
  // 新增 10 筆資料
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` });
  }
  console.log("done");
});
