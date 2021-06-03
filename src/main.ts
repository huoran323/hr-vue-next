import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '/@/theme/index.scss';

const app = createApp(App);
app.use(router)
    .use(store, key)
    .use(ElementPlus)
    .mount('#app');
