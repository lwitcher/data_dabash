<template>
  <div class="analysis-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>用户分布</span>
              <el-button
                type="primary"
                link
                @click="showHelp('userDistribution')">
                <el-icon><QuestionFilled /></el-icon>
              </el-button>
            </div>
          </template>
          <div class="chart-container" ref="distributionChart"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>用户行为分析</span>
              <el-button
                type="primary"
                link
                @click="showHelp('behaviorAnalysis')">
                <el-icon><QuestionFilled /></el-icon>
              </el-button>
            </div>
          </template>
          <div class="chart-container" ref="behaviorChart"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>性能指标</span>
              <el-button
                type="primary"
                link
                @click="showHelp('performanceMetrics')">
                <el-icon><QuestionFilled /></el-icon>
              </el-button>
            </div>
          </template>
          <div class="chart-container" ref="performanceChart"></div>
        </el-card>
      </el-col>
    </el-row>

    <markdown-dialog
      v-model:visible="helpVisible"
      :title="helpTitle"
      :content="helpContent" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { helpContent as helpContentData } from '../data/helpContent'
import MarkdownDialog from '../components/MarkdownDialog.vue'

// 图表实例
const distributionChart = ref(null)
const behaviorChart = ref(null)
const performanceChart = ref(null)
let charts = []

onMounted(() => {
  // 初始化用户分布图表
  const distribution = echarts.init(distributionChart.value)
  distribution.setOption({
    title: {
      text: '用户地理分布'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '华东' },
        { value: 735, name: '华北' },
        { value: 580, name: '华南' },
        { value: 484, name: '西南' },
        { value: 300, name: '其他' }
      ]
    }]
  })

  // 初始化用户行为分析图表
  const behavior = echarts.init(behaviorChart.value)
  behavior.setOption({
    title: {
      text: '用户行为趋势'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }]
  })

  // 初始化性能指标图表
  const performance = echarts.init(performanceChart.value)
  performance.setOption({
    title: {
      text: '系统性能监控'
    },
    radar: {
      indicator: [
        { name: '响应时间', max: 100 },
        { name: '并发处理', max: 100 },
        { name: '资源占用', max: 100 },
        { name: '错误率', max: 100 },
        { name: '吞吐量', max: 100 }
      ]
    },
    series: [{
      type: 'radar',
      data: [{
        value: [85, 90, 75, 95, 88],
        name: '性能指标'
      }]
    }]
  })

  // 保存图表实例用于销毁
  charts = [distribution, behavior, performance]

  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 销毁图表实例
  charts.forEach(chart => {
    if (chart) {
      chart.dispose()
    }
  })
  // 移除窗口大小变化监听
  window.removeEventListener('resize', handleResize)
})

// 处理窗口大小变化
const handleResize = () => {
  charts.forEach(chart => {
    if (chart) {
      chart.resize()
    }
  })
}

// 帮助弹窗相关
const helpVisible = ref(false)
const helpTitle = ref('')
const helpContent = ref('')

const showHelp = (type) => {
  helpContent.value = helpContentData[type]
  switch (type) {
    case 'userDistribution':
      helpTitle.value = '用户分布说明'
      break
    case 'behaviorAnalysis':
      helpTitle.value = '用户行为分析说明'
      break
    case 'performanceMetrics':
      helpTitle.value = '性能指标说明'
      break
  }
  helpVisible.value = true
}
</script>

<style scoped>
.analysis-container {
  padding: 5px 20px 20px 20px;
}

.chart-card {
  margin-bottom: 20px;
}

.chart-row {
  margin-top: 5px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 400px;
}
</style>
