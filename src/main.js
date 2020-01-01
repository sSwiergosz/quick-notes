import Vue from 'vue';
import Toasted from 'vue-toasted';
import App from './App.vue';
import store from './store';

Vue.use(Toasted, { iconPack: 'fontawesome' });

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
