// ==UserScript==
// @name         Combat&Chases Assist System
// @author       社亦园 冰红茶
// @version      0.2.2
// @description  一款COC战斗与追逐辅助系统
// @timestamp    1714914776
// 2024-05-05 21:12:56
// @license      MIT
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

/*
主要功能
1. 通用基本功能 v
  1.1 判定建立战斗与追逐
  1.2 NPC 数据录入
2. 战斗辅助系统
  2.1 自动敏捷排序
    2.1.1 直接排序 v（中途加入自动计算）
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
  let mov = 8
  if (str > siz && dex > siz) {
    mov = 9
  } else {
    if (str < siz && dex < siz) {
      mov = 7
    } else {
      mov = 8
    }
  }
  if (age >= 40) {
    mov -= 1
  }
  if (age >= 50) {
    mov -= 1
  }
  if (age >= 60) {
    mov -= 1
  }
  if (age >= 70) {
    mov -= 1
  }
  if (age >= 80) {
    mov -= 1
  }
  return mov
}
//计算BUILD
function buildCompute(str, siz) {
  sum = str + siz
  if (sum >= 2 && sum < 65) {
    build = -2
  }
  if (sum >= 65 && sum < 85) {
    build = -1
  }
  if (sum >= 85 && sum < 125) {
    build = 0
  }
  if (sum >= 125 && sum < 165) {
    build = 1
  }
  if (sum >= 165 && sum < 205) {
    build = 2
  }
  if (sum >= 205) {
    let standard = 205
    let delta = 0
    do {
      standard += 80
      delta++
    } while (standard <= sum);
    build = 2 + delta
  }
  return build
}
//计算DB
function dbCompute(build) {
  let db = [0, 0]
  if (build < 1) {
    db[0] = build
    db[1] = 1
  }
  if (build === 1) {
    db[0] = build
    db[1] = 4
  }
  if (build >= 1) {
    db[0] = build - 1
    db[1] = 6
  }
  return db
}
//掷骰 kdm+p
function D(k, m, p = 0) {
  let ansdice = 0;
  for (let i = 0; i < k; i++) {
    ansdice += Math.floor(Math.random() * m) + 1
  }
  ansdice += p
  return ansdice
}
//判定成功等级
let successdiscription = ["大失败", "失败", "成功", "困难成功", "极难成功", "大成功"]
function successlevel(val, requirement, Bigsuccess = 5, Bigfailure = 96) {
  let anslevel = 1;
  if (val < requirement)
    anslevel++
  if (val < requirement / 2)
    anslevel++
  if (val < requirement / 5)
    anslevel++
  if (val < Bigsuccess)
    anslevel = 5
  if (val > Bigfailure)
    anslevel = 0
  return anslevel
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
    if (parts.length < 3) continue; // 忽略不合规的行

    // 创建新对象基于默认对象
    const characteristics = { ...defaultObj };
    characteristics.cname = parts[0]; // 设置cname

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

//排序结果（旧）
/* function ranks(arr) {
  let rankListTemp = ''
  let rankList = '';
  for (let i = 0; i < arr.length; i++) {
    for (const k in arr[i]) {
      rankListTemp += k
      rankListTemp += ' '
      rankListTemp += arr[i][k]
      rankListTemp += ' '
    }
    rankListTemp += '\n'
    rankList += rankListTemp
  }
  return rankList
} */

// 实现快速排序算法，用于根据灵巧度对玩家对象进行排序
function qsort(data, l, r) {
  // 基本情况：当只有一个元素或没有元素时返回
  if (l >= r)
    return;
  // 初始化基准值和指针
  let i = l - 1, j = r + 1, x = data[Math.floor((l + r) / 2)].dex;
  // 分区步骤
  while (i < j) {
    // 移动 i 指针直到 data[i].dex >= x
    do
      i++;
    while (data[i].dex > x);
    // 移动 j 指针直到 data[j].dex <= x
    do
      j--;
    while (data[j].dex < x);
    // 如果 i < j，则交换 data[i] 和 data[j]
    if (i < j) {
      [data[i], data[j]] = [data[j], data[i]];
    }
  }
  // 递归地对左右子数组进行排序
  qsort(data, l, j);
  qsort(data, j + 1, r);
}

//不同模式下进行排序
function ssort(data, point = "") {
  let sortpart = []
  let pointpart = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].cname !== point) {
      sortpart.push(data[i])
    }
    else {
      pointpart.push(data[i]);
    }
  }
  sortpart.sort(function cmp(a, b) { return b.dex - a.dex });
  let ansdata = []
  for (let i = 0; i < sortpart.length; i++) {
    pointpart.push(sortpart[i])
  }
  return pointpart
}

//排序结果
function ranks(arr) {
  let rankList = "\n";
  for (let i = 0; i < arr.length; i++) {
    rankList += arr[i].cname + "    hp：" + arr[i].HP + "/" + arr[i].HPM + "\n"
    rankList += "敏捷：" + arr[i].dex + "    力量：" + arr[i].str + "    体型：" + arr[i].siz + "\n"
    rankList += "体格：" + arr[i].BUILD + "    db：" + arr[i].DB[0]
    if (arr[i].DB[1] !== 1) rankList += "d" + arr[i].DB[1];
    rankList += "\n" + "斗殴：" + arr[i].斗殴 + "    闪避：" + arr[i].闪避 + "    手枪：" + arr[i].手枪 + "\n==========================\n"
  }
  return rankList;
}

//轻量简化排序输出
function simple_ranks(arr) {
  let rankList = "";
  for (let i = 0; i < arr.length; i++) {
    rankList += "\n" + arr[i].cname + "    敏捷：" + arr[i].dex + "    斗殴：" + arr[i].斗殴
  }
  return rankList;
}

function list(arr) {
  let cnameList = "\n";
  for (let i = 0; i < arr.length; i++) {
    cnameList += arr[i].cname + "\n"
  }
  return cnameList;
}

//============================================================================================//

// 首先检查是否已经存在
let ext = seal.ext.find('Combat&Chases Assist System');
if (!ext) {
  // 不存在，那么建立扩展，名为，作者“”，版本1.0.0
  ext = seal.ext.new('Combat&Chases Assist System', '社亦园 冰红茶', '0.1.0');
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
            input = cmdArgs.getArgN(++inputcount)
            while (input !== '/' && input !== "") {
              transfer += input
              transfer += " "
              input = cmdArgs.getArgN(++inputcount)
            }
            transfer += "\n"
          }
        }
        let CCCharactersNew = parseUserData(transfer);
        // let transferTemp = ext.storageGet(STORAGE_KEY);
        let transferTemp = seal.vars.strGet(ctx, `$gCCAS单位数据录入`)
        transfer += '\n' + transferTemp[0];
        // ext.storageSet(STORAGE_KEY, transfer);
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, transfer)
        let CCCharacters = parseUserData(transfer);
        seal.replyToSender(ctx, msg, `录入成功，${CCCharactersNew.length}名NPC已加入本次战斗。本次战斗目前共有${CCCharactersNew.length}名参与者。`);
        return seal.ext.newCmdExecuteResult(true);
      } else {
        seal.replyToSender(ctx, msg, `指令错误，请使用“.combat help”查看正确指令。`)
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
cmdDeleteNPC.help = '';
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
          let input = ''
          let transfer = ""
          while (val--) {
            input = cmdArgs.getArgN(++inputcount)
            transfer += input + "\n"
          }
          bin = transfer.split('\n')
        }
        else {
          if (cmdArgs.getArgN(2) === "") {
            let transfer = val + "\n"
            bin = transfer.split("\n")
          }
        }
        //从线上读取已储存的参战单位数据到本地
        let textOL = seal.vars.strGet(ctx, `$gCCAS单位数据录入`)[0]
        const lines = textOL.split('\n');
        //查找要删除的对象并删除
        let deletetransferer = textOL.split('[')
        let deleteTransfer = deletetransferer[0].trim()
        let dataline = deleteTransfer.split('\n')
        let transtext = ""
        for (const initline of dataline) {
          let lineparts = initline.trim().split(' ')
          let leaveline = 1
          for (let judgenumber = 0; judgenumber < bin.length; judgenumber++) {
            if (lineparts[0] === bin[judgenumber])
              leaveline = 0
          }
          if (leaveline) {
            transtext += initline + "\n"
          }
        }
        transtext = transtext.trim()
        let textNew = transtext
        // combat new
        const sora = []
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, JSON.stringify(sora))
        // setnpc
        textNew += "\n" + "\n[]"
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, textNew)
        seal.replyToSender(ctx, msg, `已删除${bin}共${bin.length - 1}名NPC`)
        return seal.ext.newCmdExecuteResult(true);
      }
      else {
        seal.replyToSender(ctx, msg, `指令错误，请使用“.combat help”查看正确指令。`)
      }
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['deletenpc'] = cmdDeleteNPC;

//NPC数据补录
const cmdAddNPC = seal.ext.newCmdItemInfo();
cmdAddNPC.name = 'addnpc'; // 指令名字，可用中文
cmdAddNPC.help = '';
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
        let t = val
        let input = '';
        let transfer = "";
        input = cmdArgs.getArgN(++inputcount);
        while (val--) {
          if (input === '/') {
            input = cmdArgs.getArgN(++inputcount)
            while (input !== '/' && input !== "") {
              transfer += input
              transfer += " "
              input = cmdArgs.getArgN(++inputcount)
            }
            transfer += "\n"
          }
        }
        //从线上读取已储存的参战单位数据到本地
        let textOL2 = seal.vars.strGet(ctx, `$gCCAS单位数据录入`)[0]
        let addtransferer = textOL2.split('[')
        let addTransfer = addtransferer[0].trim()
        let textadd = addTransfer + "\n" + transfer
        textadd += "\n[]"
        // combat new
        const sora = []
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, JSON.stringify(sora))
        // setnpc
        seal.vars.strSet(ctx, `$gCCAS单位数据录入`, textadd)
        seal.replyToSender(ctx, msg, `已加入共${t}名NPC`)
        return seal.ext.newCmdExecuteResult(true);

      } else {
        seal.replyToSender(ctx, msg, `指令错误，请使用“.combat help”查看正确指令。`)
      }
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['addnpc'] = cmdAddNPC;

//============================================================================================//




//============================================================================================//





//设置默认战斗规则
let ruleCombat = 1
//规则设置指令
const cmdCombat = seal.ext.newCmdItemInfo();
cmdCombat.name = 'combat'; // 指令名字，可用中文
cmdCombat.help = 'a. 设置战斗规则\n格式: .combat <规则编号>\n描述: 更改当前战斗规则。规则编号必须是1至3之间的整数，每个编号代表一种不同的战斗规则配置:\n       1:直接依照敏捷排序\n        2:含有先发制人（突袭）的战斗排序，参考setnpc与setpc指令\n       3:含有先攻检定的战斗排序\n\nb. 清空数据\n格式: .combat new\n描述: 清除所有参战单位的数据，重置为初始状态。\n\nc. 排序行动顺序\n格式: .combat rank\n描述: 根据当前存储的参战单位数据，自动排序并显示行动顺序。\n\nd. 列出参战单位\n格式: .combat list\n描述: 列出所有已加入战斗的单位列表。'
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
        ruleCombat = val
        seal.replyToSender(ctx, msg, `规则${ruleCombat}已启用。`)
        seal.vars.strSet(ctx, '$gCCAS战斗规则录入', val)
      } else {
        if (val === 'new') {
          const sora = []
          let ___rule = 1
          seal.vars.strSet(ctx, `$gCCAS单位数据录入`, JSON.stringify(sora))
          seal.vars.strSet(ctx, `$gCCAS战斗规则录入`, JSON.stringify(___rule))
          seal.replyToSender(ctx, msg, `数据已清空`)
        } else {
          if (val === 'rank') {
            let rankCCCharacters = parseUserData(seal.vars.strGet(ctx, `$gCCAS单位数据录入`)[0])
            let ranktype = JSON.parse(seal.vars.strGet(ctx, '$gCCAS战斗规则录入')[0])
            let rank_method = cmdArgs.getArgN(2);
            if (ranktype === 1 || rank_method === "simple" || rank_method === "") {
              qsort(rankCCCharacters, 0, rankCCCharacters.length - 1)
              let resultRank
              if (rank_method === "simple") {
                resultRank = simple_ranks(rankCCCharacters)
              }
              else {
                resultRank = ranks(rankCCCharacters)
              }
              seal.replyToSender(ctx, msg, `行动顺序：\n${resultRank}`)
            }
            // 带突袭的检定，格式为.combat rank 张三(cname) 50(成功率)
            else if (ranktype === 2) {
              let sup_name = cmdArgs.getArgN(2)
              let sup_rate = cmdArgs.getArgN(3)
              rank_method = cmdArgs.getArgN(3)
              if (sup_rate === "" || rank_method === "simple")
                sup_rate = 100
              if (rank_method !== "simple")
                rank_method = cmdArgs.getArgN(4)
              let sup_roll = D(1, 100)
              let sup_level = successlevel(sup_roll, sup_rate)
              if (sup_level <= 1) {
                //seal.replyToSender(ctx, msg, `突袭检定${sup_roll}\/${sup_rate}${successdiscription[sup_level]}`)
                qsort(rankCCCharacters, 0, rankCCCharacters.length - 1)
                let resultRank
                if (rank_method === "simple")
                  resultRank = simple_ranks(rankCCCharacters)
                else
                  resultRank = ranks(rankCCCharacters)
                seal.replyToSender(ctx, msg, `突袭检定${sup_roll}\/${sup_rate}${successdiscription[sup_level]}\n行动顺序：\n${resultRank}`)
              }
              else {
                //seal.replyToSender(ctx, msg, `突袭检定${sup_roll}\/${sup_rate}${successdiscription[sup_level]}`)
                ssort(rankCCCharacters, sup_name)
                let resultRank
                if (rank_method === "simple")
                  resultRank = simple_ranks(rankCCCharacters)
                else
                  resultRank = ranks(rankCCCharacters)
                seal.replyToSender(ctx, msg, `突袭检定${sup_roll}\/${sup_rate}${successdiscription[sup_level]}\n行动顺序：\n${resultRank}`)
              }
            }
            // seal.replyToSender(ctx, msg, `行动顺序：\n${resultRank}`)
            // seal.replyToSender(ctx, msg, `云端：\n${ext.storageGet(STORAGE_KEY)}`)
          } else {
            if (val == 'list') {
              let rankCCCharacters = parseUserData(seal.vars.strGet(ctx, `$gCCAS单位数据录入`)[0])
              let resultList = list(rankCCCharacters)
              seal.replyToSender(ctx, msg, `参战单位列表：\n${resultList}`)
            } else {
              seal.replyToSender(ctx, msg, `指令错误，请使用“.combat help”查看正确指令。`)
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



