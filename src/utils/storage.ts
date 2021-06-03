// 1. window.localStorage浏览器永久缓存
export const Local = {
    // 设置永久缓存
    set(key: string, val: any) {
        window.localStorage.setItem(key, JSON.stringify(val));
    },
    // 获取永久缓存
    get(key: string) {
        let json: any = window.localStorage.getItem(key);
        return JSON.parse(json);
    },
    // 删除永久缓存
    remove(key: string) {
        window.localStorage.removeItem(key);
    },
    // 删除全部永久缓存
    clear() {
        window.localStorage.clear();
    },
};

// 2. window.sessionStorage 浏览器临时缓存
export const Session = {
    // 设置临时缓存
    set(key: string, val: any) {
        window.sessionStorage.setItem(key, JSON.stringify(val));
    },
    // 获取临时缓存
    get(key: string) {
        let json: any = window.sessionStorage.getItem(key);
        return JSON.parse(json);
    },
    // 删除临时缓存
    remove(key: string) {
        window.sessionStorage.removeItem(key);
    },
    // 删除全部临时缓存
    clear() {
        window.sessionStorage.clear();
    },
};
