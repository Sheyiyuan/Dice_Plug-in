# 为世界带来救赎设计师笔记ImaginaryJusticeDesignerNote
## 关于地图生成
### 生成方法
- 固定范式
- 随机范式
- 分配节点类型
- 连线
- 生成节点池
- 生成地图
  
#### 1.固定范式
每一层的开头和结尾固定，按照下表：
| 层数 | 开始节点数量 | 开始节点类型 | 结束节点数量 | 结束节点类型 |
| ---- | ------------ | ------------ | ------------ | ------------ |
| 1    | 1            | 战斗         | 1            | 商店         |
| 2    | 0            | -            | 2            | 宝箱         |
| 3    | 2            | 战斗         | 1            | boss战       |
| 4    | 0            | -            | 2            | 宝箱         |
| 5    | 2            | 战斗         | 1            | boss战       |
| 6    | 1            | 商店         | 1            | boss战       |

#### 2.随机范式
每一层中间节点数量随机，按照下表：
| 层数 | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  |
| ---- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1    |     | 10  | 60  | 100 |     |     |     |     |
| 2    |     |     | 70  | 100 |     |     |     |     |
| 3    |     |     |     |     | 5   | 20  | 80  | 100 |
| 4    |     |     |     |     | 5   | 50  | 100 |     |
| 5    |     |     |     |     | 10  | 40  | 80  | 100 |
| 6    | 30  | 100 |     |     |     |     |     |     |

## 图的存储
