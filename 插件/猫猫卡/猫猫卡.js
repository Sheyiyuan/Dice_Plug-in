// ==UserScript==
// @name         猫猫卡
// @author       社亦园
// @version      1.0.1
// @description  猫猫卡制卡指令
// @timestamp    1714308527
// 2024-04-28 20:48:47
// @license      MIT
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

//函数D(n,x,k,p,c)=(nDx+p)*k+c
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
let ext = seal.ext.find('猫猫卡');
if (!ext) {
  // 不存在，那么建立扩展，名为，作者“”，版本1.0.0
  ext = seal.ext.new('猫猫卡', '社亦园', '1.0.1');
  // 注册扩展
  seal.ext.register(ext);
}

const cmdCoccat = seal.ext.newCmdItemInfo();
cmdCoccat.name = 'coccat'; // 指令名字，可用中文
cmdCoccat.help = 'COC猫猫卡制卡指令:\n.coccat (<数量>) // 制卡指令，返回<数量>组猫猫属性';
cmdCoccat.solve = (ctx, msg, cmdArgs) => {
  console.log(ctx)
  let val = cmdArgs.getArgN(1);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      seal.replyToSender(ctx, msg, `${ctx.player.name}老师的七版COC猫猫作成:`);
      let att = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (!val) val = 1;
      for (let i = 0; i < val; i++) {
        att[0] = D(1, 3, 5)
        att[1] = D(2, 6, 5, 14)
        att[2] = D(2, 6, 5, 6)
        att[3] = D(2, 6, 5)
        att[4] = D(3, 6, 5)
        att[5] = D(3, 6, 5, 3)
        att[6] = 5
        att[7] = D(2, 6, 5, 3)
        att[8] = Math.floor((att[3] + 5) / 10)
        att[9] = D(3, 6, 5)
        seal.replyToSender(ctx, msg, `力量:${att[0]} 敏捷:${att[1]} 意志:${att[2]}\n体质:${att[3]} 外形:${att[4]} 教养:${att[5]}\n体型:${att[6]} 智力:${att[7]}\nHP:${att[8]} 幸运:${att[9]}`);
      }
    }
      return seal.ext.newCmdExecuteResult(true);
  }
}
  ;
// 将命令注册到扩展中
ext.cmdMap['coccat'] = cmdCoccat;