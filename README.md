# Vue Components 展示系统

一个基于 Vue 3 的组件展示系统，提供了动态组件预览、源代码查看和代码高亮功能，帮助开发者展示和演示 Vue 组件。

## 特性

- 🚀 基于 Vue 3 + Vite + Element Plus
- 📦 动态组件加载和预览
- 🎨 代码语法高亮显示
- 📝 组件源代码实时查看
- 🔧 支持多组件展示
- 💡 响应式设计，适配各种屏幕
- ⚡ 热模块替换 (HMR) 支持

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

## 项目结构

```
src/
├── components/
│   ├── componentShow.vue    # 组件展示器
│   └── sub/                 # 示例组件目录
│       ├── button.vue       # 按钮组件示例
│       ├── input.vue        # 输入框组件示例
│       └── link.vue         # 链接组件示例
├── index.vue                # 主页面
└── main.js                  # 应用入口
```

## 核心组件

### ComponentShow 组件展示器

这是系统的核心组件，提供以下功能：

- **动态组件渲染**：根据传入的组件路径动态加载和渲染组件
- **源代码展示**：实时读取组件源代码并进行语法高亮
- **交互功能**：复制代码、查看源代码、GitHub编辑等操作

#### 使用方式

```vue
<ComponentShow
  :title="组件标题"
  :description="组件描述"
  :componentPath="./sub/button.vue"
/>
```

#### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | 'Element Plus 组件演示' | 组件标题 |
| description | String | '' | 组件描述 |
| componentPath | String | '' | 组件文件路径 |

## 添加新组件

1. 在 `src/components/sub/` 目录下创建新的 Vue 组件文件
2. 在 `src/index.vue` 的 `lists` 数组中添加新组件的配置：

```javascript
const lists = ref([
  // 现有组件...
  {
    title: '新组件标题',
    description: '新组件描述',
    componentPath: './sub/new-component.vue',
  },
])
```

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Element Plus** - Vue 3 UI 组件库
- **Highlight.js** - 代码语法高亮库

## 开发说明

### 代码高亮

系统使用 Highlight.js 提供代码语法高亮功能，支持：
- XML/HTML 语法高亮
- 动态重新高亮
- GitHub 风格的代码样式

### 动态导入

使用 Vite 的动态导入功能实现：
- 组件的动态加载
- 源代码的实时读取
- 热模块替换支持

## 许可证

[MIT](LICENSE)