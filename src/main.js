import Vue from 'vue';
import App from './App.vue';
import "./main.css";
import item from './components/item.vue';
import steps from './components/steps.vue';
import step from './components/step.vue';
import list from './components/list.vue';

Vue.config.productionTip = false;

Vue.component('steps', steps);
Vue.component('step', step);
Vue.component('item', item);
Vue.component('list', list);

window.Event = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
