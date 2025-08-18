<template>
  <div class="vue-components-doc">
    <div class="header">
      <h1>Vue 组件展示</h1>
      <p>通过动态组件展示器演示各种 Vue 组件</p>
    </div>
    
    <div class="components-list">
      <!-- 使用 componentShow 组件 -->
      <ComponentShow
        v-for="item in lists"
        :title="item.title"
        :description="item.description"
        :componentPath="item.componentPath"
      >
      </ComponentShow>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComponentShow from './components/componentShow.vue'

const lists = ref([
  {
    title: 'Button 组件示例',
    description: '使用 componentShow 展示 button.vue 组件',
    componentPath: './sub/button.vue',
  },
  {
    title: 'Input 组件示例',
    description: '使用 componentShow 展示 input.vue 组件',
    componentPath: './sub/input.vue',
  },
  {
    title: 'Link 组件示例',
    description: '使用 componentShow 展示 link.vue 组件',
    componentPath: './sub/link.vue',
  },
])

</script>

<style scoped>
.vue-components-doc {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.header h1 {
  margin: 0 0 16px 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.header p {
  margin: 0;
  font-size: 1.2rem;
  opacity: 0.9;
}

.components-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 组件演示样式 */
.button-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.input-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
}

.link-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.switch-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

@media (max-width: 768px) {
  .vue-components-doc {
    padding: 10px;
  }
  
  .header {
    padding: 20px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .header p {
    font-size: 1rem;
  }
  
  .button-demo {
    flex-direction: column;
    align-items: stretch;
  }
  
  .link-demo {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .switch-demo {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>