// ==UserScript==
// @name         半拍不可能这么可爱
// @author       社亦园
// @version      1.0.0
// @description  骰子养成系统
// @timestamp    1720671633
// 2024-07-11 12:20:33
// @license      MIT
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

// 注册拓展
let ext = seal.ext.find('半拍不可能这么可爱');
if (!ext) {
  ext = seal.ext.new('半拍不可能这么可爱', '社亦园', '1.0.0');
  seal.ext.register(ext);
}

//函数区

//主函数
ext.onNotCommandReceived = (ctx, msg) => {
  //接收消息并处理
  let user = ctx.player.userID;
  let uName = ctx.player.name;
  let message = msg.message;

}