import Vue from 'vue'
import App from './App'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '@/static/styles/bootstrap-grid.scss'
import '@/static/styles/public.scss'
import '@/static/styles/iconfont.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
