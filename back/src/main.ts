import Vue from 'vue';

import 'normalize.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';
import '@/styles/index.scss';
import '@/icons/components';
import '@/permissions';

import App from './App.vue';
import router from './router';
import store from './store';

import ModalCustom from '@/components/ModalCustom/index.vue'


import './registerServiceWorker';


Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

Vue.component('ModalCustom', ModalCustom)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
