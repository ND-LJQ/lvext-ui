/*
 * @Author: ND_LJQ
 * @Date: 2022-12-02 16:10:37
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-03 11:22:18
 * @Description:
 * @Email: ndliujunqi@outlook.com
 */
module.exports = {
    // 采用cz自定义的提交规范 -> .cz-config.ts
    extends: ['cz'],
    // parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
        // 自定义规则
        'body-leading-blank': [1, 'always'],
        'body-max-line-length': [2, 'always', 100],
        'footer-leading-blank': [1, 'always'],
        'footer-max-line-length': [2, 'always', 100],
        'header-max-length': [2, 'always', 100],
        // 'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
        // 'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        // 'type-case': [2, 'always', 'lower-case'],
        // 'type-empty': [2, 'never'],
    },
};