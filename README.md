# ReactBlog 个人博客项目搭建


##  01 项目简介



博客前端界面的制作，前端主要完成功能是用户 的访问，文章列表和文章详情页面，因为Blog

前台需要SEO操作，选用Next.js框架服务端渲染，选用Ant Desgin 作为UI 交互库

> 用create-next-app 快速创建项目



没有使用过第一步需要先进行全局安装

npm install -g  create-next-app

先创建一个总目录，之后进入项目目录 

npx create-next-app blog

完成后可以用yarn dev 测试是否安装成功


# 02 项目搭建

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


# 03 公共头部  导航部分 

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







