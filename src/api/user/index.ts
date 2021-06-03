import request from '/@/utils/request';

export interface LoginParam {
    userName: string;
    password: string;
}

// 用户登录
export function loginApi(params: LoginParam) {
    return request({
        url: '/user/login',
        method: 'post',
        data: params,
    });
}

// 获取路由
export function getMenuListApi(params: object) {
    return request({
        url: '/user/getMenuList',
        method: 'post',
        data: params,
    });
}
