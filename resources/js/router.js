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
    name: 'Login',
    component: () => import("./Pages/Landing.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');

  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && token) {
    next({ path: '/dash' });
  } else {
    next();
  }
});

export default router;
