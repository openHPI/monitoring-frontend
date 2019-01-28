import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
  ],
});
