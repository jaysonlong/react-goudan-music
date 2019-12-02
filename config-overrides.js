const { override, fixBabelImports, addWebpackModuleRule, babelExclude } = require('customize-cra');
const path = require('path');

module.exports = {
  webpack: override(
    (config) => {
      config.output.publicPath = "./";
      return config;
    },
    babelExclude([path.resolve("src/data")]),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
    addWebpackModuleRule({
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        // 自定义loader，通过媒体查询适配PC端
        path.resolve('src/loader/pc-css-adapter.js'),
        'less-loader',
      ],
    }),
  )
};