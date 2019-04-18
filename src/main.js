import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant';
import { Notify } from 'vant';
import 'vant/lib/index.css';

import'./css/commonality.css'
const eventBus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$eventBus = eventBus;
Vue.use(Vant);
Vue.use(Notify);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
