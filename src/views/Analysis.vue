<template>
  <div class="analysis">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ data.userDistribution.title }}</span>
              <el-icon><PieChart /></el-icon>
            </div>
          </template>
          <div class="chart-container" ref="userDistChart"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ data.timeDistribution.title }}</span>
              <el-icon><Timer /></el-icon>
            </div>
          </template>
          <div class="chart-container" ref="timeDistChart"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ data.categoryDistribution.title }}</span>
              <el-icon><Menu /></el-icon>
            </div>
          </template>
          <div class="chart-container" ref="categoryDistChart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { analysisData } from '../data/chartData'

const data = analysisData
const userDistChart = ref(null)
const timeDistChart = ref(null)
const categoryDistChart = ref(null)

onMounted(() => {
  // 用户分布饼图
  const userChart = echarts.init(userDistChart.value)
  userChart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [{
      type: 'pie',
      radius: '50%',
      data: data.userDistribution.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })

  // 时间分布柱状图
  const timeChart = echarts.init(timeDistChart.value)
  timeChart.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: data.timeDistribution.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: data.timeDistribution.series,
      type: 'bar'
    }]
  })

  // 内容分类环形图
  const categoryChart = echarts.init(categoryDistChart.value)
  categoryChart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: data.categoryDistribution.data
    }]
  })

  // 响应式调整图表大小
  window.addEventListener('resize', () => {
    userChart.resize()
    timeChart.resize()
    categoryChart.resize()
  })
})
</script>

<style scoped>
.analysis {
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

.chart-container {
  height: 300px;
  width: 100%;
}
</style>
