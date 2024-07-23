// ==UserScript==
// @name         半拍的csu幸福生活-刷题姬
// @author       社亦园
// @version      1.0.0
// @description  
// @timestamp    1721695082
// 2024-07-23 08:38:02
// @license      MIT
// @homepageURL  https://github.com/Sheyiyuan/Dice_Plug-in
// ==/UserScript==

//注册拓展
let ext = seal.ext.find('半拍的csu幸福生活-刷题姬');
if (!ext) {
    ext = seal.ext.new('半拍的csu幸福生活-刷题姬', '社亦园', '1.0.0');
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
//素材库

//文案库
const LeadingText = [
    "别再摸鱼啦，来刷题吧！",
    "习题，我想想，就这个吧。",
    "喏，试试这道题？",
    "当你看到这道题，你就知道自己要刷题了。",
    "这道题你一定能做出来！",
    "做题使人进步，来试试这道题吧！"
]
const QBList = '可用题库：\njm --吉米多维奇数学分析习题集解选 '

//命令
const cmdExercise = seal.ext.newCmdItemInfo();
cmdExercise.name = 'mmk';
cmdExercise.help = '在指令后输入题库名作为参数以开始刷题，使用“.mmk list”查看可用题库';
cmdExercise.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
        case 'help': {
            const ret = seal.ext.newCmdExecuteResult(true);
            ret.showHelp = true;
            return ret;
        }
        default: {
            if (val == 'list') {
                //发送可用题库列表
                seal.replyToSender(ctx, msg, QBList);
            } else if (val == 'jm') {
                //发送随机文案
                seal.replyToSender(ctx, msg, `${LeadingText[D(1, LeadingText.length, 1, -1, 0)]}`);
                //发送随机题目
                seal.replyToSender(ctx, msg, `[CQ:image,file=http://8.137.88.145:8000/JM/JM${D(1, 54)}.jpg]`);
            } else {
                seal.replyToSender(ctx, msg, `没有找到${val}的题目，请使用“.mmk help”查看帮助`);
            }
            return seal.ext.newCmdExecuteResult(true);
        }
    }
};
// 将命令注册到扩展中
ext.cmdMap['mmk'] = cmdExercise;
ext.cmdMap['刷题'] = cmdExercise;