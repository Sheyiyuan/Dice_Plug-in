// ==UserScript==
// @name         半拍的csu幸福生活
// @author       社亦园
// @version      1.0.0
// @description  半拍入职学生会要学会的技能
// @timestamp    1721531648
// 2024-07-21 11:14:08
// @license      MIT
// @homepageURL  https://github.com/Sheyiyuan/Dice_Plug-in
// ==/UserScript==

//注册拓展
let ext = seal.ext.find('半拍的csu幸福生活');
if (!ext) {
  ext = seal.ext.new('半拍的csu幸福生活', '社亦园', '1.0.0');
  seal.ext.register(ext);
}

//创建方法
const CsuLife = {
  //常见问题解答
  qA: function () {
    //用if-else语句对问题进行匹配
  },
  //
  map: function (val = '') {
    //学校布局设施介绍
    //用正则表达式匹配关键字
    if (val === '中南大学' || val === '南校区' || val === '新校区') {
      seal.seal.replyToSender(ctx, msg, Map.csu);
    }
    else if (val === '新校区图书馆' || val === '图书馆' || val === '新校图书馆') {
      seal.seal.replyToSender(ctx, msg, Map.library);
    }
    else if (val === '教学楼' || val === '教学大楼') {
      seal.seal.replyToSender(ctx, msg, Map.teachingbuilding);
    }
    else if (val === '鸟巢') {
      seal.seal.replyToSender(ctx, msg, Map.nest);
    }
    else if (val === '新校区操场' || val === '新校区体育场副场') {
      seal.seal.replyToSender(ctx, msg, Map.gymNew);
    }
    else if (val === '南校区操场') {
      seal.seal.replyToSender(ctx, msg, Map.gymSouth);
    }
    else if (val === '校本部操场') {
      seal.seal.replyToSender(ctx, msg, Map.gymNorth);
    }
    else if (val === '中南讲堂' || val === '新校区食堂' || val === '二十四食堂' || val === '24食堂') {
      seal.seal.replyToSender(ctx, msg, Map.resterant24);
    }
    else if (val === '七食堂') {
      seal.seal.replyToSender(ctx, msg, Map.resterant7);
    }
    else if (val === '八食堂') {
      seal.seal.replyToSender(ctx, msg, Map.resterant8);
    }
    else if (val === '二食堂') {
      seal.seal.replyToSender(ctx, msg, Map.resterant2);
    }
    else if (val === '南六舍' || val === '南校区宿舍楼六栋' || val === '南六') {
      seal.seal.replyToSender(ctx, msg, Map.south6);
    }
    else if (val === '体育馆' || xba == '新校区体育馆' || val == '新校体育馆') {
      seal.seal.replyToSender(ctx, msg, Map.stadium);
    }
    else if (val === '数学与统计学院' || val === '数统院' || val === '数理楼') {
      seal.seal.replyToSender(ctx, msg, Map.sms);
    }
    else if (val === '升华38栋' || val === '升华学生公寓38栋') {
      seal.seal.replyToSender(ctx, msg, Map.shenhua38);
    }
    else if (val === '南校区治安亭' || val === '南校治安亭') {
      seal.seal.replyToSender(ctx, msg, Map.lostFoundSouth);
    }
    else if (val === '新校区治安亭' || val === '新校治安亭') {
      seal.seal.replyToSender(ctx, msg, Map.lostFoundNew);
    }
    else if (val === '后湖' || val === '后湖小区') {
      seal.seal.replyToSender(ctx, msg, Map.houhu);
    }
    else if (val === '麓南' || val === '麓山南路') {
      seal.seal.replyToSender(ctx, msg, Map.lunan);
    }
    else if (val === '青年街' || val === '青年公园') {
      seal.seal.replyToSender(ctx, msg, Map.qingnianStreet);
    }
    else if (val === '南校区职工医院') {
      seal.seal.replyToSender(ctx, msg, Map.workersHospital);
    }
    else if (val === '快递点' || val === '快递' || val === '驿站' || val === '菜鸟' || val === '菜鸟驿站' || val === '京东') {
      seal.seal.replyToSender(ctx, msg, Map.postOffice);
    }
    else {
      seal.seal.replyToSender(ctx, msg, Map.other);
    }
  },
  //美食推荐（随机点菜）
  //这里计划分模块进行处理，分为正餐和小吃两类
  dinners: function () { },

  snacks: function () { },
  //后面两个直接调用外部牌堆来实现
  mixue: function () { },
  luckin: function () { }
}

//文案库
const Map = {
  libraryNew: "新校区图书馆，位于新校区教学楼旁。",
  teachingbuilding: "",
  nest: "",
  gymNew: "",
  gymSouth: "",
  gymNorth: "",
  resterant2: "",
  resterant7: "",
  resterant8: "",
  resterant24: "",
  sms: "",
  stadium: "",
  south6: "",
  shenhua38: "",
  lostFoundSouth: "",
  lostFoundNew: "",
  houhu: "",
  lunan: "",
  qingnianStreet: "",
  workersHospital: "",
  postOffice: "",
  other: ""
}

const QandA = {

}

const dinners = []
dinners[0] = '金陵汤包\n人均:12元\n位置：新校区食堂\n评价：里面的汤汁很鲜，美中不足就是一笼吃不饱，两笼吃不了。\n特别提醒：这家店早晨营业，但是晚上这里卖的炒卤也很好吃。'
dinners[1] = '炒卤\n人均:20元\n位置：后湖\n评价：这个世界上只有两种人，一种爱上了炒卤，另一种还没吃过炒卤。\n特别提醒：这家店晚上营业，但是早晨这里卖的灌汤小笼包也很好吃。'
dinners[2] = '重庆小面\n人均:13元\n位置：后湖\n评价：除了量略少都还不错。'
dinners[3] = '后湖梁记肠粉\n人均:10元\n位置：后湖\n评价：超级好吃，而且一点也不贵。'
dinners[4] = '东北熏肉大饼\n人均:10元\n位置：后湖\n评价：超级好吃，超级实惠，尤其推荐12B套餐。\n特别提醒：人超级多，赶时间就别去了。'
dinners[5] = '花雕醉鸡\n人均:40元\n位置：后湖\n评价：鸡肉很香很嫩，味道很好。土豆更是神作！'
dinners[6] = '味源木桶饭\n人均:15元\n位置：后湖\n评价：一份炒菜，米饭不限量，味道不赖，就这十几块钱你还要什么自行车？'
dinners[7] = '老麻抄手\n人均:16元\n位置：后湖\n评价：微辣，主要是麻，就是人有点多。'
dinners[8] = '东北烧烤\n人均：50元\n位置：后湖\n评价：中南掌管宵夜的神（还有免费啤酒）。'
dinners[9] = '吴太和鲍汁黄焖鸡\n人均：20元\n位置：后湖\n评价：一定要加粉条，超级下饭。后湖这家还有免费饮料。'
dinners[10] = '地下餐厅\n人均：50元\n位置：麓山南路\n评价：超级实惠的湘菜馆，菜基本可以闭着眼睛点，都好吃。'
dinners[11] = '兰州拉面\n人均：14元\n位置：清水路\n评价：好吃，便宜，就是量少了点。'
dinners[12] = '猪肚鸡\n人均：17元\n位置：二食堂一楼\n评价：原味和酸辣都好吃。'
dinners[13] = '舌尖大师\n人均：20元\n位置：后湖\n评价：鱼豆腐必点，特别香。'
dinners[14] = '麻辣香锅\n人均：20元\n位置：八食堂\n评价：味道不错，在你中南食堂里能算扛把子了。'
dinners[15] = '石锅鸡米饭\n人均：25元\n位置：后湖\n评价：肉的味道很香，超级下饭。'
dinners[16] = '东北饺子馆\n人均：18元\n位置：清水路\n评价：不仅有饺子，各种盖码饭的码子加的也多，性价比超高。'
dinners[17] = '阿元螺蛳粉\n人均：18元\n位置：后湖\n评价：一定要加炸蛋，炸蛋超级香。'
dinners[18] = '小禾眷\n人均16元\n位置：后湖\n评价：加店家的小料，味道很不错。'
dinners[19] = '铜锅鸡\n人均22元\n位置：后湖\n评价：只适合团建，人数为3-4人最佳（店家桌子最多是四人桌）。可以在点的国内免费自助火锅，木耳最好吃。'
dinners[20] = '辛小佑\n人均18元\n位置：后湖\n评价：有一位学长一个学期吃了1000元+，辣度刚刚好，肉特别足，还有免费的饮料。'
dinners[21] = '叔叔家咖喱饭\n人均25元\n位置：后湖\n评价：环境很好，老板服务周到，并且咖喱饭很正宗，特别推荐花生冰豆酪，超好吃。'
dinners[22] = '实分满糖水铺\n人均：10元\n位置：后湖\n评价：10块钱糖水能直接给你干得吃不下饭。料足味道好'
dinners[23] = '二朴炸鸡社\n人均：30元\n位置：麓南\n评价：这家主打的是韩式无骨炸鸡，年糕也很好吃，薯条尤其好吃，是可以考虑单点薯条的程度。'
dinners[24] = '三口汴京炸鸡\n人均：10元\n位置：麓南\n评价：这家卖的比较多，按斤称的也有套餐，是那种脆皮炸鸡。'
dinners[25] = '渔粉爱尚饭\n人均：15元\n位置：后湖\n评价：除了烫了点，量大管饱，味道很好。'
dinners[26] = '刺客五六七糖水\n人均：10元\n位置：麓南\n评价：便宜好喝，氛围不错。'
dinners[27] = '奉天蚨祥饺子馆\n人均：16元\n位置：天马\n评价：特别注意早上11才开门，但是味道值得你跑远一点。'


//注册命令