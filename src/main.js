import { createApp } from 'vue'
import App from './App.vue'
// 引入 router
import router from '@/router'
// 引入 vuex
import store from '@/store'
// 引入element plus 样式
import 'element-plus/dist/index.css'
// 引入 axios
createApp(App).use(router).use(store).mount('#app')
