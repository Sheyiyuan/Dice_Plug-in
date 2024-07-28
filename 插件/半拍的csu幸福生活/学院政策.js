// ==UserScript==
// @name         半拍的csu幸福生活-学院政策
// @author       社亦园
// @version      1.0.0
// @description  新生Q&A
// @timestamp    1721780763
// 2024-07-24 08:26:03
// @license      MIT
// @homepageURL  https://github.com/Sheyiyuan/Dice_Plug-in
// ==/UserScript==

//文案
// 学院政策相关问题的答案
const Answer = {
    '专业分流': '专业分流将在第一学期终结之际启动，届时学生需提交专业志愿表。分配过程将遵循志愿优先、成绩为重的原则，着重考量学生的首学期课程加权平均分，尤其是数学分析与高等代数的表现。一旦专业选择确定，除非有特殊情况，否则将保持不变，相应的学费标准、学习期限等将根据选定的专业规定执行。\n此外，数学与应用数学、信息与计算科学、以及统计学这三个专业的接纳名额，相较于原定计划可适度增加10%。专业分流的确切步骤将由本科生院发布详细通知，确保整个流程从大一第一学期末有序展开。此外，若某一专业分流后的学生数量少于10名，该专业将不单独成班，学生将被整合至其他专业，以实现有效的教学资源配置。\n详细内容：https://math.csu.edu.cn/info/1727/13162.htm',
    '转专业': '转专业注意事项\n1.转出学生需成绩优秀，专业排名在年级前25%以内，且思想政治表现良好。\n2.每个专业转出学生人数不得超过该专业学生总数的10%。\n3.强基班学生如果已经退出至普通班，则不具备转专业资格。\n详细内容：https://math.csu.edu.cn/info/1727/13162.htm \n注：此为2023级转专业政策，2024级政策可能有所区别，仅供参考。',
    '保研': '保研基本条件：\n必须具备良好的品德、健康状况、遵纪守法和优秀的学业成绩。\n必须完成所在专业培养方案前3年的所有教学环节并取得合格成绩。\n英语水平需达到学校授予学士学位的标准。\n学业成绩需达到专业年级排名前35%，或在卓越拔尖人才培养计划班排名前60%。详细内容：https://math.csu.edu.cn/info/1772/10922.htm',
    '选课': '选课请登录由依托（无双关）ubi同款服务器运行的选课系统，具体请登录中南大学本科生教务系统。体育选课志愿选课，其他课程为抢选。志愿选课请多填几个防止无选录，记得保存和提交。抢选课可以使用多台设备同时选抢。如果在选课中出现以下情况属于正常现象。[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/meme/youMustntChooseCourse.png]',
    '校历': '[CQ:image,file=https://sheyiyuan.oss-cn-chengdu.aliyuncs.com/images/CSU/2425SS.jpg]',
};
//注册扩展
let ext = seal.ext.find('半拍的csu幸福生活-学院政策');
if (!ext) {
    ext = seal.ext.new('半拍的csu幸福生活-学院政策', '社亦园', '1.0.0');
    seal.ext.register(ext);
}

//注册命令
const cmdSpi = seal.ext.newCmdItemInfo();
cmdSpi.name = 'fqa'; // 指令名字，可用中文
cmdSpi.help = '学校相关问题可以在这里查询。\n关键字列表：\n分流、专业分流、转专业、保研、选课、校历';
cmdSpi.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
        case 'help': {
            const ret = seal.ext.newCmdExecuteResult(true);
            ret.showHelp = true;
            return ret;
        }
        default:
            if (val == 'list') {
                makeList();
            } else if (val == '分流' || val == '专业分流') {
                seal.replyToSender(ctx, msg, Answer['专业分流']);
            } else if (val == '转专业') {
                seal.replyToSender(ctx, msg, Answer['转专业']);
            } else if (val == '保研') {
                seal.replyToSender(ctx, msg, Answer['保研']);
            } else if (val == '选课') {
                seal.replyToSender(ctx, msg, Answer['选课']);
            } else if (val == '校历') {
                seal.replyToSender(ctx, msg, Answer['校历']);
            } else if (val == '') {

            } else {
                seal.replyToSender(ctx, msg, '未找到相关内容，请重新输入。');
            }
            return seal.ext.newCmdExecuteResult(true);
    }
};
// 将命令注册到扩展中
ext.cmdMap['fqa'] = cmdSpi;
ext.cmdMap['萌新问答'] = cmdSpi;   