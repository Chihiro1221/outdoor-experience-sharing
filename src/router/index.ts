import { createRouter, createWebHashHistory } from 'vue-router';
import loginVue from '../views/login.vue';
import { LocalStoreKey } from '@/enums/LocalStoreKey';
import homeLayoutVue from '@/layouts/home-layout.vue';
import homeVue from '@/views/home.vue';
import useUserStore from '@/store/userStore';
import userVue from '@/views/user.vue';
import topicVue from '@/views/topic.vue';
import goodsVue from '@/views/goods.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home-layout',
      component: homeLayoutVue,
      children: [
        { path: '', name: 'home', component: homeVue },
        { path: 'user', name: 'user', component: userVue },
        { path: 'topic', name: 'topic', component: topicVue },
        { path: 'goods', name: 'goods', component: goodsVue },
      ],
    },
    { path: '/login', name: 'login', component: loginVue },
  ],
});

router.beforeEach((to, from, next) => {
  const { getUserProfile } = useUserStore();
  // 没有登录并且访问的不是登录页面则拦截并跳转到登录页面
  if (to.path !== '/login' && !localStorage.getItem(LocalStoreKey.TOKEN_KEY)) return next('/login');
  // 如果已经登录并且访问的是登录页面则直接跳转到首页
  if (to.path === '/login' && localStorage.getItem(LocalStoreKey.TOKEN_KEY)) return next('/');
  if (to.path !== '/login') getUserProfile();
  next();
});

export default router;
