# Vue Components

一个基于 Vue 3 的轻量级组件库，提供了一系列常用的UI组件，帮助开发者快速构建现代化的Web应用。

## 特性

- 🚀 基于 Vue 3 和 Element Plus
- 📦 开箱即用的高质量组件
- 🎨 统一的设计风格
- 📝 详细的文档和示例
- 🔧 支持按需引入

## 安装

```bash
npm install vue-components --save
```

## 使用

### 完整引入

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import VueComponents from 'vue-components'

const app = createApp(App)
app.use(VueComponents)
app.mount('#app')
```

### 按需引入

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Input } from 'vue-components'

const app = createApp(App)
app.component(Button.name, Button)
app.component(Input.name, Input)
app.mount('#app')
```

## 组件列表

### Button 按钮

常用的操作按钮，提供多种样式主题、尺寸等。

```vue
<custom-button type="primary">主要按钮</custom-button>
<custom-button type="success" plain>成功按钮</custom-button>
<custom-button type="danger" round>危险按钮</custom-button>
```

### Input 输入框

接收用户输入的文本数据，支持多种状态和验证。

```vue
<custom-input v-model="input" placeholder="请输入内容"></custom-input>
<custom-input v-model="username" label="用户名"></custom-input>
<custom-input v-model="password" type="password" placeholder="请输入密码"></custom-input>
```

## 开发

```bash
# 安装依赖
npm install

# 启动示例应用
npm run example

# 构建组件库
npm run build
```

## 许可证

[MIT](LICENSE)
