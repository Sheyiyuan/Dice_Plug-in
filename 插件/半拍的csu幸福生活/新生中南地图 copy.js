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
    seal.replyToSender(ctx, msg, "新校图书馆，一个集成卷狗和佛脚哥的学术圣地，如果有很想要坐的位置，你最好提前在微信上面搜索“中南大学图书馆”进行预约，不过要是没有在一个小时内刷卡进入就有下机之相，集齐三次就会触发隐藏被动——被拉入黑名单（每月清除）图书馆是学习和看书的好地方，但是不是谈恋爱的好地方，请各位有爱情侣不要影响他人学习。当然，要是没有提前预约也可以到位了再在每层楼的操作机上占座，中途想离开也同样在操作机上选择中途离开，离开也是一个小时倒计时。不用担心饮水问题，开水间倾情奉送，还有自动贩卖机供你选择。图书馆楼层越高越清净，期末周除外，空的充电插头会整个图书馆随机刷新，如果想用电脑最好在一楼，一楼不用预约但是总有卷狗比你先。图书馆地图是主线任务必定探索区域，玩家们谨记地图规则，愉快探索！\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/Library.png]")
  },
  teachingbuilding: function () {
    seal.replyToSender(ctx, msg, "教学楼位于新校区北二门附近，除了D座冬凉夏暖。其余几座教学楼条件都不错,未来大部分的课程和考试都会在这几座教学楼中完成，也是主线任务的必经之地。")
  },
  resterant: function () {
    this.resterant2()
    this.resterant7()
    this.resterant8()
    this.resterant24()
  },
  resterant2: function () {
    seal.replyToSender(ctx, msg, "[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/res2Photo.jpg]\n步入升华公寓的大门，首先映入眼帘的就是升华餐饮楼。足足四层的二食堂几乎可以承包你所有的饮食需求，一层还是许多桌游跑团等娱乐活动的首选场所。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/res2Map.png]")
  },
  resterant7: function () {
    seal.replyToSender(ctx, msg, "\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/res8Photo.jpg]八食堂在天桥附近，菜品能算得上是南校区食堂扛把子，二楼的小盘自选菜、三楼的麻辣香锅、火锅都能很好地满足你的味蕾。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/res8Map.png]")
  },
  resterant8: function () {
    seal.replyToSender(ctx, msg, "\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/res7Photo.jpg]当你上完体育课。或者清晨傍晚跑步打卡结束。南校区体育场旁的七食堂也是一个不错的选择。二楼的北方餐厅和新疆餐厅，让你在长沙也能吃到来自北方和西北的味道。而且七食堂是真便宜啊。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/res7Map.png]")
  },
  resterant24: function () {
    seal.replyToSender(ctx, msg, "当你在图书馆或教学楼学习疲惫，可以试试在中南讲堂寻找一份果腹的美食。而且，这边还有蜜雪、瑞幸和麦麦的店铺，对于比较赶时间的同学绝对是不错的选择。")
  },
  sms: function () {
    seal.replyToSender(ctx, msg, "数学与统计学院（又称数理楼）位于新校区的犄角旮旯里，从图书馆出发过桥直走到道路尽头便可以到达。许多院级活动与部分课程都会在这里举行，导员和团学会的办公室也在这里。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/sms.jpg]")
  },
  houhu: function () {
    seal.replyToSender(ctx, msg, "后湖小区分布着数不胜数的餐饮店，无论你是什么样的口味在这里都能得到满足。美食推荐（br）中的大部分店铺都出自这里哦。作为中南御用小吃街。伟大，无需多言。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/houhu.jpg]")
  },
  lunan: function () {
    seal.replyToSender(ctx, msg, "麓山南路串联起了整个大学城，这里同样有着大量的美食，并且这里的许多超市让它成为购物的第一选择。")
  },
  qingnianStreet: function () {
    seal.replyToSender(ctx, msg, "青年街在清水路与麓山南路交界处的地下。虽然其貌不扬，但是里面的超市、理发店和部分餐馆一定会给你惊喜。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/qingnianStreet.jpg]")
  },
  workersHospital: function () {
    seal.replyToSender(ctx, msg, "位于校本部的职工医院，新生体检的地方，如果有什么小病又不愿意走太远到四医院的可以选择来这里。在二食堂旁边也有职工医院的医务室。")
  },
  postOffice: function () {
    this.cainiao()
    this.jd()
    this.yd()
    this.sf()
  },
  cainiao: function () {
    seal.replyToSender(ctx, msg, "作为南校区最大的物流集散地,菜鸟驿站有东、西两个区。同学们在找快递的时候要看好位置哦。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/cainiao.png]")
  },
  jd: function () {
    seal.replyToSender(ctx, msg, "京东快递在南校区教职工16栋，韵达快递旁边。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/JDYD.png]")
  },
  yd: function () {
    seal.replyToSender(ctx, msg, "韵达快递在南校区教职工16栋，京东快递旁边。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/JDYD.png]")
  },
  sf: function () {
    seal.replyToSender(ctx, msg, "顺丰快递就在菜鸟驿站旁边。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/cainiao.png]")
  },
  printer: function () {
    seal.replyToSender(ctx, msg, "关于资料和打印：\n校园书店里有众多的二手书籍，还有往届的学习资料。\n在校园书店旁便是107图文，这里可以扫码直接上传文件打印，如果还有需要调整的地方，也可以在旁边的电脑上操作打印。\n[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/Map/printerMap.png]\n此外，后湖小区也有许多打印店和书店，可供大家选择。")
  },
  QRP: function () {
    seal.replyToSender(ctx, msg, "")
  },
  other: function () {
    seal.replyToSender(ctx, msg, `未检索到关键字。`)
  },
}
const Regular = {
  libraryNew: /^*图书馆$/,
  teachingbuilding: /^教学楼.?.?$/,
  resterant: /^食堂$'/,
  resterant2: /^(二)|(2)食堂$/,
  resterant7: /^(七)|(7)食堂$/,
  resterant8: /^(八)|(8)食堂$/,
  resterant24: /(^中南讲堂$)|(^(二十四)|(24)食堂$)/,
  sms: /(^数学与统计学院$)|(^数理楼$)/,
  houhu: /(^后湖(小区)?(小吃街)?$)|(^御用小吃街$)/,
  lunan: /^麓(山)?南(路)?$/,
  qingnianStreet: /^(麓南)?青年街$/,
  workersHospital: /^(职工)?医院$/,
  postOffice: /(快递(代收)?(站)?(点)?)∣(驿站)/,
  cainiao: /^(菜鸟)(驿站)?(东区)?(西区)?$/,
  jd: /(^(京东)(快递(代收)?(站)?(点)?)?$)|(^(京东物流)(中心)?$)|(^京东驿站$)/,
  yd: /(^(韵达)(快递(代收)?(站)?(点)?)?$)|(^(韵达物流)(中心)?$)|(^韵达驿站$)/,
  sf: /(^(顺丰)(快递(代收)?(站)?(点)?)?$)|(^(顺丰物流)(中心)?$)|(^顺丰驿站$)/,
  printer: /^((打印(服务)?(中心)?)|(打印店))|(书店)$/,
  QRP: /^情人坡$/,
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
  } else if (Regular.QRP.test(str)) {
    CsuMap.QRP();
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
cmdCM.help = '在CM指令后加上参数以检索地点，如“。CM 图书馆”';
cmdCM.solve = (ctx, msg, cmdArgs) => {
  let val = cmdArgs.getArgN(1);
  switch (val) {
    case 'help': {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
    default: {
      dealString(val);
      return seal.ext.newCmdExecuteResult(true);
    }
  }
};
// 将命令注册到扩展中
ext.cmdMap['CM'] = cmdCM;   