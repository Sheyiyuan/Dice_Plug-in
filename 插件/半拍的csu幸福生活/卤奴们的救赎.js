// ==UserScript==
// @name         卤奴们的救赎
// @author       社亦园
// @version      1.0.0
// @description  随机炒卤配菜，一步到位
// @timestamp    1721611060
// 2024-07-22 09:17:40
// @license      MIT
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

//注册拓展
let ext = seal.ext.find('卤奴们的救赎');
if (!ext) {
  ext = seal.ext.new('卤奴们的救赎', '社亦园', '1.0.0');
  seal.ext.register(ext);
}

//函数库
//骰子模拟器
function D(n, x, k = 1, p = 0, c = 0) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let randomNumber = Math.floor(Math.random() * x) + 1;
    sum += randomNumber;
  }
  sum += p;
  sumPlus = sum * k + c;
  return sumPlus;
}
function randomListCheck(r, randomList = []) {
  let result = true;
  for (let i = 0; i < randomList.length; i++) {
    if (r === randomList[i]) {
      result = false;
      break;
    }
  }
  return result;
}
//随机配菜
const meatList = ["耳尖", "肥肠", "心舌", "鸭肠", "鸭胗", "鹅肠", "鸭头", "猪头肉", "鸡腿", "鸡爪", "鸡尖", "鸭脖", "卤肉", "鸭架", "玉米肠", "卤蛋"];
const vegetableList = ["贡菜", "木耳", "捆鸡", "千张", "千叶豆腐", "土豆", "香干", "莲藕", "腐竹", "海带", "豆丁", "杏鲍菇"];
const allList = ["耳尖", "肥肠", "心舌", "鸭肠", "鸭胗", "鹅肠", "鸭头", "猪头肉", "鸡腿", "鸡爪", "鸡尖", "鸭脖", "卤肉", "鸭架", "玉米肠", "卤蛋", "贡菜", "木耳", "捆鸡", "千张", "千叶豆腐", "土豆", "香干", "莲藕", "腐竹", "海带", "豆丁", "杏鲍菇"];
const meat = {
  "耳尖": 8,
  "肥肠": 8,
  "心舌": 8,
  "鸭肠": 8,
  "鸭胗": 8,
  "鹅肠": 8,
  "鸭头": 7,
  "猪头肉": 6,
  "鸡腿": 6,
  "鸡爪": 6,
  "鸡尖": 6,
  "鸭脖": 6,
  "卤肉": 6,
  "鸭架": 4,
  "玉米肠": 3,
  "卤蛋": 2
}
const vegetable = {
  "贡菜": 3,
  "木耳": 3,
  "捆鸡": 3,
  "千张": 3,
  "千叶豆腐": 3,
  "土豆": 3,
  "香干": 3,
  "莲藕": 3,
  "腐竹": 3,
  "海带": 3,
  "豆丁": 3,
  "杏鲍菇": 3
}
const all = {
  "耳尖": 8,
  "肥肠": 8,
  "心舌": 8,
  "鸭肠": 8,
  "鸭胗": 8,
  "鹅肠": 8,
  "鸭头": 7,
  "猪头肉": 6,
  "鸡腿": 6,
  "鸡爪": 6,
  "鸡尖": 6,
  "鸭脖": 6,
  "卤肉": 6,
  "鸭架": 4,
  "玉米肠": 3,
  "卤蛋": 3,
  "贡菜": 3,
  "木耳": 3,
  "捆鸡": 3,
  "千张": 3,
  "千叶豆腐": 3,
  "土豆": 3,
  "香干": 3,
  "莲藕": 3,
  "腐竹": 3,
  "海带": 3,
  "豆丁": 3,
  "杏鲍菇": 3
}
//注册命令
const cmdLN = seal.ext.newCmdItemInfo();
cmdLN.name = '炒卤'; // 指令名字，可用中文
cmdLN.help = '';
cmdLN.solve = (ctx, msg, cmdArgs) => {
  let val = cmdArgs.getArgN(1);
  let meatCount = cmdArgs.getArgN(2);
  let vegetableCount = cmdArgs.getArgN(3);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      if (val) {
        if (!meatCount && !vegetableCount) {
          //在all中随机选取val个配菜并返回菜单和价格
          let menu = "";
          let price = 10;
          //获取随机索引并放入数组randomList
          let randomList = []
          for (let i = 0; i < val; i++) {
            //排除重复
            do {
              let r = D(1, allList.length, 1, 0, 0) - 1
            } while (randomListCheck(r, randomList));
            randomList.push(r)
            //获取配菜名称
            let name = allList[r];
            //获取配菜价格
            let p = 0
            p = all[name]
            menu += name + " "
            price += p
          }
          let reply = `${ctx.player.name}老师的炒卤菜单：\n` + menu + "\n总计" + price + "元";
          seal.replyToSender(ctx, msg, reply);
        }
        else if (val === meatCount + vegetableCount) {
          //在meat中选取meatCount个配菜，在vegetable中选取vegetableCount个配菜，并返回菜单和价格
          let menu = "";
          let price = 10;
          let randomList = []
          for (let i = 0; i < meatCount; i++) {
            //排除重复
            do {
              let r = D(1, meatList.length, 1, 0, 0) - 1
            } while (randomListCheck(r, randomList));
            randomList.push(r)
            //获取配菜名称
            let name = meatList[r];
            //获取配菜价格
            let p = 0
            p = meat[name]
            menu += name + " "
            price += p
          }
          for (let i = 0; i < val; i++) {
            //排除重复
            do {
              let r = D(1, vegetableList.length, 1, 0, 0) - 1
            } while (randomListCheck(r, randomList));
            randomList.push(r)
            //获取配菜名称
            let name = vegetableList[r];
            //获取配菜价格
            let p = 0
            p = vegetable[name]
            menu += name + " "
            price += p
          }
          let reply = `${ctx.player.name}老师的炒卤菜单：\n` + menu + "\n总计" + price + "元";
          seal.replyToSender(ctx, msg, reply)
        }
        else {
          seal.replyToSender(ctx, msg, "参数错误，请使用help查看正确指令。");
        }
      }
    }
  }
  return seal.ext.newCmdExecuteResult(true);
};
// 将命令注册到扩展中
ext.cmdMap['炒卤'] = cmdLN;   