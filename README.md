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

### 12中台搭建 egg.js

介绍Egg.js(底层是koa2搭建)
Github地址：https://github.com/eggjs/egg
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