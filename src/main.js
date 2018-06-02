import Vue from 'vue'
Vue.config.productionTip = false
Vue.config.devtools = true

import router from './router'

import App from './App'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
