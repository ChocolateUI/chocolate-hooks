import pkg from './package.json'
import { defineConfig } from 'dumi';

const repo = 'chocolate-hooks';

export default defineConfig({
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  title: repo,
  description: pkg.description,
  favicon: '/logo.png',
  logo: './logo.png',
  outputPath: '_docs',
  theme: {
    '@primary-color': '#31c27c',
  },
  exportStatic: {},
  resolve: {
    includes: ['docs', 'src'],
  },
  navs: [
    {
      title: 'Hooks',
      path: '/hooks',
    },
    {
      title: 'github',
      path: 'https://github.com/ChocolateUI/chocolate-hooks',
    },
  ],
  // extraBabelPlugins: [
  //   [
  //     'babel-plugin-import',
  //     {
  //       libraryName: 'chocolate-ui',
  //       libraryDirectory: "dist/components",
  //       style: true
  //     }
  //   ],
  // ],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: "lib",
        style: true
      }
    ],
  ],
  // more config: https://d.umijs.org/config
});
// antd/lib/button/style
// chocolate-ui/dist/index.css
