/**
 * @description 数据概览的数据
 */
export const overviewData = {
  visitCount: {
    total: 1234567,
    increase: 12.5,
    chartData: {
      xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      series: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  },
  activeUsers: {
    total: 45678,
    increase: 8.3,
    chartData: {
      xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      series: [420, 532, 501, 534, 790, 830, 820]
    }
  },
  conversionRate: {
    total: 23.5,
    increase: -2.1,
    chartData: {
      xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      series: [20, 22, 21, 23, 25, 24, 23.5]
    }
  }
}

/**
 * @description 统计分析的数据
 */
export const analysisData = {
  userDistribution: {
    title: '用户分布',
    data: [
      { value: 1048, name: '移动端' },
      { value: 735, name: '桌面端' },
      { value: 580, name: '平板' },
      { value: 484, name: '其他' }
    ]
  },
  timeDistribution: {
    title: '访问时间分布',
    xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    series: [320, 120, 780, 920, 860, 720, 280]
  },
  categoryDistribution: {
    title: '内容分类访问',
    data: [
      { value: 40, name: '新闻' },
      { value: 38, name: '视频' },
      { value: 32, name: '社交' },
      { value: 30, name: '购物' },
      { value: 28, name: '游戏' }
    ]
  }
}

/**
 * @description 数据列表的数据
 */
export const listData = {
  columns: [
    { prop: 'date', label: '日期', width: '180' },
    { prop: 'visits', label: '访问量', width: '180' },
    { prop: 'users', label: '用户数', width: '180' },
    { prop: 'conversion', label: '转化率', width: '180' },
    { prop: 'avgTime', label: '平均停留时间' }
  ],
  tableData: [
    {
      date: '2024-03-15',
      visits: 1234,
      users: 890,
      conversion: '23.5%',
      avgTime: '00:05:23'
    },
    {
      date: '2024-03-14',
      visits: 2341,
      users: 789,
      conversion: '21.8%',
      avgTime: '00:04:56'
    },
    {
      date: '2024-03-13',
      visits: 1890,
      users: 678,
      conversion: '24.2%',
      avgTime: '00:06:12'
    },
    {
      date: '2024-03-12',
      visits: 2156,
      users: 945,
      conversion: '22.7%',
      avgTime: '00:05:45'
    },
    {
      date: '2024-03-11',
      visits: 1789,
      users: 867,
      conversion: '23.1%',
      avgTime: '00:05:34'
    }
  ]
}
