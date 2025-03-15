<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>数据分析面板</h1>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical">
            <el-menu-item index="1">
              <el-icon><DataLine /></el-icon>
              <span>数据概览</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><PieChart /></el-icon>
              <span>统计分析</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><List /></el-icon>
              <span>数据列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
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
                  <h2>1,234,567</h2>
                  <p>较昨日 <span class="increase">+12.5%</span></p>
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
                  <h2>45,678</h2>
                  <p>较昨日 <span class="increase">+8.3%</span></p>
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
                  <h2>23.5%</h2>
                  <p>较昨日 <span class="decrease">-2.1%</span></p>
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

/**
 * @description 首页组件
 */
export default {
  name: 'HomeView',
  setup() {
    const trendChart = ref(null)

    onMounted(() => {
      const chart = echarts.init(trendChart.value)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
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

    return {
      trendChart
    }
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  background-color: #f0f2f5;
}

.el-container {
  height: 100%;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.el-header h1 {
  margin: 0;
  font-size: 20px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  border-right: 1px solid #e6e6e6;
}

.el-main {
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

.el-menu-vertical {
  border-right: none;
}
</style>
