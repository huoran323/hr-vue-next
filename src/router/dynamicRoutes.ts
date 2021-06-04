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
            {
                path: '/system',
                name: 'system',
                component: () =>
                    import('/@/views/layout/routerView/parent.vue'),
                redirect: '/system/menu',
                meta: {
                    title: '系统配置',
                    auth: ['admin'],
                    icon: '',
                },
                children: [
                    {
                        path: '/system/menu',
                        name: 'systemMenu',
                        component: () =>
                            import('/@/views/system/menu/index.vue'),
                        meta: {
                            title: '菜单管理',
                            auth: ['admin'],
                        },
                    },
                    {
                        path: '/system/user',
                        name: 'systemUser',
                        component: () =>
                            import('/@/views/system/user/index.vue'),
                        meta: {
                            title: '用户管理',
                            auth: ['admin'],
                        },
                    },
                ],
            },
        ],
    },
];
