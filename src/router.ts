import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import AlertList from './views/AlertList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/alerts/:topic',
      name: 'alerts',
      component: AlertList,
    },
  ],
});
