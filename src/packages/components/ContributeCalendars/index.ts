/*
 * @Author: ND_LJQ
 * @Date: 2022-11-26 23:34:31
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-02 15:25:41
 * @Description:
 * @Email: ndliujunqi@outlook.com
 */
import type { App } from 'vue';
import ContributeCalendars from './src/ContributeCalendars.vue';

// ContributeCalendars.__name = 'ContributeCalendars';

ContributeCalendars.install = (app: App) => {
  app.component(ContributeCalendars.__name as string, ContributeCalendars);
  return app;
};

export default ContributeCalendars;
