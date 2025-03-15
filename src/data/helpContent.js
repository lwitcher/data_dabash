/**
 * 帮助说明内容配置文件
 * 使用 Markdown 格式编写帮助内容
 */
export const helpContent = {
  totalVisits: `
# 总访问量说明

## 定义
总访问量指标反映了网站的整体流量情况，包括：
- 页面浏览量（PV）
- 独立访客数（UV）
- 会话数（Sessions）

## 计算方式
- 统计周期：每日凌晨0点至次日凌晨0点
- 计算方法：累计所有用户的访问次数
- 去重规则：同一用户多次访问计为多次

## 使用建议
1. 关注环比和同比变化
2. 结合转化率分析
3. 观察峰值时段
`,

  activeUsers: `
# 活跃用户说明

## 定义
活跃用户指在特定时间段内有实际交互行为的用户数量：
- 登录系统
- 进行操作
- 产生数据

## 统计标准
- 日活跃用户（DAU）：24小时内活跃用户数
- 月活跃用户（MAU）：30天内活跃用户数
- 活跃度：DAU/MAU比值

## 应用场景
1. 评估用户粘性
2. 衡量产品价值
3. 预测增长趋势
`,

  conversionRate: `
# 转化率说明

## 定义
转化率表示用户完成特定目标行为的比例：
- 注册转化
- 购买转化
- 活动参与转化

## 计算公式
转化率 = (完成目标用户数 / 总访问用户数) × 100%

## 优化建议
1. 分析转化漏斗
2. 识别流失节点
3. 优化用户体验
4. 进行A/B测试
`,

  weeklyTrend: `
# 访问趋势说明

## 图表解读
- X轴：时间维度（按天）
- Y轴：访问量
- 曲线：反映变化趋势

## 关注重点
1. 整体趋势走向
2. 异常波动点
3. 周期性规律
4. 重大事件影响

## 应用价值
- 预测未来流量
- 资源调度优化
- 活动效果评估
`,

  // 统计分析页面的帮助内容
  userDistribution: `
# 用户分布说明

## 定义
用户分布图展示了不同维度的用户分布情况：
- 地理位置分布
- 年龄段分布
- 使用设备分布

## 分析价值
1. 了解用户画像
2. 针对性优化产品
3. 制定营销策略

## 使用建议
- 结合业务场景分析
- 关注异常数据点
- 定期更新分析维度
`,

  behaviorAnalysis: `
# 用户行为分析说明

## 定义
用户行为分析展示用户在系统中的行为特征：
- 访问路径
- 停留时长
- 交互行为

## 关键指标
1. 页面访问深度
2. 用户停留时间
3. 功能使用频率
4. 行为路径转化

## 应用场景
- 优化用户体验
- 提升功能设计
- 改进交互流程
`,

  performanceMetrics: `
# 性能指标说明

## 监控维度
系统性能的关键监控指标：
- 响应时间
- 并发处理
- 资源占用
- 错误率

## 指标说明
1. 平均响应时间：页面加载和操作响应的平均耗时
2. 并发用户数：同时在线的活跃用户数量
3. 系统吞吐量：单位时间内处理的请求数
4. 错误率：请求失败的比例

## 优化建议
- 持续监控异常
- 定期性能优化
- 负载均衡调整
`,

  dataList: `
# 数据列表使用说明

## 功能概述
数据列表提供了丰富的数据管理功能：
- 数据查看
- 搜索筛选
- 排序
- 分页浏览
- 数据导出

## 搜索和筛选
1. 快速搜索
   - 支持用户名、ID、邮箱搜索
   - 实时搜索结果
   - 清空搜索框重置结果

2. 高级筛选
   - 用户状态筛选
   - 用户角色筛选
   - 日期范围筛选
   - 多条件组合筛选

## 数据操作
1. 排序功能
   - 点击列标题进行排序
   - 支持升序/降序切换
   - 多字段排序支持

2. 编辑功能
   - 修改用户信息
   - 表单验证
   - 实时保存

3. 删除功能
   - 删除确认提示
   - 防止误操作

## 其他功能
1. 分页浏览
   - 自定义每页显示数量
   - 快速页面跳转
   - 总数据量显示

2. 数据导出
   - 导出当前筛选结果
   - 支持常用格式

## 使用技巧
1. 使用组合筛选缩小数据范围
2. 合理设置每页显示数量
3. 使用快速搜索定位特定记录
4. 定期导出数据备份
`
}
