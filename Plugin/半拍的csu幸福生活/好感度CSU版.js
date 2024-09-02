// ==UserScript==
// @name         好感度CSU版
// @author       社亦园
// @version      1.0.0
// @description  好感度csu限定
// @timestamp    1722304556
// 2024-07-30 09:55:56
// @license      MIT
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

/*
策划案
A.送礼物
每天第一次送礼，成功率100%，之后每次送礼成功率-25%，最低变为25%。

*/


//函数区
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

// 首先检查是否已经存在
let ext = seal.ext.find('好感度CSU版');
if (!ext) {
  // 不存在，那么建立扩展，名为好感度CSU版'，作者“”，版本1.0.0
  ext = seal.ext.new('好感度CSU版', '社亦园', '1.0.0');
  // 注册扩展
  seal.ext.register(ext);
}

//编写处理函数
ext.onNotCommandReceived = (ctx, msg) => {
  // 处理消息
  let user = ctx.player.userID;
  let uName = ctx.player.name;
  let message = msg.message;
  const gift = /^((给)|(送))(半拍).*$/

  if (gift.test(message)) {

    seal.replyToSender(ctx, msg, ``);
  } else if (message === 'GFdebugclear') {
    if (ctx.privilegeLevel >= 70) {

      seal.replyToSender(ctx, msg, `调试已完成`);
    } else {
      seal.replyToSender(ctx, msg, `操作权限不足`);
    }
  }
}