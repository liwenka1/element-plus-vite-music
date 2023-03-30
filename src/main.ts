import { createApp } from 'vue'
import App from './App.vue'

// import '~/styles/element/index.scss'

import ElementPlus from 'element-plus'
// import all element css, uncommented next line
import 'element-plus/dist/index.css'

// or use cdn, uncomment cdn link in `index.html`

import '~/styles/index.scss'
import 'uno.css'

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'

import '../src/assets/css/global.css'
import '../src/assets/less/reset.less'
import '../src/assets/fonts/fonts.css'

import router from './router/index'
import { createPinia } from 'pinia'
import './rem.ts'
import '~/assets/tailwind/index.css'

// 1.创建实例
const pinia = createPinia()

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
