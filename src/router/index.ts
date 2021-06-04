import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Session } from '/@/utils/storage';
import { dynamicRoutes } from './dynamicRoutes.ts';
import { getMenuListApi } from '/@/api/user';

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

// 定义404页面
const pathMatch = {
    path: '/:path(.*)*',
    redirect: '/404',
};

// 后端控制路由
export async function initBackControlRouters() {
    const result = await getMenuListApi();
    dynamicRoutes[0].children = await backEndRouter(result);
    // 添加404页面
    router.addRoute(pathMatch);
    // 临时
    router.addRoute(dynamicRoutes[0]);
    // 添加动态路由
    // await setAddRoute();
}

// 获取目录下的 .vue 全部文件，参考 vite：import.meta.glob
const dynamicViewsModules = import.meta.glob('../views/**/*.{vue,tsx}');

// 后端控制路由，后端路由 component 转换
export function backEndRouter(routes: any) {
    if (!routes) return;
    return routes.map((item: any) => {
        if (item.component)
            item.component = dynamicImport(
                dynamicViewsModules,
                item.component as string
            );
        item.children && backEndRouter(item.children);
        return item;
    });
}

// 后端控制路由，后端路由 component 转换函数
export function dynamicImport(dynamicViewsModules: Record<string, () => Promise<{ [key: string]: any }>>, component: string) {
	const keys = Object.keys(dynamicViewsModules);
	const matchKeys = keys.filter((key) => {
		const k = key.replace('../views', '');
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
	});
	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return dynamicViewsModules[matchKey];
	}
	if (matchKeys?.length > 1) {
		console.warn('Do not create files that do not end with. Vue');
		return false;
	}
}

// 添加动态路由
export function setAddRoute() {
    setFilterRouteEnd().forEach((route: any) => {
        router.addRoute((route as unknown) as RouteRecordRaw);
    });
}

// 比对后的路由表，进行重新赋值
export function setFilterRouteEnd() {
    let filterRouteEnd: any = [];
    return filterRouteEnd;
}

// 多级嵌套数组处理成一维数组
export function formatFlatteningRoutes(arr: any) {
    if (arr.length <= 0) return false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
            arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
        }
    }
    return arr;
}

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
            // router.push('/');
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
