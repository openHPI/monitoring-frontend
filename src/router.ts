import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import EventList from './views/EventList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/:category/events',
      name: 'events',
      component: EventList,
    },
  ],
});
