<template>
  <div class="input-demo">
    <el-input 
      v-model="input" 
      placeholder="Please input" 
      class="simple-input"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
</script>

<style scoped>
.input-demo {
  padding: 20px;
}

.simple-input {
  width: 240px;
}

.simple-input :deep(.el-input__wrapper) {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: none;
  padding: 8px 12px;
}

.simple-input :deep(.el-input__wrapper:hover) {
  border-color: #c0c4cc;
}

.simple-input :deep(.el-input__wrapper.is-focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.simple-input :deep(.el-input__inner) {
  font-size: 14px;
  color: #606266;
}

.simple-input :deep(.el-input__inner::placeholder) {
  color: #c0c4cc;
}
</style>