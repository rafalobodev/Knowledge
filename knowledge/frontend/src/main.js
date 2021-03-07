import 'font-awesome/css/font-awesome.css' //icones font aw
import Vue from 'vue' //imports basicos importantes

import App from './App'//imports basicos importantes

import './config/bootstrap' //carregar arquivo de configuração no main
import './config/msgs'
import './config/axios' //sucesso ou erro caso um ou outro
import './config/mq' //coloca tamanhos proporçoes main.js geral

import store from './config/store' //importa store com vuex
import router from './config/router' //coloca as rotas no principal

Vue.config.productionTip = false

new Vue({//instancia do vue
  store,
  router,
  render: h => h(App)
}).$mount('#app')