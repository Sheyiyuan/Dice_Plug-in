// ==UserScript==
// @name         半拍的csu幸福生活-新生中南地图
// @author       社亦园
// @version      1.0.0
// @description  新生常用地点导航与学长锐评
// @timestamp    1721804141
// 2024-07-24 14:55:41
// @license      MIT
// @homepageURL  https://github.com/Sheyiyuan/Dice_Plug-in
// ==/UserScript==

//文案区
const CsuMap = {
  libraryNew: function () {
    seal.replyToSender(ctx, msg, "新校区图书馆")
  },
  teachingbuilding: function () {
    seal.replyToSender(ctx, msg, "")
  },
  resterant: function () {
    this.resterant2()
    this.resterant7()
    this.resterant8()
    this.resterant24()
  },
  resterant2: function () {
    seal.replyToSender(ctx, msg, "")
  },
  resterant7: function () {
    seal.replyToSender(ctx, msg, "")
  },
  resterant8: function () {
    seal.replyToSender(ctx, msg, "")
  },
  resterant24: function () {
    seal.replyToSender(ctx, msg, "")
  },
  sms: function () {
    seal.replyToSender(ctx, msg, "")
  },
  houhu: function () {
    seal.replyToSender(ctx, msg, "")
  },
  lunan: function () {
    seal.replyToSender(ctx, msg, "")
  },
  qingnianStreet: function () {
    seal.replyToSender(ctx, msg, "")
  },
  workersHospital: function () {
    seal.replyToSender(ctx, msg, "");
  },
  postOffice: function () {
    this.cainiao()
    this.jd()
    this.yd()
    this.sf()
  },
  cainiao: function () {
    seal.replyToSender(ctx, msg, "")
  },
  jd: function () {
    seal.replyToSender(ctx, msg, "")
  },
  yd: function () {
    seal.replyToSender(ctx, msg, "")
  },
  sf: function () {
    seal.replyToSender(ctx, msg, "")
  },
  printer: function () {
    seal.replyToSender(ctx, msg, "关于资料和打印：\n校园书店里有众多的二手书籍，还有往届的学习资料。\n在校园书店旁便是107图文，这里可以扫码直接上传文件打印，如果还有需要调整的地方，也可以在旁边的电脑上操作打印。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/printerMap.png]\n此外，后湖小区也有许多打印店和书店，可供大家选择。")
  },
  other: function () {
    seal.replyToSender(ctx, msg, `未检索到关键字。`)
  },
}
const Regular = {
  libraryNew: new RegExp('^*\\u5E93\\u4E66\\u9986*$', 'u'),
  teachingbuilding: new RegExp('^\\u6559\\u5B66\\u697C.?.?$', 'u'),
  resterant: new RegExp('^\\u991D\\u5382$', 'u'),
  resterant2: new RegExp('^\\u4E8C?2?\\u991D\\u5382$', 'u'),
  resterant7: new RegExp('^\\u4E03?7?\\u991D\\u5382$', 'u'),
  resterant8: new RegExp('^\\u516B?8?\\u991D\\u5382$', 'u'),
  resterant24: new RegExp('^(\\u4E09\\u53F3)?(24)?\\u991D\\u5382$', 'u'),
  sms: new RegExp('^(\\u6570\\u5B66\\u4E0E\\u7EDF\\u8BA1\\u5B66\\u9662)|(\\u6570\\u7406\\u697C)$', 'u'),
  houhu: new RegExp('^(\\u540E\\u6E90(\\u5C0F\\u533A)?(\\u5C0F\\u54CD\\u8857)?)$', 'u'),
  lunan: new RegExp('^(\\u9E93\\u5357)|(\\u9E93\\u5C71\\u5357\\u8DEF)$', 'u'),
  qingnianStreet: new RegExp('^(\\u804C\\u5DE5\\u533B\\u9662)$', 'u'),
  workersHospital: new RegExp('^(\\u804C\\u5DE5\\u533B\\u9662)$', 'u'),
  postOffice: new RegExp('^(\\u5FEB\\u9012(\\u4EE3\\u6536)?(\\u7AD9)?(\\u70B9)?)|(\\u9986\\u7AD9)$', 'u'),
  cainiao: new RegExp('^\\u8349\\u86CB(\\u9986\\u7AD9)?$', 'u'),
  jd: new RegExp('^((\\u4EAC\\u4E1C)?(\\u5FEB\\u9012(\\u4EE3\\u6536)?(\\u7AD9)?(\\u70B9)?))|(\\u4EAC\\u4E1C\\u7269\\u6D41)(\\u4E2D\\u5FC3)?|(\\u4EAC\\u4E1C\\u9986\\u7AD9)$', 'u'),
  yd: new RegExp('^((\\u9F3B\\u8FBE)?(\\u5FEB\\u9012(\\u4EE3\\u6536)?(\\u7AD9)?(\\u70B9)?))|(\\u9F3B\\u8F6F\\u7269\\u6D41)(\\u4E2D\\u5FC3)?|(\\u9F3B\\u8F6F\\u9986\\u7AD9)$', 'u'),
  sf: new RegExp('^((\\u9ED8\\u9876)?(\\u5FEB\\u9012(\\u4EE3\\u6536)?(\\u7AD9)?(\\u70B9)?))|(\\u9ED8\\u9876\\u7269\\u6D41)(\\u4E2D\\u5FC3)?|(\\u9ED8\\u9876\\u9986\\u7AD9)$', 'u'),
  printer: new RegExp('^((\\u6253\\u5370(\\u670D\\u52A1)?(\\u4E2D\\u5FC3)?)|(\\u6253\\u5370\\u5E97))|(\\u4E66\\u5E97)$', 'u'),
}

//参数处理
function dealString(str) {
  if (Regular.libraryNew.test(str)) {
    CsuMap.libraryNew();
  } else if (Regular.teachingbuilding.test(str)) {
    CsuMap.teachingbuilding();
  } else if (Regular.resterant.test(str)) {
    CsuMap.resterant();
  } else if (Regular.resterant2.test(str)) {
    CsuMap.resterant2();
  } else if (Regular.resterant7.test(str)) {
    CsuMap.resterant7();
  } else if (Regular.resterant8.test(str)) {
    CsuMap.resterant8();
  } else if (Regular.resterant24.test(str)) {
    CsuMap.resterant24();
  } else if (Regular.sms.test(str)) {
    CsuMap.sms();
  } else if (Regular.houhu.test(str)) {
    CsuMap.houhu();
  } else if (Regular.lunan.test(str)) {
    CsuMap.lunan();
  } else if (Regular.qingnianStreet.test(str)) {
    CsuMap.qingnianStreet();
  } else if (Regular.workersHospital.test(str)) {
    CsuMap.workersHospital();
  } else if (Regular.postOffice.test(str)) {
    CsuMap.postOffice();
  } else if (Regular.cainiao.test(str)) {
    CsuMap.cainiao();
  } else if (Regular.jd.test(str)) {
    CsuMap.jd();
  } else if (Regular.yd.test(str)) {
    CsuMap.yd();
  } else if (Regular.sf.test(str)) {
    CsuMap.sf();
  } else if (Regular.printer.test(str)) {
    CsuMap.printer();
  } else {
    CsuMap.other();
  }
}

//注册扩展
let ext = seal.ext.find('半拍的csu幸福生活-新生中南地图');
if (!ext) {
  ext = seal.ext.new('半拍的csu幸福生活-新生中南地图', '社亦园', '1.0.0');
  seal.ext.register(ext);
}

//注册命令
const cmdCM = seal.ext.newCmdItemInfo();
cmdCM.name = 'CM';
cmdCM.help = '在指令后加上参数以检索地点，如“。CM 图书馆”';
cmdCM.solve = (ctx, msg, cmdArgs) => {
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
ext.cmdMap['CM'] = cmdCM;   