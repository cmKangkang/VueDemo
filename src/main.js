import Vue from 'vue'
// 引入路由配置
import router  from './router'
import App from './App.vue'

//element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 注册API
import allApi from './utils/RequestUtils'
Vue.prototype.api = allApi;

Vue.config.productionTip = false

import store from './store'


Vue.use(ElementUI)


new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')
	