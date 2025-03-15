<template>
  <div class="dashboard">
    <el-container>
      <el-header>
        <h1>数据可视化大屏</h1>
      </el-header>

      <el-main>
        <el-row :gutter="20">
          <!-- 折线图 -->
          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="chart-header">
                  <span>销售趋势</span>
                  <el-select
                    v-model="lineChartSelected"
                    multiple
                    placeholder="选择显示系列"
                    style="width: 200px"
                  >
                    <el-option
                      v-for="item in lineChartOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </template>
              <div class="chart" ref="lineChart"></div>
            </el-card>
          </el-col>

          <!-- 饼图 -->
          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="chart-header">
                  <span>分布占比</span>
                </div>
              </template>
              <div class="chart" ref="pieChart"></div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 20px">
          <!-- 柱状图 -->
          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="chart-header">
                  <span>产品数据</span>
                  <el-select
                    v-model="barChartSelected"
                    multiple
                    placeholder="选择显示系列"
                    style="width: 200px"
                  >
                    <el-option
                      v-for="item in barChartOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </template>
              <div class="chart" ref="barChart"></div>
            </el-card>
          </el-col>

          <!-- 表格 -->
          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="chart-header">
                  <span>详细数据</span>
                </div>
              </template>
              <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort="{ prop: 'date', order: 'descending' }"
              >
                <el-table-column prop="name" label="商品名称" sortable />
                <el-table-column prop="price" label="价格" sortable />
                <el-table-column prop="sales" label="销量" sortable />
                <el-table-column prop="date" label="日期" sortable />
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { chartData } from '../data/chartData'

// 图表实例
let lineChartInstance = null
let pieChartInstance = null
let barChartInstance = null

// 引用DOM元素
const lineChart = ref(null)
const pieChart = ref(null)
const barChart = ref(null)

// 折线图配置
const lineChartOptions = [
  { label: '系列1', value: 0 },
  { label: '系列2', value: 1 },
  { label: '系列3', value: 2 }
]
const lineChartSelected = ref([0, 1, 2])

// 柱状图配置
const barChartOptions = [
  { label: '销量', value: 0 },
  { label: '收入', value: 1 }
]
const barChartSelected = ref([0, 1])

// 表格数据
const tableData = ref(chartData.tableData)

// 初始化图表
onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

// 监听系列选择变化
watch(lineChartSelected, () => updateLineChart())
watch(barChartSelected, () => updateBarChart())

// 初始化所有图表
const initCharts = () => {
  // 初始化折线图
  lineChartInstance = echarts.init(lineChart.value)
  updateLineChart()

  // 初始化饼图
  pieChartInstance = echarts.init(pieChart.value)
  pieChartInstance.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [
      {
        name: '分布占比',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        data: chartData.pieChartData
      }
    ]
  })

  // 初始化柱状图
  barChartInstance = echarts.init(barChart.value)
  updateBarChart()
}

// 更新折线图
const updateLineChart = () => {
  const selectedSeries = chartData.lineChartData.series
    .filter((_, index) => lineChartSelected.value.includes(index))

  lineChartInstance.setOption({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: selectedSeries.map(item => item.name)
    },
    xAxis: {
      type: 'category',
      data: chartData.lineChartData.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: selectedSeries.map(item => ({
      name: item.name,
      type: 'line',
      data: item.data
    }))
  })
}

// 更新柱状图
const updateBarChart = () => {
  const selectedSeries = chartData.barChartData.series
    .filter((_, index) => barChartSelected.value.includes(index))

  barChartInstance.setOption({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: selectedSeries.map(item => item.name)
    },
    xAxis: {
      type: 'category',
      data: chartData.barChartData.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: selectedSeries.map(item => ({
      name: item.name,
      type: 'bar',
      data: item.data
    }))
  })
}

// 处理窗口大小变化
const handleResize = () => {
  lineChartInstance?.resize()
  pieChartInstance?.resize()
  barChartInstance?.resize()
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.el-header {
  background-color: white;
  color: #303133;
  line-height: 60px;
  text-align: center;
}

.chart {
  height: 400px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-card {
  margin-bottom: 20px;
}
</style>
