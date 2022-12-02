/*
 * @Author: ND_LJQ
 * @Date: 2022-12-02 16:06:52
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-02 18:38:08
 * @Description:
 * @Email: ndliujunqi@outlook.com
 */
'use strict';
// module.exports = {
//   types: [
//     { value: '✨新增', name: '新增:    新的内容' },
//     { value: '🐛修复', name: '修复:    修复一个Bug' },
//     { value: '📝文档', name: '文档:    变更的只有文档' },
//     { value: '💄格式', name: '格式:    空格, 分号等格式修复' },
//     { value: '♻️重构', name: '重构:    代码重构，注意和特性、修复区分开' },
//     { value: '⚡️性能', name: '性能:    提升性能' },
//     { value: '✅测试', name: '测试:    添加一个测试' },
//     { value: '🔧工具', name: '工具:    开发工具变动(构建、脚手架工具等)' },
//     { value: '⏪回滚', name: '回滚:    代码回退' },
//   ],
//   scopes: [
//     { name: 'leetcode' },
//     { name: 'javascript' },
//     { name: 'typescript' },
//     { name: 'Vue' },
//     { name: 'node' },
//   ],
//   // it needs to match the value for field type. Eg.: 'fix'
//   /*  scopeOverrides: {
//     fix: [
//       {name: 'merge'},
//       {name: 'style'},
//       {name: 'e2eTest'},
//       {name: 'unitTest'}
//     ]
//   },  */
//   // override the messages, defaults are as follows
//   messages: {
//     type: '选择一种你的提交类型:',
//     scope: '选择一个scope (可选):',
//     // used if allowCustomScopes is true
//     customScope: 'Denote the SCOPE of this change:',
//     subject: '短说明:\n',
//     body: '长说明，使用"|"换行(可选)：\n',
//     breaking: '非兼容性说明 (可选):\n',
//     footer: '关联关闭的issue，例如：#31, #34(可选):\n',
//     confirmCommit: '确定提交说明?(yes/no)',
//   },
//   allowCustomScopes: true,
//   allowBreakingChanges: ['特性', '修复'],
//   // limit subject length
//   subjectLimit: 100,
// };

module.exports = {
  types: [
    { value: 'init', name: 'init:     初始提交' },
    { value: 'feat', name: 'feat:     增加新功能' },
    { value: 'fix', name: 'fix:      修复bug' },
    { value: 'ui', name: 'ui:       更新UI' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    { value: 'release', name: 'release:  发布' },
    { value: 'deploy', name: 'deploy:   部署' },
    { value: 'docs', name: 'docs:     修改文档' },
    { value: 'test', name: 'test:     增删测试' },
    { value: 'chore', name: 'chore:    更改配置文件' },
    { value: 'style', name: 'style:    样式修改不影响逻辑' },
    { value: 'revert', name: 'revert:   版本回退' },
    { value: 'add', name: 'add:      添加依赖' },
    { value: 'minus', name: 'minus:    版本回退' },
    { value: 'del', name: 'del:      删除代码/文件' },
  ],
  scopes: [
    { name: 'components' },
    { name: 'utils' },
    { name: 'styles' },
    { name: 'deps' },
    { name: 'other' },
  ],
  messages: {
    type: '选择更改类型:\n',
    // 如果allowcustomscopes为true，则使用
    scope: '选择一个 scope（可选）：\n',
    customScope: '请输入自定义的 scope：',
    subject: '简短描述:\n',
    body: '详细描述. 使用"|"换行:\n',
    breaking: 'Breaking Changes列表:\n',
    footer: '关闭的issues列表. E.g.: #31, #34:\n',
    confirmCommit: '确认提交?',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
};
