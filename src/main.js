import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

Axios.defaults.headers.common['Authorization'] = store.state.token !== "" && `Token ${store.state.token}`;

Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
