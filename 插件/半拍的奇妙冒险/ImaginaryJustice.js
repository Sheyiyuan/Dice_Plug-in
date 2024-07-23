// ==UserScript==
// @name         为世界带来救赎 Imaginary Justice
// @author       社亦园
// @version      1.0.0
// @description  一个无聊的文字冒险小游戏
// @timestamp    1720148493
// 2024-07-05 11:01:33
// @license      MIT
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

// 首先检查是否已经存在
let ext = seal.ext.find('ImaginaryJustice');
if (!ext) {
  // 不存在，那么建立扩展，名为ImaginaryJustice，作者“”，版本1.0.0
  ext = seal.ext.new('ImaginaryJustice', '社亦园', '1.0.0');
  // 注册扩展
  seal.ext.register(ext);
}

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG

//文本库
//游戏开始
const startText = [];
startText[0] = "为世界带来救赎\nImaginaryJustice\n版本：alpha 1.0.0\n开始：.ij start\n教程：.ij teaching\n剧情：.ij story\n背景故事：.ij bgs";
startText[1] = "为世界带来救赎\nImaginaryJustice\n版本：alpha 1.0.0\n探索中……\n退出游戏：.ij exit\n教程：.ij teaching\n剧情：.ij story\n背景故事：.ij bgs";

//结局剧情
const endingStory = [];
endingStory[0] = "你成功地将世界带回了正轨，但这也意味着你将面临新的挑战。";
endingStory[1] = "你成功地将世界带回了正轨，但这也意味着你将面临新的挑战。";
endingStory[2] = "你成功地将世界带回了正轨，但这也意味着你将面临新的挑战。";
endingStory[3] = "你成功地将世界带回了正轨，但这也意味着你将面临新的挑战。";

//教程
const teachingText = "";

//背景故事
const bgsText = "在兰德大陆的边缘，有一座被迷雾永远笼罩的阴森城堡，那里居住着残暴的魔王。一天，王国的上方盘旋着无边的黑暗。黑暗之中，一道阴影坠下，它夺走了美丽的公主，并扬言要夺走王国的一切。但是，不久之前才被国王加冕成为当代勇者的他临危受命，踏上了漫长的征途，他心中只有一个目标：救出公主，让光明重返王国土地。\n勇者啊，开启你的冒险之旅，为这个世界带来救赎吧！";

//节点类型
const nodeType = ["null", "决战", "战斗", "险境战斗", "诡异行商", "大地馈赠", "旅行见闻", "片刻宁静"]
//对象库




//函数库
//运算函数
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

//检定
const successdiscription = ["大失败", "失败", "成功", "困难成功", "极难成功", "大成功"]
//参数说明：检定规则，检定值，奖励/惩罚骰（奖励骰为正，惩罚骰为负），需求难度（successdiscription[]中对应的索引）
function Roll(ruleCOC, checkValue, BP = 0, difficulty = 1) {
  let geww = D(1, 10, 1, -1);
  let uiww = D(1, 10, 10, -1);
  n = Math.abs(BP);
  const Dice = [];
  if (geww + uiww !== 0) {
    Dice[0] = Number(geww + uiww)
  } else {
    Dice[0] = 100
  }
  let mindice = Dice[0]
  let maxdice = Dice[0]
  for (let i = 0; i < n; i++) {
    result = D(1, 10, 10, -1) + geww
    if (result === 0) {
      result = 100
    }
    mindice = Math.min(mindice, result)
    maxdice = Math.max(maxdice, result)
    //Dice.push(Number(result));
  }
  if (BP >= 0) {
    result = mindice
    //result = Math.min(Dice);
  } else {
    result = maxdice
    //result = Math.max(Dice);
  }
  let criticalSuccessValue, fumbleValue;
  if (ruleCOC === 0) {
    criticalSuccessValue = 1;
    if (checkValue >= 50) {
      fumbleValue = 100;
    } else {
      fumbleValue = 96;
    }
  }
  if (ruleCOC === 1) {
    if (checkValue >= 50) {
      criticalSuccessValue = 5;
    } else {
      criticalSuccessValue = 1;
    }
    if (checkValue >= 50) {
      fumbleValue = 100;
    } else {
      fumbleValue = 96;
    }
  }
  if (ruleCOC === 2) {
    if (checkValue >= 5) {
      criticalSuccessValue = 5;
    } else {
      criticalSuccessValue = checkValue;
    }
    if (checkValue >= 96) {
      fumbleValue = checkValue + 1;
      if (fumbleValue > 100) {
        fumbleValue = 100;
      } else {
        fumbleValue = 96;
      }
    }
  }
  if (ruleCOC === 3) {
    criticalSuccessValue = 5;
    fumbleValue === 96;
  }
  if (ruleCOC === 4) {
    oneOfTen = Math.floor(checkValue / 10);
    if (oneOfTen >= 5) {
      criticalSuccessValue = 5;
    } else {
      criticalSuccessValue = oneOfTen;
    }
    if (checkValue >= 50) {
      fumbleValue = 100;
    } else {
      fumbleValue = 96 + oneOfTen;
    }
  }
  if (ruleCOC === 5) {
    oneOfFive = Math.floor(checkValue / 5);
    if (oneOfFive >= 2) {
      criticalSuccessValue = 2;
    } else {
      criticalSuccessValue = oneOfFive
    }
    if (checkValue >= 50) {
      fumbleValue = 100;
    } else {
      fumbleValue = 96;
    }
  }
  if (result <= checkValue) {
    successRank = 2;
  } else {
    successRank = 1;
  }
  // 成功判定
  if (successRank == 2) {
    // 区分大成功、困难成功、极难成功等
    if (result <= checkValue / 2) {
      //suffix = "成功(困难)"
      successRank = 3;
    }
    if (result <= checkValue / 5) {
      //suffix = "成功(极难)"
      successRank = 4;
    }
    if (result <= criticalSuccessValue) {
      //suffix = "大成功！"
      successRank = 5;
    }
  }
  if (result >= fumbleValue) {
    //suffix = "大失败！"
    successRank = 0;
  }
  const rollResult = [result, checkValue, successRank];
  if (successRank > difficulty) {
    rollResult.push(1);
  } else {
    rollResult.push(0);
  }
  rollResult.push(`检定结果为: D100=${result}/${checkValue},${successdiscription[successRank]}`)
  return rollResult
}

//骰点字符串分解骰点器
//ndx
function dividedice(dicestring) {
  let dividedicenum = dicestring.split("d")
  return D(dividedicenum[0], dividedicenum[1])
}

function dividemut(dicestring) {
  let dividedicenum = dicestring.split("d")
  return dividedicenum[0] * dividedicenum[1]
}

//数组转整数
//将布尔数组转化为数值进行存储
function arrToInt(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i] * Math.pow(2, i);
  }
  return sum;
}

//整数转数组
//读取数值进行布尔数组的还原
function intToArr(num, len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr[i] = Math.floor(num / Math.pow(2, i)) % 2;
  }
  return arr;
}

//游戏地图生成器
function generateMap(f) {
  class Node {
    constructor(f, x, y, type) {
      this.f = f;
      this.x = x;
      this.y = y;
      this.type = type;
      this.visited = false;
    }
  }
  let map = [];
  switch (f) {
    case 1: {
      map = [];
      let typeTemp = 0;
      /*
      节点类型
      0-null
      1-决战（boss房）
      2-战斗
      3-险境战斗
      4-诡异行商
      5-大地馈赠（宝箱）
      6-旅行见闻（不期而遇）
      7-片刻宁静（安全屋）
      */
      //加入开始固定节点范式
      let node = new Node(1, 0, 1, 2);
      map.push(node);
      //决定地图长度
      let mapLength = 0;
      let dice = D(1, 100);
      if (dice <= 10) {
        mapLength = 2;
      } else if (dice <= 70) {
        mapLength = 3;
      } else {
        mapLength = 4;
      }
      //决定地图宽度并生成地图
      for (let i = 1; i <= mapLength; i++) {
        let wide = D(1, 2);
        for (let j = 1; j <= wide; j++) {
          let dice = D(1, 100);
          if (dice <= 10) {
            typeTemp = 2;
          } else if (dice <= 50) {
            typeTemp = 3;
          } else {
            typeTemp = 6;
          }
          node = new Node(1, i, j, typeTemp);
          map.push(node);
        }
      }
      //加入末尾固定节点范式
      node = new Node(1, mapLength + 1, 1, 4);
      map.push(node);
      //上传地图
      let mapString = JSON.stringify(map);
      seal.vars.strSet(ctx, `$m游戏地图1`, mapString);
      break;
    }
    case 2: {
      map = [];
      let typeTemp = 0;
      //加入开始固定节点范式
      for (let i = 1; i <= 2; i++) {
        let dice = D(1, 100);
        if (dice <= 50) {
          typeTemp = 2;
        } else {
          typeTemp = 6;
        }
        let node = new Node(2, 0, i, typeTemp);
        map.push(node);
      }
      //决定地图长度
      let mapLength = 0;
      let dice = D(1, 100);
      if (dice <= 10) {
        mapLength = 2;
      } else if (dice <= 70) {
        mapLength = 3;
      } else {
        mapLength = 4;
      }
      //决定地图宽度并生成地图
      for (let i = 1; i <= mapLength; i++) {
        let wide = D(1, 4);
        let node
        for (let j = 1; j <= wide; j++) {
          let dice = D(1, 100);
          if (dice <= 10) {
            typeTemp = 3;
          } else if (dice <= 50) {
            typeTemp = 2;
          } else {
            typeTemp = 6;
          }
          node = new Node(2, i, j, typeTemp);
          map.push(node);
        }
      }
      //加入末尾固定节点范式
      for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < 2; j++) {
          let typeTemp = 5;
          let node = new Node(2, mapLength + 1, i, typeTemp);
          map.push(node);
        }
        //上传地图
        let mapString = JSON.stringify(map);
        seal.vars.strSet(ctx, `$m游戏地图2`, mapString);
        break;
      }
      break;
    }
    case 3: {
      map = [];
      let typeTemp = 0;
      for (let i = 1; i < 3; i++) {
        let dice = D(1, 100);
        if (dice <= 50) {
          typeTemp = 2;
        } else if (dice <= 99) {
          typeTemp = 6;
        } else {
          typeTemp = 7;
        }
        let node = new Node(3, 0, i, typeTemp);
        map.push(node);
      }
      //决定地图长度
      let mapLength = 0;
      let dice = D(1, 100);
      if (dice <= 10) {
        mapLength = 6;
      } else if (dice <= 70) {
        mapLength = 5;
      } else {
        mapLength = 4;
      }
      //决定地图宽度并生成地图
      for (let i = 1; i <= mapLength; i++) {
        let wide = D(1, 4);
        let node
        for (let j = 1; j <= wide; j++) {
          let dice = D(1, 100);
          if (dice <= 10) {
            typeTemp = 3;
          } else if (dice <= 50) {
            typeTemp = 2;
          } else {
            typeTemp = 6;
          }
          node = new Node(3, i, j, typeTemp);
          map.push(node);
        }
      }
      //加入末尾固定节点范式
      let node = new Node(3, mapLength + 1, 1, 1);
      map.push(node);
      //上传地图
      let mapString = JSON.stringify(map);
      seal.vars.strSet(ctx, `$m游戏地图3`, mapString);
      break;
    }
    case 4: {
      map = [];
      let typeTemp = 0;
      //加入开始固定节点范式
      for (let i = 1; i < 3; i++) {
        let dice = D(1, 100);
        if (dice <= 50) {
          typeTemp = 2;
        } else if (dice <= 99) {
          typeTemp = 6;
        } else {
          typeTemp = 7;
        }
        let node = new Node(4, 0, i, typeTemp);
        map.push(node);
      }
      //决定地图长度
      let mapLength = 0;
      let dice = D(1, 100);
      if (dice <= 10) {
        mapLength = 4;
      } else if (dice <= 70) {
        mapLength = 5;
      } else {
        mapLength = 6;
      }
      //决定地图宽度并生成地图
      for (let i = 1; i <= mapLength; i++) {
        let wide = D(1, 4);
        let node
        for (let j = 1; j <= wide; j++) {
          let dice = D(1, 100);
          if (dice <= 10) {
            typeTemp = 3;
          } else if (dice <= 40) {
            typeTemp = 2;
          } else if (dice <= 85) {
            typeTemp = 6;
          } else if (dice <= 95) {
            typeTemp = 7;
          } else {
            typeTemp = 4;
          }
          node = new Node(4, i, j, typeTemp);
          map.push(node);
        }
      }
      //加入末尾固定节点范式
      for (let i = 1; i <= 3; i++) {
        let node = new Node(4, mapLength + 1, i, 2);
      }
      map.push(node);
      //上传地图
      let mapString = JSON.stringify(map);
      seal.vars.strSet(ctx, `$m游戏地图4`, mapString);
      break;
    }
    case 5: {
      map = [];
      let typeTemp = 0;
      //加入开始固定节点范式
      for (let i = 1; i < 3; i++) {
        let dice = D(1, 100);
        if (dice <= 40) {
          typeTemp = 2;
        } else if (dice <= 99) {
          typeTemp = 6;
        } else {
          typeTemp = 7;
        }
        let node = new Node(5, 0, i, typeTemp);
        map.push(node);
      }
      //决定地图长度
      let mapLength = 0;
      let dice = D(1, 100);
      if (dice <= 10) {
        mapLength = 4;
      } else if (dice <= 70) {
        mapLength = 5;
      } else {
        mapLength = 6;
      }
      //决定地图宽度并生成地图
      for (let i = 1; i <= mapLength; i++) {
        let wide = D(1, 4);
        let node
        for (let j = 1; j <= wide; j++) {
          let dice = D(1, 100);
          if (dice <= 10) {
            typeTemp = 3;
          } else if (dice <= 40) {
            typeTemp = 2;
          } else if (dice <= 85) {
            typeTemp = 6;
          } else if (dice <= 95) {
            typeTemp = 7;
          } else if (dice <= 99) {
            typeTemp = 4;
          } else {
            typeTemp = 5;
          }
          node = new Node(5, i, j, typeTemp);
          map.push(node);
        }
      }
      //加入末尾固定节点范式
      let node = new Node(5, mapLength + 1, 1, 1);
      map.push(node);
      //上传地图
      let mapString = JSON.stringify(map);
      seal.vars.strSet(ctx, `$m游戏地图5`, mapString);
      break;
    }
    case 6: {
      map = [];
      let typeTemp = 0;
      //加入开始固定节点范式
      let node = new Node(6, 0, 1, 4);
      map.push(node);
      //决定地图长度
      let mapLength = 0;
      let dice = D(1, 100);
      if (dice <= 80) {
        mapLength = 2;
      } else if (dice <= 99) {
        mapLength = 3;
      } else {
        mapLength = 4;
      }
      //决定地图宽度并生成地图
      for (let i = 1; i <= mapLength; i++) {
        let wide = D(1, 2);
        for (let j = 1; j <= wide; j++) {
          let dice = D(1, 100);
          if (dice <= 10) {
            typeTemp = 3;
          } else {
            typeTemp = 2;
          }
          node = new Node(6, i, j, typeTemp);
          map.push(node);
        }
      }
      //加入末尾固定节点范式
      node = new Node(6, mapLength + 1, 1, 1);
      map.push(node);
      //上传地图
      let mapString = JSON.stringify(map);
      seal.vars.strSet(ctx, `$m游戏地图6`, mapString);
      break;
    }
    default:
      console.log("地图生成失败！");
      console.error();
      break;
  }
}


//用对象方法来实现游戏交互
const gameRunner = {
  //游戏菜单
  menu: function () {
    let progress = seal.vars.strGet(ctx, `$m游戏进程`)[0]
    if (!progress) {
      seal.replyToSender(ctx, startText[0]);
    } else {
      seal.replyToSender(ctx, startText[1]);
    }
  },
  //开始游戏
  start: function () {
    //游戏进度：当前游戏进度，分别对应大节点、小节点x、小节点y、节点类型、结局
    //游戏进程：游戏是否开始，1
    //游戏存档：总计游玩次数
    if (!seal.vars.strGet(ctx, `$m游戏进程`)[0]) {
      const arrGameProgress = [0, 0, 1, 0, 0];
      jsonGameProgress = JSON.stringify(arrGameProgress);
      seal.vars.strSet(ctx, `$m游戏进程`, 1);
      seal.vars.strSet(ctx, `$m游戏进度`, jsonGameProgress);
      let saveTemp = seal.vars.strGet(ctx, `$m游戏存档`)[1];
      seal.replyToSender(ctx, "游戏开始！");
      saveTemp++
      seal.vars.strSet(ctx, `$m游戏存档`, saveTemp);
    } else {
      seal.replyToSender(ctx, "游戏已经开始了！");
    }
  },
  //退出游戏
  exit: function () {
    seal.vars.strSet(ctx, `$m游戏进程`, 0);
    seal.replyToSender(ctx, "游戏已退出！进度已清除！");
  },
  //游戏教程
  teaching: function () {
    seal.replyToSender(ctx, teachingText);
  },
  //游戏剧情
  story: function () {
    let storyIndex = seal.vars.intGet(ctx, `$m游戏结局`);
    const arrStoryIndex = intToArr(storyIndex, 4);
    const storyArr = ["普通结局", "第二结局", "第三结局", "第四结局"];
    let storyText = "";
    for (let i = 0; i < 4; i++) {
      if (storyIndex[i]) {
        if (arrStoryIndex[i]) {
          storyText += "结局" + (i + 1) + "：" + storyArr[i] + "\n";
        } else {
          storyText += "结局" + (i + 1) + "：未解锁\n";
        }
      }
    }
    seal.replyToSender(ctx, storyText);
  },
  //背景故事
  bgs: function () {
    seal.replyToSender(ctx, bgsText);
  },
  //准备界面
  ready: function () {
    //将游戏进程设置为[0,0,1]
    let arrGameProgress = [0, 0, 1];
    jsonGameProgress = JSON.stringify(arrGameProgress);
    seal.vars.strSet(ctx, `$m游戏进程`, jsonGameProgress);
    let saveTemp = seal.vars.intGet(ctx, `$m游戏存档`)[1];
    if (saveTemp === 1) {
      gameRunner.bgs();
    }
    seal.replyToSender(ctx, "勇者！出发前不先选好自己的武器怎么行呢！俗话说得好：“工欲善其事，必先利其器。”选择一个你喜欢的武器，去战胜可怕的魔王吧！");
    seal.replyToSender(ctx, "请选择你的武器：\n1-剑：.ij ready sword\n2-盾：.ij ready shield\n3-弓：.ij ready bow\n4-枪：.ij ready spear");
  },
  //准备界面武器选择
  weapon: function (weapon) {
    //判断游戏进程是否为[0,0,1]
    let arrGameProgress = JSON.parse(seal.vars.strGet(ctx, `$m游戏进程`)[0]);
    if (arrGameProgress[0] === 0 && arrGameProgress[1] === 0 && arrGameProgress[2] === 1) {
      if (weapon === null) {
        seal.replyToSender(ctx, "请选择合适的武器");
      } else {
        if (weapon === "sword" || weapon == 1) {
          seal.replyToSender(ctx, "你选择了剑");
          seal.vars.strSet(ctx, `$m游戏武器`, "1");
          gameRunner.cg1();
        } else if (weapon === "shield" || weapon == 2) {
          seal.replyToSender(ctx, "你选择了盾");
          seal.vars.strSet(ctx, `$m游戏武器`, "2");
          gameRunner.cg1();
        } else if (weapon === "bow" || weapon == 3) {
          seal.replyToSender(ctx, "你选择了弓");
          seal.vars.strSet(ctx, `$m游戏武器`, "3");
          gameRunner.cg1();
        } else if (weapon === "spear" || weapon == 4) {
          seal.replyToSender(ctx, "你选择了枪");
          seal.vars.strSet(ctx, `$m游戏武器`, "4");
          gameRunner.floor1();
        } else {
          seal.replyToSender(ctx, "武器不存在，请重新选择");
        }
      }
    } else {
      seal.replyToSender(ctx, "当前界面该指令不可用");
    }
  },
  //第一层开始
  floor1: function () {
    seal.replyToSender(ctx, "旅程I：荆棘小镇\n“勇者他就要出发，\n去远方寻找回答。他的步伐多么坚定，\n梦想多么伟大。”");
    //游戏进程设置为[1,0,0]
    let arrGameProgress = [1, 0, 0];
    jsonGameProgress = JSON.stringify(arrGameProgress);
    seal.vars.strSet(ctx, `$m游戏进程`, jsonGameProgress);
    generateMap(1);
    let mapString = seal.vars.strGet(ctx, `$m游戏地图1`)[0];
    map = JSON.parse(mapString);

  }
}

//主函数
const cmdIJ = seal.ext.newCmdItemInfo();
cmdIJ.name = 'ij'; // 指令名字，可用中文
cmdIJ.help = '';
cmdIJ.solve = (ctx, msg, cmdArgs) => {
  let val = cmdArgs.getArgN(1);
  let val2 = cmdArgs.getArgN(2);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      if (val === null) {
        gameRunner.menu();
      } else if (val === "start") {
        gameRunner.start();
        gameRunner.ready();
      } else if (val === "exit") {
        gameRunner.exit();
      } else if (val === "teaching") {
        gameRunner.teaching();
      } else if (val === "story") {
        gameRunner.story();
      } else if (val === "bgs") {
        gameRunner.bgs();
      } else if (val === "ready") {
        gameRunner.weapon(val2);
      }
    }
  }
}
return seal.ext.newCmdExecuteResult(true);

// 将命令注册到扩展中
ext.cmdMap['ij'] = cmdIJ;