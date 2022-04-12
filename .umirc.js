import pkg from './package.json'
import { defineConfig } from 'dumi'
const fillPrefix = filePath => {
  const prefix = process.env.NODE_ENV === 'production' ? '/react-hooks/' : '/';
  return typeof filePath === 'string' ? prefix + filePath : '';
};
const repo = 'chooks'

export default defineConfig({
  mode: 'site',
  // base: `/${repo}/`,
  publicPath: `/${repo}/`,
  title: repo,
  description: pkg.description,
  favicon: '/logo.png',
  logo: fillPrefix('logo.png'),
  outputPath: '_docs',
  theme: {
    '@primary-color': '#31c27c',
  },
  exportStatic: {},
  resolve: {
    includes: ['docs', 'src'],
  },
  locales: [
    ['en-US', 'English'],
    ['zh-CN', '中文'],
  ],
  navs: {
    'zh-CN': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/ChocolateUI/chocolate-hooks',
      },
    ],
    'en-US': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/ChocolateUI/chocolate-hooks',
      },
    ],
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'chocolate-ui',
        libraryDirectory: 'dist/components',
        style: true,
        camel2DashComponentName: false,
      },
    ],
  ],
  // extraBabelPlugins: [
  //   [
  //     'babel-plugin-import',
  //     {
  //       libraryName: 'antd',
  //       libraryDirectory: "lib",
  //       style: true
  //     }
  //   ],
  // ],
  // more config: https://d.umijs.org/config
})

// 样式覆盖：https://github.com/fi3ework/blog/issues/44
