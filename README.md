# Webpack 安装常用插件的配置文件

支持 html、css/sass/scss、js、音视频字体,支持多入口处理

运行:
```shell
npm install #更新依赖
npm run serve # 运行
npm run serve # 打包发布

```

安装插件包括:
```shell
npm i html-loader -d  # img标签包含的本地图片处理
npm i html-webpack-plugin -d # html文件解析

npm i css-loader -d # 解析css
npm i sass-loader -d # 解析scss
npm i postcss-loader postcss-px-to-viewport -d # css 单位转换 px->vmin
npm i mini-css-extract-plugin -d # css 文件提取为单独文件引入
npm i css-minimizer-webpack-plugin -d # css文件压缩

npm i eslint eslint-webpack-plugin -d # js编写规则检查
npm i babel-loader @babel/core @babel/preset-env -d  # ES6 语法编写的代码转换为向后兼容的 JavaScript 语法

```
