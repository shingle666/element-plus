/**
 * Vue 文件转换为 Vue Playground 格式的工具函数
 */

/**
 * 将 Vue 文件内容转换为 Vue Playground 所需的多文件结构
 * @param {string} vueFileContent - Vue 文件的内容
 * @param {string} fileName - 文件名，默认为 'App.vue'
 * @returns {string} - 转换后的 JSON 字符串
 */
export function convertVueToPlayground(vueFileContent, fileName = 'App.vue') {
  // Element Plus 配置文件
  const elementPlusJs = `import ElementPlus from 'element-plus'
import { getCurrentInstance } from 'vue'

let installed = false
await loadStyle()

export function setupElementPlus() {
  if (installed) return
  const instance = getCurrentInstance()
  instance.appContext.app.use(ElementPlus)
  installed = true
}

export function loadStyle() {
  const styles = ['https://cdn.jsdelivr.net/npm/element-plus@latest/dist/index.css', 'https://cdn.jsdelivr.net/npm/element-plus@latest/theme-chalk/dark/css-vars.css'].map((style) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = style
      link.addEventListener('load', resolve)
      link.addEventListener('error', reject)
      document.body.append(link)
    })
  })
  return Promise.allSettled(styles)
}`;

  // TypeScript 配置
  const tsConfig = `{
  "compilerOptions": {
    "target": "ESNext",
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "types": ["element-plus/global.d.ts"],
    "allowImportingTsExtensions": true,
    "allowJs": true,
    "checkJs": true
  },
  "vueCompilerOptions": {
    "target": 3.3
  }
}`;

  // Playground 主文件
  const playgroundMain = `<script setup>
import App from './App.vue'
import { setupElementPlus } from './element-plus.js'
setupElementPlus()
</script>

<template>
  <App />
</template>`;

  // Import Map 配置
  const importMap = `{
  "imports": {
    "vue": "https://cdn.jsdelivr.net/npm/@vue/runtime-dom@latest/dist/runtime-dom.esm-browser.js",
    "@vue/shared": "https://cdn.jsdelivr.net/npm/@vue/shared@latest/dist/shared.esm-bundler.js",
    "element-plus": "https://cdn.jsdelivr.net/npm/element-plus@latest/dist/index.full.min.mjs",
    "element-plus/": "https://cdn.jsdelivr.net/npm/element-plus@latest/",
    "@element-plus/icons-vue": "https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2/dist/index.min.js"
  },
  "scopes": {}
}`;

  // 构建最终的 JSON 对象
  const playgroundConfig = {
    [fileName]: vueFileContent + '\n',
    'element-plus.js': elementPlusJs + '\n',
    'tsconfig.json': tsConfig + '\n',
    'PlaygroundMain.vue': playgroundMain + '\n',
    'import-map.json': importMap,
    '_o': {}
  };

  return JSON.stringify(playgroundConfig);
}

/**
 * 从文件路径读取 Vue 文件并转换为 Playground 格式
 * @param {string} filePath - Vue 文件路径
 * @returns {Promise<string>} - 转换后的 JSON 字符串
 */
export async function convertVueFileToPlayground(filePath) {
  try {
    // 在浏览器环境中，我们需要使用 fetch 来读取文件
    // 在 Node.js 环境中，可以使用 fs 模块
    if (typeof window !== 'undefined') {
      // 浏览器环境
      const response = await fetch(filePath);
      const content = await response.text();
      const fileName = filePath.split('/').pop() || 'App.vue';
      return convertVueToPlayground(content, fileName);
    } else {
      // Node.js 环境
      const fs = await import('fs');
      const path = await import('path');
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = path.basename(filePath);
      return convertVueToPlayground(content, fileName);
    }
  } catch (error) {
    console.error('转换文件时出错:', error);
    throw error;
  }
}

/**
 * 生成 Vue Playground 的 URL
 * @param {string} playgroundJson - Playground 配置的 JSON 字符串
 * @returns {string} - Vue Playground URL
 */
export function generatePlaygroundUrl(playgroundJson) {
  const encoded = btoa(unescape(encodeURIComponent(playgroundJson)));
  return `https://play.vuejs.org/#${encoded}`;
}

/**
 * 一键转换 Vue 文件为 Playground URL
 * @param {string} vueFileContent - Vue 文件内容
 * @param {string} fileName - 文件名
 * @returns {string} - Vue Playground URL
 */
export function vueToPlaygroundUrl(vueFileContent, fileName = 'App.vue') {
  const playgroundJson = convertVueToPlayground(vueFileContent, fileName);
  return generatePlaygroundUrl(playgroundJson);
}