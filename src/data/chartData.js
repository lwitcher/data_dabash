export const chartData = {
  // 折线图数据
  lineChartData: {
    xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [
      {
        name: '系列1',
        data: [150, 230, 224, 218, 135, 147]
      },
      {
        name: '系列2',
        data: [80, 122, 119, 164, 175, 170]
      },
      {
        name: '系列3',
        data: [70, 67, 91, 148, 120, 105]
      }
    ]
  },

  // 饼图数据
  pieChartData: [
    { name: '类别1', value: 335 },
    { name: '类别2', value: 310 },
    { name: '类别3', value: 234 },
    { name: '类别4', value: 135 },
    { name: '类别5', value: 1548 }
  ],

  // 柱状图数据
  barChartData: {
    xAxis: ['产品A', '产品B', '产品C', '产品D', '产品E'],
    series: [
      {
        name: '销量',
        data: [120, 200, 150, 80, 70]
      },
      {
        name: '收入',
        data: [100, 180, 140, 90, 60]
      }
    ]
  },

  // 表格数据
  tableData: [
    { id: 1, name: '商品1', price: 100, sales: 1234, date: '2024-01-01' },
    { id: 2, name: '商品2', price: 200, sales: 2345, date: '2024-01-02' },
    { id: 3, name: '商品3', price: 300, sales: 3456, date: '2024-01-03' }
    // ... 更多数据
  ]
}
