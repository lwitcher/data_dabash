<template>
  <div class="overview-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="data-card">
          <template #header>
            <div class="card-header">
              <span>总访问量</span>
              <el-button
                type="primary"
                link
                @click="showHelp('totalVisits')">
                <el-icon><QuestionFilled /></el-icon>
              </el-button>
            </div>
          </template>
          <div class="card-content">
            <div class="value">{{ totalVisits }}</div>
            <div class="yesterday-value">昨日：{{ yesterdayVisits }}</div>
            <div class="trend" :class="{ 'up': visitsTrend > 0, 'down': visitsTrend < 0 }">
              <span class="compare-label">较昨日</span>
              {{ visitsTrend > 0 ? '+' : '' }}{{ visitsTrend }}%
              <el-icon v-if="visitsTrend > 0" class="trend-icon"><CaretTop /></el-icon>
              <el-icon v-else class="trend-icon"><CaretBottom /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="data-card">
          <template #header>
            <div class="card-header">
              <span>活跃用户</span>
              <el-button
                type="primary"
                link
                @click="showHelp('activeUsers')">
                <el-icon><QuestionFilled /></el-icon>
              </el-button>
            </div>
          </template>
          <div class="card-content">
            <div class="value">{{ activeUsers }}</div>
            <div class="yesterday-value">昨日：{{ yesterdayUsers }}</div>
            <div class="trend" :class="{ 'up': usersTrend > 0, 'down': usersTrend < 0 }">
              <span class="compare-label">较昨日</span>
              {{ usersTrend > 0 ? '+' : '' }}{{ usersTrend }}%
              <el-icon v-if="usersTrend > 0" class="trend-icon"><CaretTop /></el-icon>
              <el-icon v-else class="trend-icon"><CaretBottom /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="data-card">
          <template #header>
            <div class="card-header">
              <span>转化率</span>
              <el-button
                type="primary"
                link
                @click="showHelp('conversionRate')">
                <el-icon><QuestionFilled /></el-icon>
              </el-button>
            </div>
          </template>
          <div class="card-content">
            <div class="value">{{ conversionRate }}%</div>
            <div class="yesterday-value">昨日：{{ yesterdayConversion }}%</div>
            <div class="trend" :class="{ 'up': conversionTrend > 0, 'down': conversionTrend < 0 }">
              <span class="compare-label">较昨日</span>
              {{ conversionTrend > 0 ? '+' : '' }}{{ conversionTrend }}%
              <el-icon v-if="conversionTrend > 0" class="trend-icon"><CaretTop /></el-icon>
              <el-icon v-else class="trend-icon"><CaretBottom /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="chart-card">
      <template #header>
        <div class="card-header">
          <span>访问趋势</span>
          <el-button
            type="primary"
            link
            @click="showHelp('weeklyTrend')">
            <el-icon><QuestionFilled /></el-icon>
          </el-button>
        </div>
      </template>
      <div class="chart-container" ref="chartContainer"></div>
    </el-card>

    <markdown-dialog
      v-model:visible="helpVisible"
      :title="helpTitle"
      :content="helpContent" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import { helpContent as helpContentData } from '../data/helpContent'
import MarkdownDialog from '../components/MarkdownDialog.vue'
import { CaretTop, CaretBottom, QuestionFilled } from '@element-plus/icons-vue'

// 数据
const totalVisits = ref(12345)
const visitsTrend = ref(15)
const activeUsers = ref(3456)
const usersTrend = ref(-8)
const conversionRate = ref(25)
const conversionTrend = ref(12)

// 计算昨日数据
const yesterdayVisits = computed(() => {
  return Math.round(totalVisits.value / (1 + visitsTrend.value / 100))
})

const yesterdayUsers = computed(() => {
  return Math.round(activeUsers.value / (1 + usersTrend.value / 100))
})

const yesterdayConversion = computed(() => {
  return Math.round((conversionRate.value / (1 + conversionTrend.value / 100)) * 10) / 10
})

// 图表相关
const chartContainer = ref(null)
let chart = null

onMounted(() => {
  chart = echarts.init(chartContainer.value)
  const option = {
    title: {
      text: '近7天访问趋势'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value',
      name: '访问量'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      areaStyle: {}
    }]
  }
  chart.setOption(option)

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (chart) {
    chart.dispose()
  }
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  if (chart) {
    chart.resize()
  }
}

// 帮助弹窗相关
const helpVisible = ref(false)
const helpTitle = ref('')
const helpContent = ref('')

const showHelp = (type) => {
  helpContent.value = helpContentData[type]
  switch (type) {
    case 'totalVisits':
      helpTitle.value = '总访问量说明'
      break
    case 'activeUsers':
      helpTitle.value = '活跃用户说明'
      break
    case 'conversionRate':
      helpTitle.value = '转化率说明'
      break
    case 'weeklyTrend':
      helpTitle.value = '访问趋势说明'
      break
  }
  helpVisible.value = true
}
</script>

<style scoped>
.overview-container {
  padding: 20px;
}

.data-card {
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

.value {
  font-size: 32px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.yesterday-value {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.trend {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #909399;
  margin-top: 5px;
}

.trend .compare-label {
  margin-right: 8px;
  font-weight: bold;
  color: #606266;
}

.trend.up {
  color: #67C23A;
  font-weight: bold;
}

.trend.down {
  color: #F56C6C;
  font-weight: bold;
}

.trend .trend-icon {
  margin-left: 4px;
  font-size: 22px;
  font-weight: bold;
}

.chart-card {
  margin-top: 20px;
}

.chart-container {
  height: 400px;
}
</style>
