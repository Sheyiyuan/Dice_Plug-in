//被注释掉的 api 是可以提供的，但是在源码中被注释。
//seal.setVarInt(ctx, `$XXX`, valueToSet) //`$XXX`即 rollvm（初阶豹语）中的变量，其会将$XXX 的值设定为 int 类型的 valueToSet。
//seal.setVarStr(ctx, `$XXX`, valueToSet) //同上，区别是设定的为 str 类型的 valueToSet。
seal.replyGroup(ctx, msg, something) //向收到指令的群中发送 something。
seal.replyPerson(ctx, msg, something) //顾名思义，类似暗骰，向指令触发者（若为好友）私信 something。
seal.replyToSender(ctx, msg, something) //同上，区别是群内收到就群内发送，私聊收到就私聊发送。
seal.memberBan(ctx, groupID, userID, dur) //将指定群的指定用户封禁指定时间 (似乎只实现了 walleq 协议？)
seal.memberKick(ctx, groupID, userID)  //将指定群的指定用户踢出 (似乎也只实现了 walleq 协议？)
seal.format(ctx, something) //将 something 经过一层 rollvm 转译并返回，注意需要配合 replyToSender 才能发送给触发者！
seal.formatTmpl(ctx, something) //调用自定义文案 something
seal.getCtxProxyFirst(ctx, cmdArgs)  //获取被 at 的第一个人，等价于 getCtxProxyAtPos(ctx, 0)
seal.vars.intGet(ctx, `$XXX`) //返回一个数组，其为 `[int 类型的触发者的该变量的值，bool]` 当 strGet 一个 int 或 intGet 一个 str 时 bool 为 false，若一切正常则为 true。（之所以会有这么奇怪的说法是因为 rollvm 的「个人变量」机制）。
seal.vars.intSet(ctx, `$XXX`, valueToSet) //`$XXX` 即 rollvm（初阶豹语）中的变量，其会将 $XXX 的值设定为 int 类型的 valueToSet。
seal.vars.strGet(ctx, `$XXX`) //返回一个数组，其为 `[str 类型的触发者的该变量的值，bool]`（之所以会有这么奇怪的说法是因为 rollvm 的「个人变量」机制），当 strGet 一个 int 或 intGet 一个 str 时 bool 为 false，如果一切正常则为 true。
seal.vars.strSet(ctx, `$XXX`, valueToSet) //`$XXX` 即 rollvm（初阶豹语）中的变量，其会将 $XXX 的值设定为 str 类型的 valueToSet。
//seal.vars.varSet(ctx, `$XXX`, valueToSet) //可能是根据数据类型自动推断 int 或 str？
//seal.vars.varGet(ctx, `$XXX`) //同上
seal.ext.newCmdItemInfo() //用来定义新的指令；没有参数，个人觉得可以视其为类（class）。
seal.ext.newCmdExecuteResult(bool) //用于判断指令执行结果，true 为成功，false 为失败。
seal.ext.new(extName, extAuthor, Version) //用于建立一个名为 extName，作者为 extAuthor，版本为 Version 的扩展。注意，extName，extAuthor 和 Version 均为字符串。
seal.ext.find(extName) //用于查找名为 extname 的扩展，若存在则返回 true，否则返回 false。
seal.ext.register(newExt) //将扩展 newExt 注册到系统中。注意 newExt 是 seal.ext.new 的返回值，将 register 视为 seal.ext.new() 是错误的。
seal.coc.newRule() //用来创建自定义 coc 规则，github.com/sealdice/javascript/examples 中已有详细例子，不多赘述。
seal.coc.newRuleCheckResult() //同上，不多赘述。
seal.coc.registerRule(rule) //同上，不多赘述。
seal.deck.draw(ctx, deckname, isShuffle) //他会返回一个抽取牌堆的结果。这里有些复杂：deckname 为需要抽取的牌堆名，而 isShuffle 则是一个布尔值，它决定是否放回抽取；false 为放回，true 为不放回。
seal.deck.reload() //重新加载牌堆。
//下面是 1.2 新增 api
seal.newMessage() //返回一个空白的 Message 对象，结构与收到消息的 msg 相同
seal.createTempCtx(endpoint, msg) // 制作一个 ctx, 需要 msg.MessageType 和 msg.Sender.UserId
seal.applyPlayerGroupCardByTemplate(ctx, tmpl) // 设定当前 ctx 玩家的自动名片格式
seal.gameSystem.newTemplate(string) //从 json 解析新的游戏规则。
seal.gameSystem.newTemplateByYaml(string) //从 yaml 解析新的游戏规则。
seal.getCtxProxyAtPos(ctx, pos) //获取第 pos 个被 at 的人，pos 从 0 开始计数
seal.atob(base64String) //返回被解码的 base64 编码
seal.btoa(string) //将 string 编码为 base64 并返回

//下面是 1.4.1 新增 api
seal.ext.newConfigItem() //用于创建一个新的配置项，返回一个 ConfigItem 对象
seal.ext.registerConfig(configItem) //用于注册一个配置项，参数为 ConfigItem 对象
seal.ext.getConfig(ext, "key") //用于获取一个配置项的值，参数为扩展对象和配置项的 key
seal.ext.registerStringConfig(ext, "key", "defaultValue") //用于注册一个 string 类型的配置项，参数为扩展对象、配置项的 key 和默认值
seal.ext.registerIntConfig(ext, "key", 123) //用于注册一个 int 类型的配置项，参数为扩展对象、配置项的 key 和默认值
seal.ext.registerFloatConfig(ext, "key", 123.456) //用于注册一个 float 类型的配置项，参数为扩展对象、配置项的 key 和默认值
seal.ext.registerBoolConfig(ext, "key", true) //用于注册一个 bool 类型的配置项，参数为扩展对象、配置项的 key 和默认值
seal.ext.registerTemplateConfig(ext, "key", ["1", "2", "3", "4"]) //用于注册一个 template 类型的配置项，参数为扩展对象、配置项的 key 和默认值
seal.ext.registerOptionConfig(ext, "key", "1", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]) //用于注册一个 option 类型的配置项，参数为扩展对象、配置项的 key、默认值和可选项
seal.ext.getStringConfig(ext, "key") //用于获取一个 string 类型配置项的值，参数为扩展对象和配置项的 key
seal.ext.getIntConfig(ext, "key") //用于获取一个 int 类型配置项的值，参数为扩展对象和配置项的 key
seal.ext.getFloatConfig(ext, "key") //用于获取一个 float 类型配置项的值，参数为扩展对象和配置项的 key
seal.ext.getBoolConfig(ext, "key") //用于获取一个 bool 类型配置项的值，参数为扩展对象和配置项的 key
seal.ext.getTemplateConfig(ext, "key") //用于获取一个 template 类型配置项的值，参数为扩展对象和配置项的 key
seal.ext.getOptionConfig(ext, "key") //用于获取一个 option 类型配置项的值，参数为扩展对象和配置项的 key

//下面是 1.4.4 新增 api
seal.setPlayerGroupCard(ctx, tmpl) //设置当前 ctx 玩家的名片
seal.ban.addBan(ctx, id, place, reason)
seal.ban.addTrust(ctx, id, place, reason)
seal.ban.remove(ctx, id)
seal.ban.getList()
seal.ban.getUser(id)