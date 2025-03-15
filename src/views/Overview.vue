<template>
  <div class="overview">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>总访问量</span>
              <el-icon><View /></el-icon>
            </div>
          </template>
          <div class="card-content">
            <h2>{{ formatNumber(data.visitCount.total) }}</h2>
            <p>较昨日
              <span :class="data.visitCount.increase >= 0 ? 'increase' : 'decrease'">
                {{ data.visitCount.increase >= 0 ? '+' : '' }}{{ data.visitCount.increase }}%
              </span>
            </p>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>活跃用户</span>
              <el-icon><User /></el-icon>
            </div>
          </template>
          <div class="card-content">
            <h2>{{ formatNumber(data.activeUsers.total) }}</h2>
            <p>较昨日
              <span :class="data.activeUsers.increase >= 0 ? 'increase' : 'decrease'">
                {{ data.activeUsers.increase >= 0 ? '+' : '' }}{{ data.activeUsers.increase }}%
              </span>
            </p>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>转化率</span>
              <el-icon><TrendCharts /></el-icon>
            </div>
          </template>
          <div class="card-content">
            <h2>{{ data.conversionRate.total }}%</h2>
            <p>较昨日
              <span :class="data.conversionRate.increase >= 0 ? 'increase' : 'decrease'">
                {{ data.conversionRate.increase >= 0 ? '+' : '' }}{{ data.conversionRate.increase }}%
              </span>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="24">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>访问趋势</span>
              <el-icon><DataLine /></el-icon>
            </div>
          </template>
          <div class="chart-container" ref="trendChart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { overviewData } from '../data/chartData'

const data = overviewData
const trendChart = ref(null)

/**
 * 格式化数字，添加千位分隔符
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

onMounted(() => {
  const chart = echarts.init(trendChart.value)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: data.visitCount.chartData.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: data.visitCount.chartData.series,
      type: 'line',
      smooth: true,
      areaStyle: {}
    }]
  }
  chart.setOption(option)

  // 响应式调整图表大小
  window.addEventListener('resize', () => {
    chart.resize()
  })
})
</script>

<style scoped>
.overview {
  padding: 20px;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  text-align: center;
  padding: 20px 0;
}

.card-content h2 {
  margin: 0;
  font-size: 28px;
  color: #333;
}

.card-content p {
  margin: 10px 0 0;
  color: #999;
}

.increase {
  color: #67C23A;
}

.decrease {
  color: #F56C6C;
}

.chart-row {
  margin-top: 20px;
}

.chart-container {
  height: 400px;
  width: 100%;
}
</style>
