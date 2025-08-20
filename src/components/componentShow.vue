<template>
  <div class="component-container">
    <!-- 标题和描述区域 -->
    <div class="header-section" v-if="title || description">
      <h3 v-if="title" class="component-title">{{ title }}</h3>
      <p v-if="description" class="component-description">{{ description }}</p>
    </div>
    
    <!-- 组件展示区域 -->
    <div class="components-section">
      <component v-if="dynamicComponent" :is="dynamicComponent" />
      <div v-else class="placeholder">暂无组件内容</div>
    </div>
    
    <!-- 工具图标 -->
    <div class="tools-section">
      <div style="display: flex; flex-direction: row;gap: 10px;">
        <el-tooltip content="在 Playground 中编辑" placement="top">
          <el-icon color="#666666" size="20px" @click="editOnPlayground">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276A1.5 1.5 0 0 1 18.656 22H5.344a1.5 1.5 0 0 1-1.362-2.129l4.282-9.276A7.994 7.994 0 0 0 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567a9.978 9.978 0 0 1-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058a8.777 8.777 0 0 1-.021-.364L13 7.243V4h-2v3.243z"></path>
              </svg>
          </el-icon>
        </el-tooltip>
        <el-tooltip content="在 GitHub 中编辑" placement="top">
          <el-icon color="#666666" size="20px" @click="editOnGithub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588c-.094-.117.34.427.433.539c.19.227.33.365.44.438c.204.137.587.196 1.15.14c.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292c-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047c.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308c1.477-.933 2.613-1.226 3.422-1.096c.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19c.691.936 1.058 2.045 1.058 3.293c0 3.757-1.674 5.665-4.642 6.392c.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716a1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446l.005-.705c.005-.708.007-1.338.007-1.998c0-.697-.183-1.152-.425-1.36c-.661-.57-.326-1.655.54-1.752c2.967-.333 4.337-1.482 4.337-4.66c0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947c-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66c.865.097 1.201 1.177.544 1.748c-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z"></path>
              </svg>
          </el-icon>
        </el-tooltip>
        <el-tooltip content="复制代码" placement="top">
          <el-icon color="#666666" size="20px" @click="copyCode">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"></path>
              </svg>
          </el-icon>
        </el-tooltip>
        <el-tooltip :content="showCode ? '隐藏源代码' : '显示源代码'" placement="top">
          <el-icon size="20px" color="#666666" @click="toggleCode">
             <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"></path>
            </svg>
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    
    <!-- 代码展示区块 -->
    <div class="code-section" v-show="showCode">
      <div class="code-header">
        <el-text color="#666666" size="small">{{ language }}</el-text>
      </div>
      <pre><code ref="codeRef" class="language-xml" v-html="displayCode"></code></pre>
    </div>
    
    <!-- 隐藏源代码区块 -->
    <div v-if="showCode" class="toggle-section">
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
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github.css'
import { encode } from 'js-base64'
import { convertVueToPlayground } from '../common/utils.js'

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
  },
  language: {
    type: String,
    default: 'vue'
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
hljs.registerLanguage('vue', xml)

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

// GitHub 配置
const githubConfig = {
  // 默认配置，可以通过环境变量或配置文件覆盖
  repo: import.meta.env.VITE_GITHUB_REPO || 'https://github.com/shingle666/element-plus',
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'main'
}

const editOnGithub = () => {
  if (!componentPath.value) {
    ElMessage.warning('无法获取组件路径，无法在 GitHub 中编辑')
    return
  }

  try {
    // 移除路径开头的 '../' 或 './' 并构建完整的文件路径
    const cleanPath = componentPath.value.replace(/^\.\.?\//, '')
    const fullPath = cleanPath.startsWith('src/') ? cleanPath : `src/${cleanPath}`
    
    // 构建 GitHub 编辑 URL
    const editUrl = `${githubConfig.repo}/edit/${githubConfig.branch}/${fullPath}`
    
    // 在新标签页中打开 GitHub 编辑页面
    window.open(editUrl, '_blank')
    console.log('在 GitHub 中编辑:', editUrl)
    
    // 可选：显示成功提示
    ElMessage.success('正在跳转到 GitHub 编辑页面...')
  } catch (error) {
    console.error('打开 GitHub 编辑页面失败:', error)
    ElMessage.error('打开 GitHub 编辑页面失败，请检查配置')
  }
}

const editOnPlayground = () => {
  const codeText = getRawCode()
  const playgroundConfig = convertVueToPlayground(codeText)
  const playgroundUrl = 'https://element-plus.run/#' + encode(playgroundConfig)
  window.open(playgroundUrl, '_blank')
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
.component-container {
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

.components-section {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
  min-height: 60px;
}

.components-section .placeholder {
  color: #909399;
  text-align: center;
  font-style: italic;
}

.components-section :deep(.el-link) {
  margin-right: 8px;
}

.components-section :deep(.el-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}

.components-section :deep(.el-input) {
  margin-right: 8px;
  margin-bottom: 8px;
  max-width: 200px;
}

.tools-section {
  padding: 10px 20px;
  background-color: #fafafa;
  border-bottom: 1px solid #ebeef5;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.code-section {
  background-color: #f8f9fa;
  padding: 0;
  position: relative;
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

.code-header {
  position: absolute;
  top: 2px;
  right: 10px;
}
</style>