import Vue from 'vue';
import Router, { Route } from 'vue-router';
import HelloWorld from './views/HelloWorld.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello-world',
      component: HelloWorld,
    },
  ],
});
