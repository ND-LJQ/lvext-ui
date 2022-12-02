/*
 * @Author: ND_LJQ
 * @Date: 2022-11-26 14:58:52
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-02 15:26:40
 * @Description: 导出单个组件或组件库
 * @Email: ndliujunqi@outlook.com
 */
import type { App } from 'vue';
import components from './components';

export * from './components';

const install = (app: App) => {
  components.map(component => app.component(component.__name as string, component));
};

export default {
  install,
};
