// ==UserScript==
// @name         noTimeToWaste
// @author       社亦园
// @version      1.0.0
// @description  用于定时发送消息
// @timestamp    1714370143
// 2024-04-29 13:55:43
// @license      MIT
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

// 首先检查是否已经存在
let ext = seal.ext.find('noTimeToWaste');
if (!ext) {
  // 不存在，那么建立扩展，名为，作者“”，版本1.0.0
  ext = seal.ext.new('noTimeToWaste', '社亦园', '1.0.0');
  // 注册扩展
  seal.ext.register(ext);
}

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
  let newTime = [0, 0, 0, 0, 0, 0, 0, 0]
  newTime[0] = year
  newTime[1] = month
  newTime[2] = day
  newTime[3] = weekday
  newTime[4] = hours
  newTime[5] = minutes
  newTime[6] = seconds
  newTime[7] = currentWeekday

  return newTime
}

let usingTime = timeNow()
//早八时间提示
if (usingTime[4] == 8 && usingTime[5] == usingTime[6] == 0) {
  seal.replyToSender(ctx, msg, `早八时间到！`)
}
//疯狂星期四
if (usingTime[3] = 4 && usingTime[4] == 10 && usingTime[5] == usingTime[6] == 0) {
  seal.replyToSender(ctx, msg, `我被确诊为周期性蛋白脂肪缺乏症（学名Insanus lovis),这是一种罕见的慢性病，目前暂无有效的治愈方法，只能使用美国 Kentucky Fried Chicken 公司开发的生物制剂 Fried Animal Protein 经由食道对胃与小肠中受体进行靶向治疗缓解症状。今天是该公司降低药物售价的日子，请好心人资助我50帮我治疗该慢性病。`)
}
