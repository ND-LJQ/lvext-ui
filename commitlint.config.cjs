/*
 * @Author: ND_LJQ
 * @Date: 2022-12-02 16:10:37
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-02 20:12:34
 * @Description:
 * @Email: ndliujunqi@outlook.com
 */
module.exports = {
  // 采用cz自定义的提交规范 -> .cz-config.ts
  extends: ['@commitlint/config-conventional'],
  // parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    // 自定义规则
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
  prompt: {
    questions: {
      type: {
        description: '选择要提交的更改类型',
        enum: {
          feat: {
            description: '新增内容',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'bug修复',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '只修改文档',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '不影响代码含义的更改(空白、格式化、缺少分号等)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '既不修复bug也不添加特性的代码更改',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '改进性能的代码更改',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '添加缺失的测试或修改现有的测试',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: '影响构建系统或外部依赖的更改(示例范围:gulp、broccoli、npm)',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              '对CI配置文件和脚本的更改(示例范围:Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: '其他不修改src或测试文件的更改',
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: '返回以前的提交',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: '更改的范围是什么(例如组件或文件名)',
      },
      subject: {
        description: '写一个简短的、祈使时态的变更描述',
      },
      body: {
        description: '提供更长的变更描述',
      },
      isBreaking: {
        description: '有什么突破性的变化吗?',
      },
      breakingBody: {
        description: '突破性的变更提交需要一个主体。请输入提交本身的较长描述',
      },
      breaking: {
        description: '描述突破性的变化',
      },
      isIssueAffected: {
        description: '这个变化是否影响到任何未解决的问题?',
      },
      issuesBody: {
        description: '如果问题被关闭，提交就需要一个主体。请输入提交本身的较长描述',
      },
      issues: {
        description: '添加问题引用(例如:“fix #123”，“re #123”等)',
      },
    },
  },
};
