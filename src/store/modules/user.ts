import { Module } from 'vuex';
import { LoginParam } from '/@/api/user';
import { IUserInfo, RootStateTypes } from '../interface/index';
import { loginApi, getMenuListApi } from '/@/api/user';

const userModule: Module<IUserInfo, RootStateTypes> = {
    namespaced: true,
    state: {
        token: '',
        name: '',
        avatar: '',
        userInfos: {},
    },
    mutations: {
        // 设置token
        getToken(state: any, data: string) {
            state.token = data;
        },
        // 设置用户名
        getName(state: any, data: string) {
            state.name = data;
        },
        // 设置头像
        getAvatar(state: any, data: string) {
            state.avatar = data;
        },
        // 设置用户信息
        getUserInfo(state: any, data: object) {
            state.userInfos = data;
        },
    },
    actions: {
        // 登录
        async login({ commit }, param: LoginParam) {
            const response = await loginApi(param);
            console.log('response: ', response);
            const { userId } = response;
            this.dispatch('user/getMenuList', userId);
        },
        // 获取菜单
        async getMenuList({ commit }, userId: string) {
            // 后端控制路由
            const response = await getMenuListApi({ userId: userId });
            console.log('menus: ', response);
        },
    },
};

export default userModule;
