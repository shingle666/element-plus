# Vue Components 展示系统

一个功能丰富的 Vue 3 组件展示系统，提供动态组件预览、源代码查看、在线编辑和代码转换等功能，帮助开发者高效展示和演示 Vue 组件。

## ✨ 特性

- 🚀 **现代技术栈**：基于 Vue 3 + Vite + Element Plus
- 📦 **动态组件加载**：支持动态导入和预览组件
- 🎨 **代码语法高亮**：使用 Highlight.js 提供美观的代码展示
- 📝 **实时源码查看**：动态读取并展示组件源代码
- 🔧 **多组件支持**：可同时展示多个组件示例
- 🌐 **在线编辑集成**：
  - 🎪 **Playground 编辑**：一键跳转到 Vue Playground 在线编辑
  - 🐙 **GitHub 编辑**：直接跳转到 GitHub 编辑对应文件
- 📋 **代码操作**：支持一键复制代码到剪贴板
- 🔄 **Vue 转换工具**：将 Vue 文件转换为 Playground 格式
- 💡 **响应式设计**：适配各种屏幕尺寸
- ⚡ **热模块替换**：开发时支持 HMR 快速更新
- 🎯 **用户友好**：提供丰富的提示信息和错误处理

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
vue-components/
├── .env.example             # 环境变量配置示例
├── src/
│   ├── common/
│   │   └── utils.js         # Vue 转换工具函数
│   ├── components/
│   │   └── componentShow.vue # 核心组件展示器
│   ├── example/
│   │   ├── button/          # 按钮组件示例目录
│   │   ├── button.vue       # 按钮组件示例
│   │   ├── input.vue        # 输入框组件示例
│   │   └── link.vue         # 链接组件示例
│   └── index.vue            # 主页面
├── main.js                  # 应用入口
├── package.json             # 项目配置
└── vite.config.js           # Vite 配置
```

## 🔧 核心组件

### ComponentShow 组件展示器

这是系统的核心组件，提供丰富的组件展示和交互功能：

#### 🎯 主要功能

- **动态组件渲染**：根据传入的组件路径动态加载和渲染组件
- **源代码展示**：实时读取组件源代码并进行语法高亮
- **工具栏操作**：
  - 🎪 **Playground 编辑**：一键跳转到 Vue Playground 在线编辑
  - 🐙 **GitHub 编辑**：直接跳转到 GitHub 编辑对应文件
  - 📋 **复制代码**：一键复制组件源代码到剪贴板
  - 👁️ **切换代码显示**：显示/隐藏源代码区域
- **智能提示**：提供操作反馈和错误处理
- **环境配置**：支持通过环境变量自定义 GitHub 仓库信息

#### 🚀 使用方式

```vue
<ComponentShow
  :title="组件标题"
  :description="组件描述"
  :componentPath="../example/button.vue"
  :language="vue"
/>
```

#### 📋 Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|---------|
| title | String | 'Element Plus 组件演示' | 组件标题 |
| description | String | '' | 组件描述 |
| componentPath | String | '' | 组件文件路径（相对路径）|
| language | String | 'vue' | 代码语言类型 |

## ⚙️ 环境配置

### GitHub 编辑功能配置

1. 复制 `.env.example` 为 `.env` 文件
2. 配置你的 GitHub 仓库信息：

```bash
# GitHub 仓库地址（不包含 .git 后缀）
VITE_GITHUB_REPO=https://github.com/your-username/vue-components

# GitHub 分支名（通常是 main 或 master）
VITE_GITHUB_BRANCH=main
```

## 🛠️ 工具函数

### Vue 转换工具 (utils.js)

提供了一套完整的 Vue 文件转换工具：

#### 主要函数

- `convertVueToPlayground(vueFileContent, fileName)` - 将 Vue 文件转换为 Playground 格式
- `generatePlaygroundUrl(playgroundJson)` - 生成 Playground URL
- `vueToPlaygroundUrl(vueFileContent, fileName)` - 一键生成 Playground URL
- `convertVueFileToPlayground(filePath)` - 从文件路径转换

#### 使用示例

```javascript
import { vueToPlaygroundUrl } from './src/common/utils.js'

const vueCode = `<template><div>Hello World</div></template>`
const playgroundUrl = vueToPlaygroundUrl(vueCode)
console.log(playgroundUrl) // https://play.vuejs.org/#...
```

## 📝 添加新组件

1. 在 `src/example/` 目录下创建新的 Vue 组件文件
2. 在 `src/index.vue` 的 `lists` 数组中添加新组件的配置：

```javascript
const lists = ref([
  // 现有组件...
  {
    title: '新组件标题',
    description: '新组件描述',
    componentPath: '../example/new-component.vue',
  },
])
```

## 🔧 技术栈

### 核心框架
- **Vue 3** (v3.5.18) - 渐进式 JavaScript 框架
- **Vite** (v7.1.2) - 下一代前端构建工具

### UI 组件库
- **Element Plus** (v2.10.7) - Vue 3 UI 组件库
- **@element-plus/icons-vue** (v2.3.2) - Element Plus 图标库

### 功能库
- **Highlight.js** (v11.11.1) - 代码语法高亮库
- **js-base64** (v3.7.8) - Base64 编码解码库

### 开发工具
- **@vitejs/plugin-vue** (v6.0.1) - Vue 3 Vite 插件

## 💻 开发说明

### 📁 目录结构说明

- `src/components/` - 存放所有组件文件
  - `componentShow.vue` - 核心组件展示器
- `src/example/` - 存放示例组件
- `src/common/` - 公共工具函数
  - `utils.js` - Vue 转换和 Playground 工具
- `src/index.vue` - 主页面，配置组件列表
- `.env.example` - 环境变量配置示例

### 🎨 代码高亮

使用 highlight.js 进行代码语法高亮，支持：
- Vue 单文件组件语法高亮
- 自动检测代码语言类型
- 支持多种主题样式

### 🔄 组件动态加载

通过 Vue 3 的 `defineAsyncComponent` 实现：
- 组件的动态加载
- 按需加载组件文件
- 错误处理和加载状态

### 🚀 Playground 集成

- 自动转换 Vue 文件为 Playground 格式
- 包含 Element Plus 配置
- 支持 TypeScript 配置
- 一键生成分享链接

### 🔧 开发建议

1. **组件开发**：在 `src/example/` 目录下创建新组件
2. **样式规范**：使用 Element Plus 设计规范
3. **代码规范**：保持代码简洁和可读性
4. **测试验证**：确保组件在 Playground 中正常运行

## 许可证

[MIT](LICENSE)