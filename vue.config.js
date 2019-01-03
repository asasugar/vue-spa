/* 配置文件 */
const path = require("path");
const Package = require("./package");
const AutoDllWebpackPlugin = require('autodll-webpack-plugin');

module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
  outputDir: "dist",
  indexPath: "index.html",
  lintOnSave: false,
  runtimeCompiler: false,
  transpileDependencies: [], //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  productionSourceMap: false,
  css: {
    modules: false,
    sourceMap: false,
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },
  devServer: {
    port: Package.port,
    open: true,
    proxy: {
      "/api": {
        target: "<url>",
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // loader
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
    // plugin
    config
      .plugin('html')
      .tap(args => {
        // 加入新的选项，保留原有的
        args[0].inject = true
        return args
      })
    config
      .plugin('autoDll')
      .use(AutoDllWebpackPlugin)
      .tap(args => {
        return [{
          inject: true, // will inject the DLL bundle to index.html
          debug: true,
          path: './dll',
          filename: '[name].[hash].js',
          entry: {
            vendor: [
              'vue',
            ]
          }
        }]
      })
  }
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/utils/css/CONST.scss")]
    });
}