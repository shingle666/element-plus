<template>
  <div class="component-demo">
    <!-- 标题和描述区域 -->
    <div class="header-section" v-if="title || description">
      <h3 v-if="title" class="component-title">{{ title }}</h3>
      <p v-if="description" class="component-description">{{ description }}</p>
    </div>
    
    <!-- 组件展示区域 -->
    <div class="demo-section">
      <component v-if="dynamicComponent" :is="dynamicComponent" />
      <div v-else class="placeholder">暂无组件内容</div>
    </div>
    
    <!-- 中间：工具图标 -->
    <div class="tools-section">
      <el-button-group>
        <el-button size="small" :icon="Bell" @click="copyCode">复制代码</el-button>
        <el-button size="small" :icon="View" @click="viewSource">查看源代码</el-button>
        <el-button size="small" :icon="Edit" @click="editOnGithub">在 GitHub 中编辑</el-button>
      </el-button-group>
    </div>
    
    <!-- 下面：代码展示区块 -->
    <div class="code-section" v-show="showCode">
      <pre><code ref="codeRef" class="language-xml" v-html="displayCode"></code></pre>
    </div>
    
    <!-- 最下方：隐藏源代码区块 -->
    <div class="toggle-section">
      <el-button 
        size="small" 
        type="text" 
        @click="toggleCode"
        :icon="showCode ? ArrowUp : ArrowDown"
      >
        {{ showCode ? '隐藏源代码' : '显示源代码' }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs, computed, watch, shallowRef, nextTick } from 'vue'
import { Bell, View, Edit, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github.css'

// 定义 props
const props = defineProps({
  componentPath: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'Element Plus 组件演示'
  },
  description: {
    type: String,
    default: ''
  }
})

// 解构 props
const { title, description, componentPath } = toRefs(props)

// 动态读取组件源代码
const sourceCode = ref('')
// 动态组件
const dynamicComponent = shallowRef(null)

// 当组件路径改变时，动态导入文件内容和组件
const loadComponentSource = async () => {
  if (componentPath.value) {
    try {
      // 使用动态导入加载原始文件内容，相对于当前组件的路径
      const rawModule = await import(/* @vite-ignore */ `${componentPath.value}?raw`)
      sourceCode.value = rawModule.default
      
      // 动态导入组件
      const componentModule = await import(/* @vite-ignore */ `${componentPath.value}`)
      dynamicComponent.value = componentModule.default
    } catch (error) {
      console.error('Failed to load component source:', error)
      sourceCode.value = '// 无法加载组件源代码'
      dynamicComponent.value = null
    }
  }
}

// 监听组件路径变化
watch(componentPath, loadComponentSource, { immediate: true })

// 注册语言
hljs.registerLanguage('xml', xml)

const showCode = ref(false)
const codeRef = ref(null)

// HTML 转义函数
const escapeHtml = (html) => {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// 计算属性：显示的代码内容
const displayCode = computed(() => {
  if (sourceCode.value) {
    return escapeHtml(sourceCode.value)
  }
  return escapeHtml('<p>暂无代码内容</p>')
})

// 获取原始代码文本（用于复制）
const getRawCode = () => {
  return sourceCode.value || '<p>暂无代码内容</p>'
}

// 初始化代码高亮
onMounted(() => {
  if (codeRef.value) {
    hljs.highlightElement(codeRef.value)
  }
})

const copyCode = () => {
  const codeText = getRawCode()
  
  navigator.clipboard.writeText(codeText).then(() => {
    console.log('代码已复制到剪贴板')
  }).catch(err => {
    console.error('复制失败:', err)
  })
}

const viewSource = () => {
  showCode.value = true
  // 等待DOM更新后再执行代码高亮
  nextTick(() => {
    if (codeRef.value) {
      // 移除之前的高亮状态
      codeRef.value.removeAttribute('data-highlighted')
      codeRef.value.className = 'language-xml'
      hljs.highlightElement(codeRef.value)
    }
  })
}

const editOnGithub = () => {
  console.log('在 GitHub 中编辑')
}

const toggleCode = () => {
  showCode.value = !showCode.value
  // 如果显示代码，等待DOM更新后执行代码高亮
  if (showCode.value) {
    nextTick(() => {
      if (codeRef.value) {
        // 移除之前的高亮状态
        codeRef.value.removeAttribute('data-highlighted')
        codeRef.value.className = 'language-xml'
        hljs.highlightElement(codeRef.value)
      }
    })
  }
}
</script>

<style scoped>
.component-demo {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}

.header-section {
  padding: 16px 20px;
  background-color: #fafbfc;
  border-bottom: 1px solid #ebeef5;
}

.component-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.component-description {
  margin: 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.demo-section {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
  min-height: 60px;
}

.demo-section .placeholder {
  color: #909399;
  text-align: center;
  font-style: italic;
}

.demo-section :deep(.el-link) {
  margin-right: 8px;
}

.demo-section :deep(.el-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}

.demo-section :deep(.el-input) {
  margin-right: 8px;
  margin-bottom: 8px;
  max-width: 200px;
}

.tools-section {
  padding: 10px 20px;
  background-color: #fafafa;
  border-bottom: 1px solid #ebeef5;
  text-align: center;
}

.code-section {
  background-color: #f8f9fa;
  padding: 0;
}

.code-section pre {
  margin: 0;
  padding: 20px;
  background-color: #f8f9fa;
  border: none;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #2c3e50;
  overflow-x: auto;
}

.code-section code {
  background: none;
  padding: 0;
  font-family: inherit;
}

.toggle-section {
  padding: 10px 20px;
  background-color: #f5f7fa;
  text-align: center;
  border-top: 1px solid #ebeef5;
}

.toggle-section .el-button {
  color: #606266;
}

.toggle-section .el-button:hover {
  color: #409eff;
}
</style>