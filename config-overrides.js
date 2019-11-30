const path = require('path');

// console.log(path.resolve(__dirname, 'src', 'app.js'))
// process.exit()

const { override, fixBabelImports, addWebpackModuleRule } = require('customize-cra');

module.exports = {
  webpack: override(
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