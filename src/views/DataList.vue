<template>
  <div class="data-list">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>数据列表</span>
          <el-button type="primary" @click="refreshData">
            <el-icon><Refresh /></el-icon>
            刷新数据
          </el-button>
        </div>
      </template>

      <el-table
        :data="data.tableData"
        style="width: 100%"
        border
        stripe>
        <el-table-column
          v-for="col in data.columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width">
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="50"
          :page-size="10"
          @current-change="handlePageChange"/>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { listData } from '../data/chartData'

const data = listData

/**
 * 处理页码变化
 * @param {number} page - 新的页码
 */
const handlePageChange = (page) => {
  ElMessage.info(`切换到第 ${page} 页`)
}

/**
 * 刷新数据
 */
const refreshData = () => {
  ElMessage.success('数据已刷新')
}
</script>

<style scoped>
.data-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.el-button {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
