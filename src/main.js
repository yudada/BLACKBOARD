import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/plugins/element.js'
import instance from '@/utils/http'
import store from '@/store/index'


// 导入全局样式
import '@/assets/css/global.scss'
import '@/assets/css/elementui.scss'
import '@/theme/theme/index.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/transition.scss'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.prototype.$http = instance

Vue.config.productionTip = false

Vue.use(VueQuillEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
