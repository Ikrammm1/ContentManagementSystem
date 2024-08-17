// resources/js/src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './Pages/Auth/Login.vue';
// import Dashbooard from './Pages/Welcome.vue';

const routes = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login,
  // },
  {
    path: '/dash',
    name: 'Dashboard',
    component: () => import("./Pages/Welcome.vue"),
  },
  {
    path: '/',
    name: 'Landing',
    component: () => import("./Pages/Landing.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
