This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### 第25节：后台开发1-开发环境搭建



- 建立后台脚手架 

  > create-react-app admin*

- 进入admin文件夹里面， 安装antd UI 框架

  > yarn add antd*


> 安装bug（坑点）*

    
> bug01

```
A template was not provided. This is likely because you're using an outdated version of create-react-app.

Please note that global installs of create-react-app are no longer supported.

当时只有package.json 等文件，文件不全

解决方案
npm uninstall -g create-react-app （进行卸载）

```
> bug2 使用上述命令删除不干净文件夹直接使用npx 创建
```
npm ERR! code ENOLOCAL
npm ERR! Could not install from "Files\nodejs\node_cache\_npx\17244" as it doesnot contain a package.json file.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Program Files\nodejs\node_cache\_logs\2018-10-24T06_13_21_695Z-debug.log
安装 prefix@latest 失败，错误代码：1
npm ERR! code ENOLOCAL
npm ERR! Could not install from "Files\nodejs\node_cache\_npx\15084" as it doesnot contain a package.json file.

解决方案：
删除对应的node.js 文件里面全局安装的create-react-app 文件夹在写 以下命令
npm install -g create-react-app 
create-react-app myApp
```

- 通过 npx 创建：

        npx create-react-app my-app

- 通过 npm 创建：

npm init react-app my-app

- 通过 yarn(0.25+) 创建：

    yarn create react-app my-app

> 其他修改细节
只留下/src/index.js文件，然后把里边的代码删减成下面的样子
```
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));
```


### 第26节：后台开发2-页面路由配置

- 安装路由管理包 
    > yarn add react-router-dom
- src 建立Pages文件夹 包含Login.js  Main.js
- 在Main.js 建立路由并且抛出到 index.js

### 第27节：后台开发3-登录页面UI制作

src/static/css/Login.css

`import { Card, Input, Icon,Button ,Spin } from 'antd';`
引入Spin 加载组件
isLoading主要用于控制Spin组件是否进入加载状态，进入加载状态可以有效防止重复提交


### 第28节：后台开发4-UI框架的Layout搭建

> Layout 布局

API地址：https://ant.design/components/layout-cn/

这步完成后，还需要在/src/static/css文件夹下建立一个AdminIndex.css文件，复制下面的代码
本结主要是将class有状态组件变成hooks函数式组件的改写


### 第29节：后台开发5-添加文章页面制作1