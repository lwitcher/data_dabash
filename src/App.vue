<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>数据分析面板</h1>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :router="true"
            :default-active="activeMenu"
            class="el-menu-vertical">
            <el-menu-item index="/overview">
              <el-icon><DataLine /></el-icon>
              <span>数据概览</span>
            </el-menu-item>
            <el-menu-item index="/analysis">
              <el-icon><PieChart /></el-icon>
              <span>统计分析</span>
            </el-menu-item>
            <el-menu-item index="/data-list">
              <el-icon><List /></el-icon>
              <span>数据列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = computed(() => route.path)
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
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
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
  border-right: 1px solid #e6e6e6;
}

.el-menu-vertical {
  border-right: none;
}

.el-main {
  background-color: #f0f2f5;
  padding: 0;
}
</style>
