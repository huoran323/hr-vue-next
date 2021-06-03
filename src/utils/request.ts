import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';
import router from '/@/router/index';

// 配置新建一个 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL as any,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
});

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前
        if (Session.get('token')) {
            config.headers.common['Authorization'] = `${Session.get('token')}`;
        }
        return config;
    },
    (error) => {
        // 请求错误
        return Promise.reject(error);
    }
);

// 添加相应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code && res.code !== 0) {
            //
            if (res.code === 401) {
                Session.clear(); // 清除浏览器全部临时缓存
                router.push('/login'); // 去登录页面
                // resetRoute(); // 删除/重置路由
                ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
                    .then(() => {})
                    .catch(() => {});
            } else if (res.code === 1) {
                //请求错误
                ElMessage.error(res.message);
            }
            return Promise.reject(service.interceptors.response);
        } else {
            Session.set('token', res.token);
            return res.data;
        }
    },
    (error) => {
        // 对响应错误做点什么
        if (error.message.indexOf('timeout') != -1) {
            ElMessage.error('网络超时');
        } else if (error.message == 'Network Error') {
            ElMessage.error('网络连接错误');
        } else {
            if (error.response.data) ElMessage.error(error.response.statusText);
            else ElMessage.error('接口路径找不到');
        }
        return Promise.reject(error);
    }
);

// 导出 axios 实例
export default service;
