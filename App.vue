<template>
  <div id="app">
    <!-- 使用新的动态组件展示页面 -->
    <VueComponentsDoc />
  </div>
</template>

<script setup>
import VueComponentsDoc from './src/index.vue'
</script>

<style scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #409eff;
}

.component-section {
  background-color: #fff;
  border-radius: 8px;
box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
}

.component-section h2 {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
  margin-top: 0;
  color: #409eff;
}

.component-demo {
  padding: 10px;
}

.component-demo h3 {
  font-size: 16px;
  margin: 20px 0 10px;
  color: #606266;
}

.demo-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.demo-row .custom-input {
  width: 300px;
}
</style>
