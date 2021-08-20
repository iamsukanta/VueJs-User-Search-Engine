import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';
import axios from 'axios';

import '@/assets/scss/style.scss'

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
app.config.globalProperties.$axios = axios;

