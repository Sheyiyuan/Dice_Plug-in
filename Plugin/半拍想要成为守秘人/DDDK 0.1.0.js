// ==UserScript==
// @name         Do Lord Dice Dream of Keeper?
// @author       社亦园
// @version      0，1.0
// @description  一个更好更易用的单人模组插件（？）
// @timestamp    1716863621
// 2024-05-28 10:33:41
// @license      MIT
// @homepageURL  https://github.com/Sheyiyuan/Dice_Plug-in.git
// ==/UserScript==

/*
主要功能
1.剧本引导（后续可能会支持特定格式的外部json剧本？）
2.战斗优化（参考ccas系统）
3.进度回溯/存档/读档
4.特殊报表（如《鸽子湾》中的时间表）
*/
//注册扩展
// 首先检查是否已经存在
let ext = seal.ext.find('Do Lord Dice Dream of Keeper?');
if (!ext) {
  // 不存在，那么建立扩展，名为，作者“”，版本1.0.0
  ext = seal.ext.new('Do Lord Dice Dream of Keeper?', '社亦园', '0.1.0');
  // 注册扩展
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

// 修复后的伤害计算函数 感谢AI的大力debug
function damagecal(damagestring, db, successrank = 2) {
  let throughout = 0;
  if (damagestring.includes('*')) { // 使用正确的转义字符
    throughout = 1;
  }
  // 移除字符串中的'*'符号以方便计算
  let damagetext = damagestring.replace(/\*/g, ''); // 使用正则表达式替换

  let damageparts = damagetext.split('+'); // 更改变量名为damageparts以避免与循环变量混淆
  let totalDamage = 0;

  for (let i = 0; i < damageparts.length; i++) {
    let partDamage = 0;
    let damagePart = damageparts[i].split('-');

    if (damagePart[0] === 'db') {
      if (successrank < 4) {
        partDamage += Number(D(db[0], db[1]));
      } else {
        if (throughout === 0) {
          partDamage += Number(db[0] * db[1]);
        } else {
          partDamage += Number(db[0] * db[1]) + Number(D(db[0], db[1]));
        }
      }
    } else if (damagePart[0] === '半db') {
      if (successrank < 4) {
        partDamage += Math.floor(Number(D(db[0], db[1])) / 2);
      } else {
        if (throughout === 0) {
          partDamage += Math.floor(Number(db[0] * db[1]) / 2);
        } else {
          partDamage += Math.floor((Number(db[0] * db[1]) + Number(D(db[0], db[1]))) / 2);
        }
      }
    } else if (!isNaN(damagePart[0]) && damagePart[0] >= 0 && damagePart[0] <= 100) { // 添加缺失的条件判断开始括号，并处理数字直接伤害
      partDamage += Number(damagePart[0]);
    } else if (damagePart[0].includes('d')) {
      let diceParts = damagePart[0].split('d');
      diceParts[0] = Number(diceParts[0]);
      diceParts[1] = Number(diceParts[1]);

      if (successrank < 4) {
        partDamage += Number(D(diceParts[0], diceParts[1]));
      } else {
        if (throughout === 0) {
          partDamage += Number(diceParts[0] * diceParts[1]);
        } else {
          partDamage += Number(diceParts[0] * diceParts[1]) + Number(D(diceParts[0], diceParts[1]));
        }
      }
    }

    // 应用减伤部分
    for (let j = 1; j < damagePart.length; j++) {
      partDamage -= Number(damagePart[j]);
    }

    totalDamage += partDamage;
  }

  // 确保总伤害不为负数
  if (totalDamage < 0) {
    totalDamage = 0;
  }

  return totalDamage;
}

