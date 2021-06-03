// 定义动态路由
export const dynamicRoutes = [
    {
        path: '/',
        name: '/',
        component: () => import('/@/views/layout/index.vue'),
        redirect: '/home',
        meta: {
            isKeepAlive: true,
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('/@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    auth: ['admin'],
                    icon: '',
                },
            },
        ],
    },
];
