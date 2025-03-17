<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>数据分析面板</h1>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '133px'">
          <el-menu
            :router="true"
            :default-active="activeMenu"
            :collapse="isCollapse"
            class="el-menu-vertical">
            <el-menu-item index="/overview" class="menu-item">
              <el-icon><DataLine /></el-icon>
              <span>数据概览</span>
            </el-menu-item>
            <el-divider />
            <el-menu-item index="/analysis" class="menu-item">
              <el-icon><PieChart /></el-icon>
              <span>统计分析</span>
            </el-menu-item>
            <el-divider />
            <el-menu-item index="/data-list" class="menu-item">
              <el-icon><List /></el-icon>
              <span>数据列表</span>
            </el-menu-item>
          </el-menu>
          <div class="collapse-btn" @click="toggleCollapse">
            <el-icon><Fold v-if="!isCollapse"/><Expand v-else/></el-icon>
          </div>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Fold, Expand } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<script>
/**
 * @description App.vue 是应用的根组件
 */
export default {
  name: 'App'
}
</script>

<style>
/* 添加全局样式重置 */
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;  /* 改回 100vh */
}

.el-container {
  height: 100%;
}

/* 添加嵌套容器的样式 */
.el-container .el-container {
  height: calc(100% - 60px);
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
  position: relative;
  overflow-x: hidden;  /* 添加这行 */
}

.el-menu-vertical {
  border-right: none;
  overflow: hidden;  /* 添加这行 */
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 133px;
  transition: width 0.3s;  /* 添加这行 */
}

/* 添加菜单项样式 */
.el-menu-vertical .el-divider {
  margin: 0;
}

.el-menu-vertical .menu-item {
  padding-left: 12px !important;
}

.el-main {
  background-color: #f0f2f5;
  padding: 0;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 133px;
}

.collapse-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
  background-color: #fff;  /* 添加背景色 */
  border: 1px solid #dcdfe6;  /* 添加边框 */
  z-index: 1;  /* 确保按钮在上层 */
}

.collapse-btn:hover {
  background-color: #f5f7fa;
}

.el-menu-vertical .el-menu-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.el-menu--collapse .el-menu-item {
  justify-content: center;
}
</style>
