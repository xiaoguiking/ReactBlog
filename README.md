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