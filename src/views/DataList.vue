<template>
  <div class="datalist-container">
    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h3>用户数据列表</h3>
            <el-button
              type="primary"
              link
              @click="showHelp('dataList')">
              <el-icon><QuestionFilled /></el-icon>
            </el-button>
          </div>
          <div class="header-right">
            <el-input
              v-model="searchQuery"
              placeholder="搜索用户名/ID/邮箱"
              class="search-input"
              clearable
              @clear="handleSearch"
              @input="handleSearch">
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-button type="success" @click="exportData">
              <el-icon><Download /></el-icon>
              导出数据
            </el-button>
          </div>
        </div>
      </template>

      <div class="filter-section">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select
              v-model="filters.status"
              placeholder="用户状态"
              clearable
              @change="handleFilter">
              <el-option label="活跃" value="active" />
              <el-option label="非活跃" value="inactive" />
              <el-option label="已禁用" value="disabled" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="filters.role"
              placeholder="用户角色"
              clearable
              @change="handleFilter">
              <el-option label="管理员" value="admin" />
              <el-option label="普通用户" value="user" />
              <el-option label="访客" value="guest" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="filters.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleFilter" />
          </el-col>
        </el-row>
      </div>

      <el-table
        :data="filteredTableData"
        style="width: 100%"
        v-loading="loading"
        @sort-change="handleSortChange">
        <el-table-column prop="id" label="ID" sortable="custom" width="80" />
        <el-table-column prop="username" label="用户名" sortable="custom" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag :type="getRoleType(scope.row.role)">
              {{ scope.row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastLogin" label="最后登录时间" sortable="custom">
          <template #default="scope">
            {{ formatDate(scope.row.lastLogin) }}
          </template>
        </el-table-column>
        <el-table-column prop="actions" label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" link @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" link @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑用户"
      width="500px">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="formRules"
        label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="editForm.role">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
            <el-option label="访客" value="guest" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="editForm.status">
            <el-option label="活跃" value="active" />
            <el-option label="非活跃" value="inactive" />
            <el-option label="已禁用" value="disabled" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>

    <markdown-dialog
      v-model:visible="helpVisible"
      :title="helpTitle"
      :content="helpContent" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { helpContent as helpContentData } from '../data/helpContent'
import MarkdownDialog from '../components/MarkdownDialog.vue'

// 表格数据
const tableData = ref([
  {
    id: 1,
    username: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-20 10:30:00'
  },
  {
    id: 2,
    username: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-03-19 15:45:00'
  },
  {
    id: 3,
    username: '王五',
    email: 'wangwu@example.com',
    role: 'guest',
    status: 'disabled',
    lastLogin: '2024-03-18 09:20:00'
  }
  // 这里可以添加更多测试数据
])

// 加载状态
const loading = ref(false)

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
const total = ref(100)

// 排序
const sortBy = ref('')
const sortOrder = ref('')

// 编辑表单
const editDialogVisible = ref(false)
const editForm = ref({
  id: null,
  username: '',
  email: '',
  role: '',
  status: ''
})

// 表单验证规则
const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
}

// 帮助弹窗
const helpVisible = ref(false)
const helpTitle = ref('')
const helpContent = ref('')

// 计算属性：过滤后的表格数据
const filteredTableData = computed(() => {
  let data = [...tableData.value]

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    data = data.filter(item =>
      item.username.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.id.toString().includes(query)
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
    const startDate = filters.value.dateRange[0]
    const endDate = filters.value.dateRange[1]
    data = data.filter(item => {
      const itemDate = new Date(item.lastLogin)
      return itemDate >= startDate && itemDate <= endDate
    })
  }

  // 排序
  if (sortBy.value && sortOrder.value) {
    data.sort((a, b) => {
      if (sortOrder.value === 'ascending') {
        return a[sortBy.value] > b[sortBy.value] ? 1 : -1
      } else {
        return a[sortBy.value] < b[sortBy.value] ? 1 : -1
      }
    })
  }

  return data
})

// 方法
const handleSearch = () => {
  currentPage.value = 1
}

const handleFilter = () => {
  currentPage.value = 1
}

const handleSortChange = ({ prop, order }) => {
  sortBy.value = prop
  sortOrder.value = order
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const handleEdit = (row) => {
  editForm.value = { ...row }
  editDialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确定要删除该用户吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 这里添加删除逻辑
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  }).catch(() => {})
}

const handleSave = () => {
  // 这里添加保存逻辑
  editDialogVisible.value = false
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
}

const exportData = () => {
  // 这里添加导出逻辑
  ElMessage({
    type: 'success',
    message: '导出成功'
  })
}

const showHelp = (type) => {
  helpContent.value = helpContentData[type]
  helpTitle.value = '数据列表使用说明'
  helpVisible.value = true
}

// 工具方法
const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

const getRoleType = (role) => {
  const types = {
    admin: 'danger',
    user: 'success',
    guest: 'info'
  }
  return types[role] || 'info'
}

const getStatusType = (status) => {
  const types = {
    active: 'success',
    inactive: 'warning',
    disabled: 'danger'
  }
  return types[status] || 'info'
}

onMounted(() => {
  // 这里可以添加初始数据加载逻辑
})
</script>

<style scoped>
.datalist-container {
  padding: 20px;
}

.table-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-left h3 {
  margin: 0;
  margin-right: 10px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  width: 300px;
}

.filter-section {
  margin-bottom: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #ebeef5;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
