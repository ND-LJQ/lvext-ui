/*
 * @Author: ND_LJQ
 * @Date: 2022-11-23 23:05:06
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-11-25 18:39:50
 * @Description:
 * @Email: ndliujunqi@outlook.com
 */
export default [
  {
    url: '/api/getUsers',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: {
          'weeks|53': [
            {
              'days|7': [
                {
                  'count|0-100': 0,
                  date: '2021-12-30',
                  'level|0-4': 0,
                },
              ],
            },
          ],
        },
      };
    },
  },
];
