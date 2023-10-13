import { createRouter, createWebHistory } from 'vue-router'

import Register from '../views/Register.vue'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '../store/store'
import createPoll from '../views/createPoll.vue'
import myPolls from '../views/myPolls.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/signup',
      name: 'signup',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/mypolls',
      name: 'myPolls',
      component: myPolls,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'create',
      component: createPoll,
      meta: { requiresAuth: true }
    },
  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (isAuthenticated && (to.name === 'login' || to.name === 'signup' || to.name === 'main')) {
    next('/dashboard');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const isAuthenticated =store.getters.isLoggedIn;
  console.log(isAuthenticated)
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    router.push('/');
  } else {
    next(); 
  }
});


export default router
