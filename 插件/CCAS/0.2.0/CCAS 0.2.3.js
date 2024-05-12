// ==UserScript==
// @name         Combat&Chases Assist System
// @author       社亦园 冰红茶
// @version      0.2.3
// @description  一款COC战斗与追逐辅助系统
// @timestamp    1714914776
// 2024-05-05 21:12:56
// @license      MIT
// @homepageURL  https://github.com/Sheyiyuan/Dice_Plug-in.git
// ==/UserScript==

/*
主要功能
1. 通用基本功能 v
  1.1 判定建立战斗与追逐
  1.2 NPC 数据录入
2. 战斗辅助系统
  2.1 自动敏捷排序 v
    2.1.1 直接排序（中途加入自动计算
    2.1.2 含有突袭的排序
    2.1.3 含有先攻检定的排序
  2.2 自动计算伤害
  2.3 自动计算战技
3. 追逐辅助系统
  3.1 辅助建立追逐
    3.1.1 自动判定追逐
    3.1.2 自动排序与行动点计算
  3.2 追逐实况报表
    3.2.1 自动更新打点计时器
    3.2.2 实时行动点显示
    3.2.3 险境与障碍标注（含随机险境与障碍）
*/


//函数库

//计算mov
function movCompute(str, siz, dex, age = 30) {
  let mov = 8;
  if (str > siz && dex > siz) {
    mov = 9;
  } else {
    if (str < siz && dex < siz) {
      mov = 7;
    } else {
      mov = 8;
    }
  }
  if (age >= 40) {
    mov -= 1;
  }
  if (age >= 50) {
    mov -= 1;
  }
  if (age >= 60) {
    mov -= 1;
  }
  if (age >= 70) {
    mov -= 1;
  }
  if (age >= 80) {
    mov -= 1;
  }
  return mov;
}
//计算BUILD
function buildCompute(str, siz) {
  sum = str + siz;
  if (sum >= 2 && sum < 65) {
    build = -2;
  }
  if (sum >= 65 && sum < 85) {
    build = -1;
  }
  if (sum >= 85 && sum < 125) {
    build = 0;
  }
  if (sum >= 125 && sum < 165) {
    build = 1;
  }
  if (sum >= 165 && sum < 205) {
    build = 2;
  }
  if (sum >= 205) {
    let standard = 205;
    let delta = 0;
    do {
      standard += 80;
      delta++;
    } while (standard <= sum);
    build = 2 + delta;
  }
  return build;
}
//计算DB
function dbCompute(build) {
  let db = [0, 0]
  if (build < 1) {
    db[0] = build;
    db[1] = 1;
  }
  if (build === 1) {
    db[0] = build;
    db[1] = 4;
  }
  if (build >= 1) {
    db[0] = build - 1;
    db[1] = 6;
  }
  return db;
}

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
    Dice[0] = geww + uiww;
  } else {
    Dice[0] = 100;
  }
  for (let i = 0; i < n; i++) {
    result = D(1, 10, 10) + geww;
    if (result === 0) {
      result = 100;
    } else {
      result;
    }
    Dice.push(result);
  }
  if (BP >= 0) {
    result = Math.min(Dice);
  } else {
    result = Math.max(Dice);
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
  return rollResult
}

//数据录入函数
function parseUserData(input) {
  // 默认对象
  const defaultObj = {
    cname: '张三',
    str: 50,
    con: 50,
    siz: 65,
    dex: 50,
    '闪避': 25,
    '斗殴': 25,
    '手枪': 20,
    age: 30,
  };

  // 分割输入数据按行处理
  const lines = input.split('\n');
  const result = [];

  for (const line of lines) {
    // 分割每行数据
    const parts = line.trim().split(' ');
    if (parts.length < 3) continue;
    // 创建默认对象
    const characteristics = { ...defaultObj };
    characteristics.cname = parts[0];
    // 处理属性赋值
    for (let i = 1; i < parts.length; i += 2) {
      const key = parts[i];
      const value = parseInt(parts[i + 1], 10);
      characteristics[key] = isNaN(value) ? parts[i + 1] : value; // 如果是数字则转换，否则保持原样
    }
    //计算衍生生属性
    characteristics.HPM = Math.floor((characteristics.con + characteristics.siz) / 10)
    characteristics.HP = characteristics.HPM;
    characteristics.MOV = movCompute(characteristics.str, characteristics.siz, characteristics.dex, characteristics.age);
    characteristics.BUILD = buildCompute(characteristics.str, characteristics.siz);
    characteristics.DB = dbCompute(characteristics.BUILD);
    if (characteristics['闪避'] === 25) {
      characteristics['闪避'] = Math.floor(characteristics.dex / 2) - 1
    }
    result.push(characteristics);
  }

  return result;
}

// 普通排序
function qsort(data) {
  data.sort(function cmp(a, b) {
    if (a.dex === b.dex)
      return b.斗殴 - a.斗殴;
    return b.dex - a.dex;
  })
}

//首位突袭的情况
function sfind(data, point = "") {
  let pointpart = []
  // qsort(data, 0, data.length - 1)
  for (let i = 0; i < data.length; i++) {
    if (data[i].cname === point) {
      pointpart.push(data[i]);
    }
  }
  for (let i = 0; i < data.length; i++) {
    pointpart.push(data[i]);
  }
  return pointpart;
}

//使用先攻检定的行动排序
function qsortRoll(data) {
  let dex, dice;
  for (let i = 0; i < data.length; i++) {
    dex = data[i].dex;
    dice = Roll(2, dex);
    data[i].检定结果 = dice;
  }
  data.sort(function cmp(a, b) {
    if (b.检定结果[2] === a.检定结果[2]) {
      if (b.dex === a.dex) {
        return b.斗殴 - a.斗殴;
      }
      return b.dex - a.dex;
    }
    return b.检定结果[2] - a.检定结果[2];
  })
}

//排序结果
function ranks(arr) {
  let rankList = "\n";
  for (let i = 0; i < arr.length; i++) {
    rankList += arr[i].cname + "    hp：" + arr[i].HP + "/" + arr[i].HPM + "\n";
    rankList += "敏捷：" + arr[i].dex + "    力量：" + arr[i].str + "    体型：" + arr[i].siz + "\n";
    rankList += "体格：" + arr[i].BUILD + "    db：" + arr[i].DB[0];
    if (arr[i].DB[1] !== 1) rankList += "d" + arr[i].DB[1];
    rankList += "\n" + "斗殴：" + arr[i].斗殴 + "    闪避：" + arr[i].闪避 + "    手枪：" + arr[i].手枪 + "\n==========================\n";
  }
  return rankList;
}

//排序结果（先攻）
function ranksRoll(arr) {
  let rankList = "\n";
  for (let i = 0; i < arr.length; i++) {
    rankList += arr[i].cname + "    hp：" + arr[i].HP + "/" + arr[i].HPM + "\n";
    rankList += "敏捷：" + arr[i].dex + "    力量：" + arr[i].str + "    体型：" + arr[i].siz + "\n";
    rankList += "体格：" + arr[i].BUILD + "    db：" + arr[i].DB[0];
    if (arr[i].DB[1] !== 1) rankList += "d" + arr[i].DB[1];
    rankList += "\n" + "斗殴：" + arr[i].斗殴 + "    闪避：" + arr[i].闪避 + "    手枪：" + arr[i].手枪 + "\n敏捷检定：" + arr[i].检定结果 + "\n==========================\n";
  }
  return rankList;
}

//轻量简化排序输出
function simple_ranks(arr) {
  let rankList = "";
  for (let i = 0; i < arr.length; i++) {
    rankList += "\n" + arr[i].cname + "    敏捷：" + arr[i].dex + "    斗殴：" + arr[i].斗殴;
  }
  return rankList;
}

//轻量简化排序输出(先攻)
function simple_ranksRoll(arr) {
  let rankList = "";
  const successdiscription = ["大失败", "失败", "成功", "困难成功", "极难成功", "大成功"];
  for (let i = 0; i < arr.length; i++) {
    successRank = successdiscription[arr[i].检定结果[2]];
    rankList += "\n" + arr[i].cname + "    敏捷：" + arr[i].dex + "    检定结果：" + successRank + "    斗殴：" + arr[i].斗殴;
  }
  return rankList;
}

//单位列表
function list(arr) {
  let cnameList = "\n";
  for (let i = 0; i < arr.length; i++) {
    cnameList += arr[i].cname + "\n";
  }
  return cnameList;
}

//============================================================================================//

// 首先检查是否已经存在
let ext = seal.ext.find('Combat&Chases Assist System');
if (!ext) {
  // 不存在，那么建立扩展，名为，作者“”，版本1.0.0
  ext = seal.ext.new('Combat&Chases Assist System', '社亦园 冰红茶', '0.2.3');
  // 注册扩展
  seal.ext.register(ext);
}
//============================================================================================//

//NPC 数据录入
let arrCharacter = []
const cmdSetNpc = seal.ext.newCmdItemInfo();
cmdSetNpc.name = 'setnpc'; // 指令名字，可用中文
cmdSetNpc.help = '功能：批量添加NPC（非玩家角色）至战斗或追逐中。\n使用格式：\n.setnpc [NPC数量]\n /NPC名称1 属性1 属性2 ... \n/NPC名称2 ...\n参数说明：\n[NPC数量]：1到20的整数，表示要添加的NPC数量。\n/NPC名称 属性...：每组NPC信息间以 / 分隔，信息内属性用空格分隔。最后一个NPC信息后可省略结尾的 /';
cmdSetNpc.solve = (ctx, msg, cmdArgs) => {
  let val = cmdArgs.getArgN(1);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      let inputcount = 1;
      if (val >= 1 && val <= 20) {
        let input = '';
        let transfer = "";
        input = cmdArgs.getArgN(++inputcount);
        while (val--) {
          if (input === '/') {
            input = cmdArgs.getArgN(++inputcount);
            while (input !== '/' && input !== "") {
              transfer += input;
              transfer += " ";
              input = cmdArgs.getArgN(++inputcount);
            }
            transfer += "\n";
          }
        }
        let CCCharactersNew = parseUserData(transfer);
        let transferTemp = seal.vars.strGet(ctx, `$gCCAS单位数据录入`);
        transfer += '\n' + transferTemp[0];
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, transfer);
        let CCCharacters = parseUserData(transfer);
        seal.replyToSender(ctx, msg, `录入成功，${CCCharactersNew.length}名NPC已加入本次战斗。本次战斗目前共有${CCCharactersNew.length}名参与者。`);
        return seal.ext.newCmdExecuteResult(true);
      } else {
        seal.replyToSender(ctx, msg, `指令错误，请使用“help”查看正确指令。`)
      }
    }
  };
}
// 将命令注册到扩展中
ext.cmdMap['setnpc'] = cmdSetNpc;

//============================================================================================//

//指定NPC数据删除
const cmdDeleteNPC = seal.ext.newCmdItemInfo();
cmdDeleteNPC.name = 'deletenpc'; // 指令名字，可用中文
cmdDeleteNPC.help = '删除指定数量的单位（1到20之间）:\n.deletenpc 数量 单位名称1 单位名称2 ... 单位名称N\n其中“数量”是一个1到20之间的整数，后面可以跟多个单位名称，每个名称之间以空格分隔。例如，删除3个单位：\n.deletenpc 3 单位A 单位B 单位C\n或者，如果只删除一个特定单位，且该单位名称中不含空格，可以直接输入单位名称作为第一个参数：单位名称\n例如，仅删除一个名为“单位D”的单位：\n.deletempc 单位D';
cmdDeleteNPC.solve = (ctx, msg, cmdArgs) => {
  let val = cmdArgs.getArgN(1);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      if ((val >= 1 && val <= 20) || cmdArgs.getArgN(2) === "") {
        //确认要删去的单位的数量与名称
        let inputcount = 1;
        let bin;
        if ((val >= 1 && val <= 20)) {
          let input = '';
          let transfer = "";
          while (val--) {
            input = cmdArgs.getArgN(++inputcount);
            transfer += input + "\n";
          }
          bin = transfer.split('\n');
        }
        else {
          if (cmdArgs.getArgN(2) === "") {
            let transfer = val + "\n";
            bin = transfer.split("\n");
          }
        }
        //从线上读取已储存的参战单位数据到本地
        let textOL = seal.vars.strGet(ctx, `$gCCAS单位数据录入`)[0]
        const lines = textOL.split('\n');
        //查找要删除的对象并删除
        let deletetransferer = textOL.split('[');
        let deleteTransfer = deletetransferer[0].trim();
        let dataline = deleteTransfer.split('\n');
        let transtext = "";
        for (const initline of dataline) {
          let lineparts = initline.trim().split(' ');
          let leaveline = 1;
          for (let judgenumber = 0; judgenumber < bin.length; judgenumber++) {
            if (lineparts[0] === bin[judgenumber]);
            leaveline = 0;
          }
          if (leaveline) {
            transtext += initline + "\n";
          }
        }
        transtext = transtext.trim();
        let textNew = transtext;
        // combat new
        const sora = [];
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, JSON.stringify(sora));
        // setnpc
        textNew += "\n" + "\n[]";
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, textNew);
        seal.replyToSender(ctx, msg, `已删除${bin}共${bin.length - 1}名NPC`);
        return seal.ext.newCmdExecuteResult(true);
      }
      else {
        seal.replyToSender(ctx, msg, `指令错误，请使用“help”查看正确指令。`);
      }
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['deletenpc'] = cmdDeleteNPC;

//NPC数据补录
const cmdAddNPC = seal.ext.newCmdItemInfo();
cmdAddNPC.name = 'addnpc'; // 指令名字，可用中文
cmdAddNPC.help = '功能：批量添加NPC（非玩家角色）至战斗或追逐中。\n使用格式：\n.addnpc [NPC数量]\n /NPC名称1 属性1 属性2 ... \n/NPC名称2 ...\n参数说明：\n[NPC数量]：1到20的整数，表示要添加的NPC数量。\n/NPC名称 属性...：每组NPC信息间以 / 分隔，信息内属性用空格分隔。最后一个NPC信息后可省略结尾的 /';
cmdAddNPC.solve = (ctx, msg, cmdArgs) => {
  let val = cmdArgs.getArgN(1);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      let inputcount = 1;
      if (val >= 1 && val <= 20) {
        let t = val;
        let input = '';
        let transfer = "";
        input = cmdArgs.getArgN(++inputcount);
        while (val--) {
          if (input === '/') {
            input = cmdArgs.getArgN(++inputcount);
            while (input !== '/' && input !== "") {
              transfer += input;
              transfer += " ";
              input = cmdArgs.getArgN(++inputcount);
            }
            transfer += "\n";
          }
        }
        //从线上读取已储存的参战单位数据到本地
        let textOL2 = seal.vars.strGet(ctx, `$gCCAS单位数据录入`)[0];
        let addtransferer = textOL2.split('[');
        let addTransfer = addtransferer[0].trim();
        let textadd = addTransfer + "\n" + transfer;
        textadd += "\n[]";
        // combat new
        const sora = [];
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, JSON.stringify(sora));
        // setnpc
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, textadd);
        seal.replyToSender(ctx, msg, `已加入共${t}名NPC`);
        return seal.ext.newCmdExecuteResult(true);

      } else {
        seal.replyToSender(ctx, msg, `指令错误，请使用“help”查看正确指令。`);
      }
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['addnpc'] = cmdAddNPC;

//============================================================================================//

//设置默认战斗规则
let ruleCombat = 1
//规则设置指令
const cmdCombat = seal.ext.newCmdItemInfo();
cmdCombat.name = 'combat'; // 指令名字，可用中文
cmdCombat.help = 'a. 设置战斗规则\n格式: .combat <规则编号>\n描述: 更改当前战斗规则。规则编号必须是1至3之间的整数，每个编号代表一种不同的战斗规则配置:\n       1:直接依照敏捷排序\n        2:含有先发制人（突袭）的战斗排序，参考setnpc与setpc指令\n       3:含有先攻检定的战斗排序\n\nb. 清空数据\n格式: .combat new\n描述: 清除所有参战单位的数据，重置为初始状态。\n\nc. 排序行动顺序\n格式: .combat rank\n描述: 根据当前存储的参战单位数据，自动排序并显示行动顺序。\n\nd. 列出参战单位\n格式: .combat list\n描述: 列出所有已加入战斗的单位列表。';
cmdCombat.solve = (ctx, msg, cmdArgs) => {
  let val = cmdArgs.getArgN(1);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      if (val >= 1 && val <= 3) {
        ruleCombat = val;
        seal.replyToSender(ctx, msg, `战斗规则${ruleCombat}已启用。`);
        seal.vars.strSet(ctx, '$gCCAS战斗规则录入', val);
      } else {
        if (val === 'new') {
          const sora = [];
          let ___rule = 1;
          seal.vars.strSet(ctx, `$gCCAS单位数据录入`, JSON.stringify(sora));
          seal.vars.strSet(ctx, `$gCCAS战斗规则录入`, JSON.stringify(___rule));
          seal.replyToSender(ctx, msg, `数据已清空`);
        } else {
          if (val === 'rank') {
            let rankCCCharacters = parseUserData(seal.vars.strGet(ctx, `$gCCAS单位数据录入`)[0]);
            let ranktype = JSON.parse(seal.vars.strGet(ctx, '$gCCAS战斗规则录入')[0]);
            let ruleCOC = ctx.group.cocRuleIndex;
            let rank_method = cmdArgs.getArgN(2);
            if (ranktype === 3) {
              qsortRoll(rankCCCharacters, 0, rankCCCharacters.length - 1);
              let resultRank;
              if (rank_method === "simple") {
                resultRank = simple_ranksRoll(rankCCCharacters);
              }
              else {
                resultRank = ranksRoll(rankCCCharacters);
              }
              seal.replyToSender(ctx, msg, `行动顺序：\n${resultRank}`);
            }
            else if (ranktype === 1 || rank_method === "simple" || rank_method === "") {
              qsort(rankCCCharacters, 0, rankCCCharacters.length - 1);
              let resultRank;
              if (rank_method === "simple") {
                resultRank = simple_ranks(rankCCCharacters);
              }
              else {
                resultRank = ranks(rankCCCharacters);
              }
              seal.replyToSender(ctx, msg, `行动顺序：\n${resultRank}`);
            }
            // 带突袭的检定，格式为.combat rank 张三(cname) 50(成功率)
            else if (ranktype === 2) {
              if (rank_method >= 1 && rank_method <= 20) {
                let inputcount = 2;
                let membercount = rank_method;
                let checklist = "";
                qsort(rankCCCharacters, 0, rankCCCharacters.length - 1);
                while (1) {
                  let nowinput = cmdArgs.getArgN(++inputcount);
                  if (nowinput === "" || nowinput === "simple") {
                    rank_method = nowinput;
                    break;
                  }
                  else {
                    let checkname = nowinput;
                    let checkpossiblity;
                    if (cmdArgs.getArgN(inputcount + 1) >= 1 && cmdArgs.getArgN(inputcount + 1) <= 100)
                      checkpossiblity = cmdArgs.getArgN(++inputcount);
                    else
                      checkpossiblity = 100;
                    let checkrollresult = Roll(ruleCOC, checkpossiblity);
                    checklist += `${checkname}的突袭检定结果${checkrollresult[0]}/${checkrollresult[1]}${successdiscription[checkrollresult[2]]}\n`;
                    if (checkrollresult[3] === 1) {
                      rankCCCharacters = sfind(rankCCCharacters, checkname);
                    }
                  }
                }
                if (rank_method === "simple")
                  resultRank = simple_ranks(rankCCCharacters);
                else
                  resultRank = ranks(rankCCCharacters);
                seal.replyToSender(ctx, msg, `${checklist}行动顺序：\n${resultRank}`);
              }
              else {
                let sup_name = cmdArgs.getArgN(2);
                let sup_rate = cmdArgs.getArgN(3);
                rank_method = cmdArgs.getArgN(3);
                if (sup_rate === "" || rank_method === "simple")
                  sup_rate = 100;
                if (rank_method !== "simple")
                  rank_method = cmdArgs.getArgN(4);
                let sup_level = Roll(ruleCOC, sup_rate);
                if (sup_level[3] === 0) {
                  //失败
                  qsort(rankCCCharacters, 0, rankCCCharacters.length - 1);
                  let resultRank;
                  if (rank_method === "simple")
                    resultRank = simple_ranks(rankCCCharacters);
                  else
                    resultRank = ranks(rankCCCharacters);
                  seal.replyToSender(ctx, msg, `突袭检定${sup_level[0]}\/${sup_level[1]}${successdiscription[sup_level[2]]}\n行动顺序：\n${resultRank}`);
                }
                else {
                  //成功
                  qsort(rankCCCharacters, 0, rankCCCharacters.length - 1);
                  rankCCCharacters = sfind(rankCCCharacters, sup_name);
                  let resultRank;
                  if (rank_method === "simple")
                    resultRank = simple_ranks(rankCCCharacters);
                  else
                    resultRank = ranks(rankCCCharacters);
                  seal.replyToSender(ctx, msg, `突袭检定${sup_level[0]}\/${sup_level[1]}${successdiscription[sup_level[2]]}\n行动顺序：\n${resultRank}`);
                }
              }
            }
          } else {
            if (val == 'list') {
              let rankCCCharacters = parseUserData(seal.vars.strGet(ctx, `$gCCAS单位数据录入`)[0]);
              let resultList = list(rankCCCharacters);
              seal.replyToSender(ctx, msg, `参战单位列表：\n${resultList}`);
            } else {
              seal.replyToSender(ctx, msg, `指令错误，请使用“help”查看正确指令。`);
            }
          }
        }
      }
      return seal.ext.newCmdExecuteResult(true);
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['combat'] = cmdCombat;

//============================================================================================//