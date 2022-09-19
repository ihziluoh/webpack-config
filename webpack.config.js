// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const isProduction = process.env.NODE_ENV == "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

const config = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean:true //清除上次打包内容文件
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
    new MiniCssExtractPlugin({
        // 定义输出文件名和目录
        filename: "static/css/main.css",
    }), //css 提取为单独文件

     // css压缩
     new CssMinimizerPlugin(), //css 压缩

     //检测 js 和 jsx 语法的工具
     //npm i eslint-webpack-plugin eslint -D

     new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
    }),
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
          },{
            //npm install css-loader
            loader: 'postcss-loader',
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
          },{
            //npm install css-loader
            loader: 'postcss-loader',
          }
        ]
      }
      ,
      {
        //处理视频音频格式
        test: /\.(mp4|MP4|mp3|avi|mov)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        type: "asset",
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/fonts/[hash:8][ext][query]",
        },
      },
      //图片处理
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        //asset/resource 相当于 file-loader  文件转化成 Webpack 能识别的资源，其他不做处理
        // asset 相当于url-loader 将文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI 形式
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        } 
        ,generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        //主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  performance: {
      maxAssetSize: 83886080, // 10M 资源(asset)是从 webpack 生成的任何文件。此选项根据单个资源体积(单位: bytes)
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
