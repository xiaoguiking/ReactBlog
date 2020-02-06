# ReactBlog 个人博客项目搭建

## Bug
-  11 导航栏nav 对应的第一个有问题

###  01 项目简介

博客前端界面的制作，前端主要完成功能是用户 的访问，文章列表和文章详情页面，因为Blog

前台需要SEO操作，选用Next.js框架服务端渲染，选用Ant Desgin 作为UI 交互库

> 用create-next-app 快速创建项目



没有使用过第一步需要先进行全局安装

npm install -g  create-next-app

先创建一个总目录，之后进入项目目录 

npx create-next-app blog

完成后可以用yarn dev 测试是否安装成功


### 02 项目搭建

- 项目css   yarn add @zeit/next-css
- 新建 next.config.js
```
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```
- 引入 UI库  yarn add  antd 
- 按需加载 yarn add babel-plugin-import
- 新建  .babelrc
```
{
    "presets":["next/babel"],  //Next.js的总配置文件，相当于继承了它本身的所有配置
    "plugins":[     //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
        [
            "import",
            {
                "libraryName":"antd"
            }
        ]
    ]
}
```


### 03 公共头部  导航部分 

>  栅格化系统

- xs  < 576px  响应式栅格
- sm   >= 576px 
- md   >= 768px 
- lg   >= 992px  
- xl    >=1200px
- xxl   >= 1600px  

> Header 组件 加入 适配 

```
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <span className="header-logo">React Blog</span>
                <span className="header-txt">专注前端学习 HTML+Css+JavaScript</span>
            </Col>
```

### 04 主题首页的两栏布局

左右两栏布局完成，
复用组件，建立list.js， detailed.js



### 05 List 组件制作博客列表 左侧

index.js 中写入List组件完善，建立index.css

### 06 编写博主介绍组件  右侧

Author.js
author.css

### 07 编写通用广告组件

页面需要完善
Advert.js
advert.css

### 08 博客列表页面快制作 

- Footer 底部组件建立
- 面包屑导航

### 09 博客详情页面制作-1 编写页面基本结构

- detailed.js

### 10 博客详情页面制作-2  解析MarkDown 语法

- 引入markdown解析语法 (https://github.com/rexxars/react-markdown)
- yarn add react-markdown
```
import ReactMarkdown from 'react-down';

<ReactMarkdown 
    source={markdown} 
    escape={false} //  是转换html
/>
```
### 11博客页面制作-3 Markdown导航栏制作 ( 前台Blog 完成)

列表对应的导航栏

- yarn add markdown-navbar

```
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

<MarkNav 
    className="article-menu"        // 样式类名
    source={markdown}           // 起始源
    headingTopOffset={0}       // 锚点距离顶部的位置
    ordered={true}              // 显示数字编码，默认是显示的，也就是true，设置为false就不显示
/>
```

-  固钉Affix   是导航目录固定在页面

### 12中台搭建 egg.js 01）

介绍Egg.js(底层是koa2搭建)
Github地址：https://github.com/eggjs/egg
官方地址： https://eggjs.org/zh-cn/tutorials/index.html

####  特性
- 提供基于Egg定制上层框架的能力
- 高度可扩展的插件机制
- 内置多进程管理
- 基于koa开发，性能优异
- 框架稳定，测试覆盖率高
- 渐进式开发


####  搭建流程

- 根文件夹（ReactBlog）建立一个service 的中台文件夹
- 全局安装egg.js脚手架工具egg-init;
`
npm i egg-init-g
`
- 脚手架自动生成项目的基本结构
`
egg-init --type=simple
`
- 安装相关的依赖包
`
npm install
`
- 安装完成启动服务查看结果
`
npm run dev
open http://localhost:7001
`

### 13 中台搭建02  目录结构和约定规范

实现list demo
```
home.js

async list() {
    const { ctx } = this;
    ctx.body = '<h1>list 页面</h1>'；
}


router.js

router.get('/list',controller.home.list);

效果 http://127.0.0.1:7001/list
```


### 14中台搭建03 RESTFul api 设计和路由配置


有数据的获得和业务逻辑的操作都是通过中台实现的，也就是说中台只提供接口，这里的设计我们采用RESTful的规则，让egg为前端提供Api接口，实现中台主要的功能。

约束的请求方式和对应操作

- GET（SELECT）:从服务端获取资源，获取一项或者多项
- POST（ CREATE）: 在服务端新建资源创建
- PUT（UPDATE）:在服务端更新资源（客户端提供改变后的完整资源）
- DELETE（DELETE）： 从服务器删除资源

在 controller下建立admin    default   （home.js)
同级目录下建立router文件夹 包含 admin.js   default.js  

```
router default.js

module.exports =  app => {
    const {router, controller}  = app;
    router.get('/default/index',controller.default.home.index);
}
```

```
router.js    路由汇总引入

module.exports = app => {
    require('/router/default')(app);
}
```

### 15：中台搭建04-Egg.js中连接mysql数据库(安装环境有坑点)

Egg.js 中使用mysql数据库

> egg-mysql模块安装

- npm i egg-mysql --save  或者 yarn add egg-mysql
- 插件配置 /server/config/plugin.js
```
exports.mysql = {
    enable: true,
    package: 'egg-mysql'
}
```
>  数据库连接配置

```
打开/config/config/default.js 写好下面的配置
（https://www.npmjs.com/package/egg-mysql）
首先安装mqsql的服务器或者主机， 目前使用的是phyStudy 集成开发环境

注意: 把exports 改成config
exports.mysql = {
  // database configuration
  client: {
    // host 修改
    host: 'mysql.com',
    // port
    port: '3306',
    // username  修改
    user: 'test_user', 
    // password  修改
    password: 'test_password',
    // database  修改 注意 一定要和数据库名字对应填写
    database: 'test',    
  },
  // load into app, default is open
  app: true,
  // load into agent, default is close
  agent: false,
};
```
>  创建数据库

- 打开PHPStudy 点击 mysql管理器 点击 Mysql-front
-  新建数据库 react_blog
-  新建数据表 blog_content
-  数据表下添加字段： title， type用  VarChar，introduce， content 用 text

>  使用get 进行表的查询

打开 /app/controller/default/home.js 改写index 方法
```
打开测试http://127.0.0.1:7001/default/index
```


### 第25节：后台开发1-开发环境搭建



\- 建立后台脚手架 



  *> create-react-app admin*

\- 进入admin文件夹里面， 安装antd UI 框架

  *> yarn add antd*



*> 安装bug（坑点）*

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
