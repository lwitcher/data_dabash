<template>
  <div class="data-list-container">
    <!-- 标题和操作区域 -->
    <div class="header-actions">
      <h2 class="page-title">数据列表</h2>
      <div class="header-buttons">
        <el-button type="primary" @click="exportData">
          <el-icon><Download /></el-icon>
          导出数据
        </el-button>
        <el-button @click="showHelp">
          <el-icon><QuestionFilled /></el-icon>
          帮助
        </el-button>
      </div>
    </div>

    <!-- 查询条件区域 -->
    <div class="search-section">
      <el-input
        v-model="searchQuery"
        placeholder="搜索用户名/ID/邮箱"
        class="search-input"
        clearable
        @input="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-select v-model="filters.status" placeholder="用户状态" clearable @change="handleFilterChange">
        <el-option label="活跃" value="active" />
        <el-option label="非活跃" value="inactive" />
        <el-option label="已禁用" value="disabled" />
      </el-select>
      <el-select v-model="filters.role" placeholder="用户角色" clearable @change="handleFilterChange">
        <el-option label="管理员" value="admin" />
        <el-option label="普通用户" value="user" />
        <el-option label="访客" value="guest" />
      </el-select>
      <el-date-picker
        v-model="filters.dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
        :shortcuts="dateShortcuts"
        @change="handleFilterChange"
        :locale="zhCn"
      />
    </div>

    <!-- 数据表格 -->
    <el-table
      :data="currentPageData"
      style="width: 100%"
      v-loading="loading"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="id" label="ID" sortable="custom" width="80" />
      <el-table-column prop="username" label="用户名" sortable="custom" />
      <el-table-column prop="email" label="邮箱" sortable="custom" />
      <el-table-column prop="role" label="角色" sortable="custom" width="120">
        <template #default="{ row }">
          <el-tag :type="getRoleTagType(row.role)">{{ getRoleLabel(row.role) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" sortable="custom" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)">{{ getStatusLabel(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lastLogin" label="最后登录时间" sortable="custom" width="180">
        <template #default="{ row }">
          {{ formatDate(row.lastLogin) }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="totalItems"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 帮助对话框 -->
    <el-dialog
      v-model="showHelpDialog"
      :title="helpDialogTitle"
      :close-on-press-escape="true"
      :show-close="true"
      width="600px"
    >
      <div class="help-content markdown-body" v-html="renderedHelpContent"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Download, QuestionFilled } from '@element-plus/icons-vue'
import { helpContent as helpContentData } from '../data/helpContent'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// 表格数据
const tableData = ref([])
const loading = ref(true)

// 搜索和筛选
const searchQuery = ref('')
const filters = ref({
  status: '',
  role: '',
  dateRange: null
})

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = computed(() => filteredTableData.value.length)

// 排序
const sortConfig = ref({
  prop: '',
  order: ''
})

// 帮助对话框
const showHelpDialog = ref(false)
const helpDialogTitle = ref('')
const helpContent = ref('')

// 日期快捷选项
const dateShortcuts = [
  {
    text: '最近一周',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近三个月',
    value() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]

// 模拟获取数据
const fetchData = async() => {
  loading.value = true
  try {
    // 模拟API调用
    const response = await new Promise(resolve => {
      setTimeout(() => {
        const data = Array.from({ length: 100 }, (_, index) => ({
          id: index + 1,
          username: `用户${index + 1}`,
          email: `user${index + 1}@example.com`,
          role: ['admin', 'user', 'guest'][Math.floor(Math.random() * 3)],
          status: ['active', 'inactive', 'disabled'][Math.floor(Math.random() * 3)],
          lastLogin: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        }))
        resolve(data)
      }, 1000)
    })
    tableData.value = response
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('获取数据失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 计算筛选后的数据
const filteredTableData = computed(() => {
  let data = [...tableData.value]

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    data = data.filter(item =>
      item.username.toLowerCase().includes(query) ||
      item.id.toString().includes(query) ||
      item.email.toLowerCase().includes(query)
    )
  }

  // 状态过滤
  if (filters.value.status) {
    data = data.filter(item => item.status === filters.value.status)
  }

  // 角色过滤
  if (filters.value.role) {
    data = data.filter(item => item.role === filters.value.role)
  }

  // 日期范围过滤
  if (filters.value.dateRange && filters.value.dateRange.length === 2) {
    const [start, end] = filters.value.dateRange
    data = data.filter(item => {
      const loginDate = new Date(item.lastLogin).toISOString().split('T')[0]
      return loginDate >= start && loginDate <= end
    })
  }

  // 排序
  if (sortConfig.value.prop && sortConfig.value.order) {
    const { prop, order } = sortConfig.value
    data.sort((a, b) => {
      let compareResult = 0
      if (prop === 'lastLogin') {
        compareResult = new Date(a[prop]) - new Date(b[prop])
      } else {
        compareResult = a[prop] > b[prop] ? 1 : -1
      }
      return order === 'ascending' ? compareResult : -compareResult
    })
  }

  return data
})

// 计算当前页数据
const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  return filteredTableData.value.slice(startIndex, startIndex + pageSize.value)
})

// 事件处理函数
const handleSearch = () => {
  currentPage.value = 1
}

const handleFilterChange = () => {
  currentPage.value = 1
}

const handleSortChange = ({ prop, order }) => {
  sortConfig.value = { prop, order }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

// 工具函数
const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getRoleLabel = (role) => {
  const roleMap = {
    admin: '管理员',
    user: '普通用户',
    guest: '访客'
  }
  return roleMap[role] || role
}

const getStatusLabel = (status) => {
  const statusMap = {
    active: '活跃',
    inactive: '非活跃',
    disabled: '已禁用'
  }
  return statusMap[status] || status
}

const getRoleTagType = (role) => {
  const typeMap = {
    admin: 'danger',
    user: '',
    guest: 'info'
  }
  return typeMap[role]
}

const getStatusTagType = (status) => {
  const typeMap = {
    active: 'success',
    inactive: 'warning',
    disabled: 'info'
  }
  return typeMap[status]
}

const showHelp = () => {
  helpDialogTitle.value = '数据列表使用帮助'
  helpContent.value = helpContentData.dataList
  showHelpDialog.value = true
}

// CSV 导出相关函数
const convertToCSV = (data) => {
  const headers = ['ID', '用户名', '邮箱', '角色', '状态', '最后登录时间']
  const csvRows = []
  csvRows.push(headers.join(','))
  data.forEach(item => {
    const row = [
      item.id,
      `"${item.username}"`,
      `"${item.email}"`,
      `"${getRoleLabel(item.role)}"`,
      `"${getStatusLabel(item.status)}"`,
      `"${formatDate(item.lastLogin)}"`
    ]
    csvRows.push(row.join(','))
  })
  return csvRows.join('\n')
}

const downloadCSV = (csvContent, filename) => {
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exportData = () => {
  try {
    const dataToExport = filteredTableData.value
    if (dataToExport.length === 0) {
      ElMessage({
        type: 'warning',
        message: '没有可导出的数据'
      })
      return
    }
    const csvContent = convertToCSV(dataToExport)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `用户数据_${timestamp}.csv`
    downloadCSV(csvContent, filename)
    ElMessage({
      type: 'success',
      message: '导出成功'
    })
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage({
      type: 'error',
      message: '导出失败，请稍后重试'
    })
  }
}

// 帮助内容渲染
const renderedHelpContent = computed(() => {
  return DOMPurify.sanitize(marked(helpContent.value))
})

// 初始化
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.data-list-container {
  padding: 20px;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  color: var(--el-text-color-primary);
}

.header-buttons {
  display: flex;
  gap: 12px;
}

.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: fit-content;
}

.search-input {
  width: 240px;
  flex: none;
}

:deep(.el-select) {
  width: 120px;
  flex: none;
}

:deep(.el-date-editor--daterange) {
  width: 260px;
  flex: none;
}

:deep(.el-range-input) {
  width: 35% !important;
}

:deep(.el-range-separator) {
  width: 10% !important;
  padding: 0 !important;
}

:deep(.el-range__close-icon) {
  margin-left: 0 !important;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

:deep(.el-table .cell) {
  white-space: nowrap;
}

:deep(.help-content) {
  max-height: 60vh;
  overflow-y: auto;
  padding: 0 20px;
}

:deep(.markdown-body) {
  font-family: var(--el-font-family);
}

:deep(.el-tag) {
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

:deep(.el-tag.el-tag--danger) {
  background-color: rgba(245, 108, 108, 0.15);
  border-color: rgba(245, 108, 108, 0.3);
  color: #F56C6C;
}

:deep(.el-tag.el-tag--success) {
  background-color: rgba(103, 194, 58, 0.15);
  border-color: rgba(103, 194, 58, 0.3);
  color: #67C23A;
}

:deep(.el-tag.el-tag--info) {
  background-color: rgba(144, 147, 153, 0.15);
  border-color: rgba(144, 147, 153, 0.3);
  color: #909399;
}

:deep(.el-tag.el-tag--warning) {
  background-color: rgba(230, 162, 60, 0.15);
  border-color: rgba(230, 162, 60, 0.3);
  color: #E6A23C;
}
</style>
