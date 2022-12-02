/*
 * @Author: ND_LJQ
 * @Date: 2022-12-02 14:44:13
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-02 15:08:45
 * @Description:
 * @Email: ndliujunqi@outlook.com
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import lvext from './packages/index';
import './assets/main.css';

const app = createApp(App);

app.use(createPinia()).use(lvext);

app.mount('#app');
