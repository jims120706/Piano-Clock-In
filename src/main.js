import Vue from 'vue'
import App from './App'
import '@/static/styles/bootstrap-grid.scss'
import '@/static/styles/weui.scss'
import '@/static/styles/public.scss'
import store from './store'
import Api from '@/api'

// 全局注册loading组件
import LoadingComponent from '@/components/Loading.vue';
Vue.component('Loading', LoadingComponent);

Vue.config.productionTip = false
Vue.prototype.$Api = Api
Vue.prototype.$api = Api

App.mpType = 'app'

store.dispatch('getDataFromStorage')

const app = new Vue({
  ...App,
  store
})
app.$mount()
