import Vue from 'vue'
import App from './App'
import '@/static/styles/bootstrap-grid.scss'
import '@/static/styles/public.scss'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
