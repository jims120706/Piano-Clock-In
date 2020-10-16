import Vue from 'vue'
import App from './App'
import '@/static/styles/bootstrap-grid.scss'
import '@/static/styles/weui.scss'
import '@/static/styles/public.scss'
import Api from '@/api'

Vue.config.productionTip = false
Vue.prototype.$Api = Api
Vue.prototype.$api = Api

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
