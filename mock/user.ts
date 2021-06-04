import { MockMethod } from 'vite-plugin-mock';

const users = [
    {
        userName: 'admin',
        password: '123456',
        userId: 'admin',
        avatar: '',
        userInfos: {},
    },
    {
        userName: 'test',
        password: '123456',
        userId: 'test',
        avatar: '',
        userInfos: {},
    },
];

const menuList = [
    {
        path: '/home',
        name: 'home',
        component: 'home/index',
        meta: {
            auth: ['admin', 'test'],
            title: '首页',
        },
    },
    {
        path: '/system',
        name: 'system',
        component: 'layout/routeView/parent',
        redirect: '/system/menu',
        meta: {
            auth: ['admin'],
            title: '系统配置',
        },
        children: [
            {
                path: '/system/menu',
                name: 'systemMenu',
                component: 'system/menu/index',
                meta: {
                    auth: ['admin'],
                    title: '菜单管理',
                },
            },
            {
                path: '/system/user',
                name: 'systemUser',
                component: 'system/user/index',
                meta: {
                    auth: ['admin'],
                },
            },
        ],
    },
];

const mocks: MockMethod[] = [
    //
    {
        url: '/user/login',
        method: 'post',
        response: ({ body }) => {
            const { userName, password } = body;
            const res = users.filter((item) => {
                return item.userName == userName && item.password == password;
            });
            if (res.length > 0) {
                return {
                    code: 0,
                    data: res[0],
                    message: '登录成功！',
                    token: 'token',
                };
            } else {
                return {
                    code: 1,
                    data: '',
                    message: '账号或密码错误！',
                    token: '',
                };
            }
        },
    },
    {
        url: '/user/getMenuList',
        method: 'post',
        response: ({ body }) => {
            const { userId } = body;

            return {
                code: 0,
                data: menuList,
                message: '请求成功！',
                token: 'token',
            };
        },
    },
];

// 后端控制路由
function backEndRouter(routes: any, userId: string) {
    if (!routes) return;
    return routes.filter((item: any) => {
        if (item.auth.indexOf(userId) > -1) {
            item.children && backEndRouter(item.children, userId);
            return item;
        }
    });
}

export default mocks;
