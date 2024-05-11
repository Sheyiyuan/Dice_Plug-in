// ==UserScript==
// @name         半拍想要变得可爱
// @author       社亦园
// @version      1.0.2
// @description  半拍的自定义回复与养成系统
// @timestamp    1714444402
// 2024-04-30 10:33:22
// @license      MIT
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

//函数区
//时间抓取函数
function timeNow() {
  // 获取当前日期和时间
  const currentDate = new Date();
  // 获取年、月、日
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 月份从0开始，所以要加1
  const day = currentDate.getDate();
  // 获取星期几（0代表星期日，1代表星期一，以此类推）
  const weekday = currentDate.getDay();
  // 将数字表示的星期转换为具体的名称
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const currentWeekday = weekdays[weekday];
  // 获取小时、分钟、秒
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  //记录时间并返回
  let newTime = [0, 0, 0, 0, 0, 0, 0, 0];
  newTime[0] = year;
  newTime[1] = month;
  newTime[2] = day;
  newTime[3] = weekday;
  newTime[4] = hours;
  newTime[5] = minutes;
  newTime[6] = seconds;
  newTime[7] = currentWeekday;

  return newTime;
}
//连续签到奖励计算函数
function cBunos(time) {
  if (time <= 7) {
    cSum = 4500 + 500 * time;
  } else {
    cSum = 8000;
  }
  return cSum
}
//签到次序奖励计算函数
function oBunos(order) {
  if (order <= 5) {
    oSum = 3000 - 500 * order;
  } else {
    oSum = 500;
  }
  return oSum
}
//Dice函数D(n,x,k,p,c)=(nDx+p)*k+c
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

// 首先检查是否已经存在
let ext = seal.ext.find('半拍想要变得可爱');
if (!ext) {
  // 不存在，那么建立扩展，名为，作者“”，版本
  ext = seal.ext.new('半拍想要变得可爱', '社亦园', '1.0.1');
  // 注册扩展
  seal.ext.register(ext);
}



// 这里编写处理函数
ext.onNotCommandReceived = (ctx, msg) => {
  console.log(ctx);
  let user = ctx.player.userID;
  let uName = ctx.player.name;
  let message = msg.message;
  console.log(user);
  console.log(uName);
  console.log(message);
  //建立临时变量承接相应的海豹变量
  let Money = seal.vars.intGet(ctx, `$m余额`);
  let tempM = Money[0];
  let DateVar = seal.vars.intGet(ctx, `$mDV`);
  let tempDV = DateVar[0];
  let Likability = seal.vars.intGet(ctx, `$m好感度`);
  let tempLA = Likability[0];
  let checkIn = seal.vars.intGet(ctx, `$m打卡`);
  let tempCI = checkIn[0];
  let checkInOrder = seal.vars.intGet(ctx, `$g打卡次序`);
  let tempCIO = checkInOrder[0];
  let checkDV = seal.vars.intGet(ctx, `$g打卡日期`);
  let DV = checkDV[0];

  /*   参考返回值语句
  seal.vars.intSet(ctx, `$m余额`, tempM);
    seal.vars.intSet(ctx, `$mDV`, tempDV);
    seal.vars.intSet(ctx, `$m好感度`, tempLA);
    seal.vars.intSet(ctx, `$打卡`, tempCI); 
    seal.vars.intSet(ctx, `$g打卡次序`, tempCIO); 
    seal.vars.intSet(ctx, `$g打卡日期`, tempDV); 
    */

  if (message === '打卡') {
    //打卡模块
    //同步日期变量
    let usingTime = timeNow();
    let usingTimeTemp = String(usingTime[0]) + String(usingTime[1]) + String(usingTime[2]);
    //签到次序思路
    //检查日期是否更变，如果更变，重置签到次序表的值为1，否则签到次序表的值+1，范围为群
    let DVO = DV;
    DV = Number(usingTimeTemp);
    seal.vars.intSet(ctx, `$g打卡日期`, DV);
    if (DVO !== DV) {
      tempCIO = 1;
    } else {
      tempCIO += 1;
    }
    //连续签到思路
    //检查日期是否更变，如果更变，重置连续签到表的值为1，否则连续签到表的值+1，范围为个人
    let tempDVO = tempDV;
    tempDV = Number(usingTimeTemp);
    if (DVO !== DV) {
      tempCI = 1;
    } else {
      tempCI += 1;
    }
    //回复模块
    if (tempDVO === DV) {
      seal.vars.intSet(ctx, `$mDV`, tempDV);
      seal.replyToSender(ctx, msg, `${ctx.player.name}老师今天已经打卡领过工资了，请明天再来吧。`);
    } else {
      tempDVO = DV;
      seal.vars.intSet(ctx, `$mDV`, tempDV);
      let tempMAddition = cBunos(tempCI) + oBunos(tempCIO)
      tempM += tempMAddition
      //发放签到奖励
      seal.replyToSender(ctx, msg, `${ctx.player.name}老师今天第${tempCIO}个打卡，已连续打卡${tempCI}天，今日领取工资${tempMAddition}信用点。`);
      seal.vars.intSet(ctx, `$打卡`, tempCI);
      seal.vars.intSet(ctx, `$g打卡次序`, tempCIO);
      seal.vars.intSet(ctx, `$m余额`, tempM);
    }
  }
  //查询余额
  if (message === '查询余额') {
    seal.replyToSender(ctx, msg, `${ctx.player.name}老师的当前余额为${tempM}信用点。`);
  }
  //查询好感度
  if (message === '查询好感度') {
    seal.replyToSender(ctx, msg, `半拍对${ctx.player.name}老师的当前好感度为${tempLA}。`);
  }
  //冰淇淋
  if (message === '请半拍吃冰淇淋') {
    if (tempM <= 2000) {
      seal.replyToSender(ctx, msg, `你翻了翻口袋，自己的余额似乎不太支持你的想法`);
    } else {
      tempM -= 2000
      let tempLAAddition = D(2, 2)
      tempLA += tempLAAddition
      seal.vars.intSet(ctx, `$m余额`, tempM);
      seal.vars.intSet(ctx, `$m好感度`, tempLA);
      seal.replyToSender(ctx, msg, `半拍看上去很开心，微红脸上露出了一丝微笑。\n半拍对${ctx.player.name}老师的好感度提高了${tempLAAddition}点。当前好感度为${tempLA}。\n当前余额${tempM}信用点。`);
    }
  }
  //麦旋风
  if (message === '请半拍吃麦旋风') {
    if (tempM <= 3000) {
      seal.replyToSender(ctx, msg, `你翻了翻口袋，自己的余额似乎不太支持你的想法`);
    } else {
      tempM -= 3000
      let tempLAAddition = D(4, 2)
      tempLA += tempLAAddition
      seal.vars.intSet(ctx, `$m余额`, tempM);
      seal.vars.intSet(ctx, `$m好感度`, tempLA);
      seal.replyToSender(ctx, msg, `你和半拍在情人坡上晒着太阳，吃着麦旋风，她脸上的笑容像手里的麦旋风一样甜美。\n半拍对${ctx.player.name}老师的好感度提高了${tempLAAddition}点。当前好感度为${tempLA}。\n当前余额${tempM}信用点。`);
    }
  }
  if (message === 'debugclear') {
    if (ctx.privilegeLevel >= 70) {
      tempCIO = 0
      tempCI = 0
      tempMAddition = 0
      seal.vars.intSet(ctx, `$mDV`, 0);
      seal.vars.intSet(ctx, `$打卡`, 0);
      seal.vars.intSet(ctx, `$g打卡次序`, 0);
      seal.vars.intSet(ctx, `$g打卡日期`, 0);
      seal.replyToSender(ctx, msg, `调试已完成`);
    } else {
      seal.replyToSender(ctx, msg, `操作权限不足`);
    }
  }
}
