import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Session } from '/@/utils/storage';
import { dynamicRoutes } from './dynamicRoutes.ts';

// 定义静态路由
const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('/@/views/login/index.vue'),
        meta: {
            title: '登陆',
        },
    },
    {
        path: '/404',
        name: 'notFound',
        component: () => import('/@/views/error/404.vue'),
        meta: {
            title: '找不到此页面',
        },
    },
    {
        path: '/401',
        name: 'noPower',
        component: () => import('/@/views/error/401.vue'),
        meta: {
            title: '没有权限',
        },
    },
];

// 添加静态路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes,
});

// 路由加载前
router.beforeEach((to, from, next) => {
    NProgress.configure({ showSpinner: false });
    if (to.meta.title) NProgress.start();
    const token = Session.get('token');
    if (to.path === '/login' && !token) {
        console.log('1');
        next();
        NProgress.done();
    } else {
        if (!token) {
            console.log('2');
            // 如果没有token,重定向到登录页面
            next(`/login?redirect=${to.path}`);
            Session.clear();
            // resetRoute();
            NProgress.done();
        } else if (token && to.path === '/login') {
            console.log('3');
            next('/home');
            NProgress.done();
        } else {
            console.log('4');
            next();
        }
    }
});

// 路由加载后
router.afterEach(() => {
    NProgress.done();
});

// 导出路由
export default router;
