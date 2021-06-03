import { defineConfig,UserConfigExport, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import type { UserConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
    '/@': pathResolve('/src/'),
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [
            vue(),
            viteMockServe({
                // default
                mockPath: 'mock',
                localEnabled: command === 'serve',
                supportTs: true,
            })
        ],
        resolve: {alias}
    }
}
// const viteConfig: UserConfig = {
//     plugins: [vue()],
//     resolve: { alias },
// };

// export default viteConfig;