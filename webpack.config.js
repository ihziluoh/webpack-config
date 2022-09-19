// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const isProduction = process.env.NODE_ENV == "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    // mpn install html-webpack-plugin 安装
    new HtmlWebpackPlugin({
        // 以 public/index.html 为模板创建文件
        // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
        template: path.resolve(__dirname, "./src/html/index.html"),
    }),
    new MiniCssExtractPlugin({})
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
          test: /\.html$/,
          // 使用html-loader处理html文件中引入的图片
          // html-loader是专门处理img图片,引入img,从而被url-loader处理
          loader:"html-loader"
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            //npm install sass-loader  
            loader: 'sass-loader'
          },
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            //npm install mini-css-extract-plugin
            loader: MiniCssExtractPlugin.loader,
          },
          {
            //npm install css-loader
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          }
        ]
      }
      ,
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
