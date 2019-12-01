const path = require('path');
const { override, fixBabelImports, addWebpackModuleRule, babelExclude } = require('customize-cra');

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
        'less-loader']
    }),
  )
};