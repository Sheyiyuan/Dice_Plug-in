// ==UserScript==
// @name         我的骰子不可能这么可爱
// @author       社亦园
// @version      1.0.0
// @description  一个简单的骰子养成系统、商店系统与银行系统
// @timestamp    1720671633
// 2024-08-03 12:20:33
// @license      MIT
// @homepageURL  https://github.com/Sheyiyuan/Dice_Plug-in
// ==/UserScript==

//简单个性化配置区
const PersonalSetting = {
  //骰子名字
  'diceName': '半拍',
  //称呼玩家时的前后缀，pre为前缀，suf为后缀，不写为空
  'prePlayerAppellation': '',
  'sufPlayerAppellation': '老师',
  //货币单位
  'monetaryUnit': '信用点',
}

//全局值传递变量
const GlobalVarTras = {}

//功能函数区
//骰子模拟函数
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
//制表函数
function makeList(Object) {
  let lsit = '';
  for (let key in Object) {
    lsit += '\n' + key;
  }
  return lsit;
}

//solve函数区
const CheckIn = {
  main: function () {
    GlobalVarTras.checkInOrder = this.checkOrder()
    if (!GlobalVarTras.checkToday) {
      seal.replyToSender(GlobalVarTras.ctx, GlobalVarTras.msg, CheckInText['success']);
    } else {
      seal.replyToSender(GlobalVarTras.ctx, GlobalVarTras.msg, CheckInText['fail']);
    }
  },
  checkOrder: function () {
    let checkInOrder = seal.vars.intGet(ctx, `$checkInOrder`)[0]
    let date = String(timeNow()[0]) + String(timeNow()[1]) + String(timeNow()[2]);
    let dateRecord = seal.vars.strGet(GlobalVarTras.ctx, `$gdate`)[0]
    let datePlayer = seal.vars.strGet(GlobalVarTras.ctx, `$mdatePlayer`)[0]
    if (dateRecord !== date) {
      checkInOrder = 1;
      seal.vars.intSet(GlobalVarTras.ctx, `$checkInOrder`, checkInOrder)
      seal.vars.strSet(GlobalVarTras.ctx, `$gdate`, date)
    } else {
      checkInOrder += 1;
      seal.vars.intSet(GlobalVarTras.ctx, `$checkInOrder`, checkInOrder)
    }
    if (datePlayer !== date) {
      GlobalVarTras.checkToday = false
      seal.vars.strSet(GlobalVarTras.ctx, `$mdatePlayer`, date)
    } else {
      GlobalVarTras.checkToday = true
    }
    return checkInOrder;
  }
}
const Query = {
  main: function (val) {
    if (val === '余额') {
      seal.replyToSender(GlobalVarTras.ctx, GlobalVarTras.msg, queryText['余额']);
    } else if (val === '好感度') {
      seal.replyToSender(GlobalVarTras.ctx, GlobalVarTras.msg, queryText['好感度']);
    } else if (val === '持有物品') {

    } else {
      seal.replyToSender(GlobalVarTras.ctx, GlobalVarTras.msg, '查找对象为NaN或null，请重新输入。');
    }
  }
}
const Remittance = {
  main: function (val, aim) {
    let balance = seal.vars.intGet(GlobalVarTras.ctx, `$m余额`)[0];
    if (val > balance) {
      seal.replyToSender(GlobalVarTras.ctx, GlobalVarTras.msg, remittanceText['failNoEnough']);
    } else if (!this.aimdeal(val, aim)) {
      seal.replyToSender(GlobalVarTras.ctx, GlobalVarTras.msg, remittanceText['failNoTarget']);
    } else if (val <= 0) {
      seal.replyToSender(GlobalVarTras.ctx, GlobalVarTras.msg, remittanceText['failWeongRem']);
    } else if (this.aimdeal(val, aim)) {

    }
  },
  aimdeal: function (val, aim) {

  }
}
const Shop = {
  main: function (act, value) {

  },
  findItem: function (value) {

  }
}

//资源文案区
const playerName = PersonalSetting.prePlayerAppellation + GlobalVarTras.ctx.player.name + PersonalSetting.sufPlayerAppellation
const CheckInText = {
  'help': `使用“.打卡”指令进行打卡，获得一定量的${PersonalSetting[monetaryUnit]},每天仅限一次。`,
  'success': `${playerName}今天第${GlobalVarTras.checkInOrder}个打卡，获得${未知变量}${PersonalSetting.monetaryUnit}，当前共拥有${seal.vars.intGet(GlobalVarTras.ctx, `$m余额`)[0]}`,
  'fail': `${playerName}今天已经打过卡了。`
}
const queryText = {
  'help': `使用“.查询”指令查询自己的信息，包括余额、好感度、持有物品等。`,
  '余额': `${playerName}的余额为${seal.vars.intGet(GlobalVarTras.ctx, `$m余额`)[0]}${PersonalSetting.monetaryUnit}。`,
  '好感度': `${playerName}的好感度为${seal.vars.intGet(GlobalVarTras.ctx, `$m好感度`)[0]}。`,
  '持有物品': `${playerName}的持有物品为???。`,
}
const remittanceText = {
  'help': `使用“.转账”指令进行转账，需要输入转账金额和接收方，转账后将扣除转账金额，转账成功后将给接收方增加相应的金额。`,
  'success': `转账成功，转账金额为${val}${PersonalSetting.monetaryUnit}，当前${未知变量}余额为${未知变量}${PersonalSetting.monetaryUnit}。`,
  'failNoEnough': `转账失败，余额不足。当前余额为${seal.vars.intGet(GlobalVarTras.ctx, `$m余额`)[0]}${PersonalSetting.monetaryUnit}。`,
  'failNoTarget': `转账失败，接收方不存在。`,
  'failWeongRem': `转账失败，金额输入有误。`
}
const shopText = {
  'help': `使用“.商店”指令进行查询或购买，需要输入购买物品的名字，购买成功后将扣除相应的金额。`,
}
const giveText = {
  'help': `使用“.赠送”指令给${PersonalSetting.diceName}赠送，赠送成功会提升好感度。`,
}

//对接区
// 注册拓展
let ext = seal.ext.find('我的骰子不可能这么可爱');
if (!ext) {
  ext = seal.ext.new('我的骰子不可能这么可爱', '社亦园', '1.0.0');
  seal.ext.register(ext);
}
//注册命令
// 打卡
const cmdCI = seal.ext.newCmdItemInfo();
cmdCI.name = 'checkIn'; // 指令名字，可用中文
cmdCI.help = CheckInText['help'];
cmdCI.solve = (ctx, msg, cmdArgs) => {
  let val = cmdArgs.getArgN(1);
  GlobalVarTras[ctx] = ctx
  GlobalVarTras[msg] = msg
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      CheckIn.main();
      return seal.ext.newCmdExecuteResult(true);
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['checkIn'] = cmdCI;
ext.cmdMap['打卡'] = cmdCI;

// 查询
const cmdQy = seal.ext.newCmdItemInfo();
cmdQy.name = 'query'; // 指令名字，可用中文
cmdQy.help = queryText['help'];
cmdQy.solve = (ctx, msg, cmdArgs) => {
  GlobalVarTras[ctx] = ctx
  GlobalVarTras[msg] = msg
  let val = cmdArgs.getArgN(1);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      Query.main(val)
      return seal.ext.newCmdExecuteResult(true);
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['query'] = cmdQy;
ext.cmdMap['查询'] = cmdQy;

// 转账
const cmdRe = seal.ext.newCmdItemInfo();
cmdRe.name = 'remittance'; // 指令名字，可用中文
cmdRe.help = '';
cmdRe.solve = (ctx, msg, cmdArgs) => {
  GlobalVarTras[ctx] = ctx
  GlobalVarTras[msg] = msg
  let val = cmdArgs.getArgN(1);
  let aim = cmdArgs.getArgN(2);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      Remittance.main(val, aim)
      return seal.ext.newCmdExecuteResult(true);
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['转账'] = cmdRe;
ext.cmdMap['rem'] = cmdRe;

//商店
const cmdCNT = seal.ext.newCmdItemInfo();
cmdCNT.name = 'shop'; // 指令名字，可用中文
cmdCNT.help = shopText['help'];
cmdCNT.solve = (ctx, msg, cmdArgs) => {
  let act = cmdArgs.getArgN(1);
  let value = cmdArgs.getArgN(2);
  GlobalVarTras[ctx] = ctx
  GlobalVarTras[msg] = msg
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {

      return seal.ext.newCmdExecuteResult(true);
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['shop'] = cmdCNT;
ext.cmdMap['商店'] = cmdCNT;

//赠送
const cmd = seal.ext.newCmdItemInfo();
cmd.name = 'give'; // 指令名字，可用中文
cmd.help = giveText['help'];
cmd.solve = (ctx, msg, cmdArgs) => {
  let val = cmdArgs.getArgN(1);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {

      return seal.ext.newCmdExecuteResult(true);
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['give'] = cmd;
ext.cmdMap['赠送'] = cmd;   