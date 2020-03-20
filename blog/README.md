# blog（前台页面）




### ReactBlog目录


- [01项目简介](###01项目简介)
- [02项目搭建](###02项目搭建)
- [03公共头部导航部分](###03公共头部导航部分)
- [04主题首页的两栏布局](###04主题首页的两栏布局)
- [05List组件制作博客列表左侧](###05List组件制作博客列表左侧)
- [06编写博主介绍组件右侧](###06编写博主介绍组件右侧)
- [07编写通用广告组件](###07编写通用广告组件)
- [08博客列表页面快制作](###08博客列表页面快制作)
- [09博客详情页面制作-1编写页面基本结构](###09博客详情页面制作-1编写页面基本结构)
- [10博客详情页面制作-2解析MarkDown语法](###10博客详情页面制作-2解析MarkDown语法)
- [11博客页面制作-3 Markdown导航栏制作(前台Blog完成)](###11博客页面制作-3Markdown导航栏制作(前台Blog完成))
- [12中台搭建 egg.js(01service)](###12中台搭建egg.js(01service))
- [13中台搭建02  目录结构和约定规范](###13中台搭建02目录结构和约定规范)
- [14中台搭建03RESTFulapi设计和路由配置](###14中台搭建03RESTFulapi设计和路由配置)
- [15中台搭建04-Egg.js中连接mysql数据库(安装环境有坑点)](###15中台搭建04-Egg.js中连接mysql数据库(安装环境有坑点))
- [第16节中台搭建5-数据库设计和首页文章接口编写(bug修复)](###第16节中台搭建5-数据库设计和首页文章接口编写(bug修复))
- [第17节前中台结合1-前台读取首页文章列表(bug点)](###第17节前中台结合1-前台读取首页文章列表(bug点))
- [第18节前中台结合2-文章详细页面接口制作(通过id跳转到指定的详情页)](###第18节前中台结合2-文章详细页面接口制作(通过id跳转到指定的详情页))



### 01项目简介

博客前端界面的制作，前端主要完成功能是用户 的访问，文章列表和文章详情页面，因为Blog

前台需要SEO操作，选用Next.js框架服务端渲染，选用Ant Desgin 作为UI 交互库

> 用create-next-app 快速创建项目



没有使用过第一步需要先进行全局安装

npm install -g  create-next-app

先创建一个总目录，之后进入项目目录 

npx create-next-app blog

完成后可以用yarn dev 测试是否安装成功



### 02项目搭建

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



### 03 公共头部导航部分 

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



### 05 List 组件制作博客列表左侧

index.js 中写入List组件完善，建立index.css



### 06 编写博主介绍组件右侧

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

> bug
>
> 导航栏nav 对应的第一个有问题



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

- 固钉Affix   是导航目录固定在页面

  

### 12中台搭建 egg.js( 01）service



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



### 15中台搭建04-Egg.js中连接mysql数据库(安装环境有坑点)

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



### 第16节中台搭建5-数据库设计和首页文章接口编写(bug 修复)

数据库建立设计

> 数据库中的表建立

直接使用MySQL-front工具建立使用的表，建立两张表type和article表，表结构如下:

type表（文章类型表）

- id : 类型编号 int类型
- typeName: 文章类型名称 varchar类型
- orderNum: 类型排序编号 int类型
- 建立好表之后，我们再写入一条数据，编号为1，名称是视频教程，排列需要为1

article表（文章内容表）

- id : 文章编号 int类型
- type_id : 文章类型编号 int类型
- title : 文章标题，varchar类型
- article_cointent : 文章主体内容，text类型
- introduce： 文章简介，text类型
- addTime : 文章发布时间，int(11)类型
- view_count ：浏览次数， int类型

在/app/contoller/default/home.js文件夹中，写一个getArticleList的方法，

```

```

需要配置一下路由（router），打开/app/router/default.js,新建立一个get形式的路由配置，代码如下：
```
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index)
  router.get('/default/getArticleList', controller.default.home.getArticleList)
}

```

> bug

```
写法报错
this.ctx.body = {
    data: results;
}

改为 
this.ctx.body = results;
```

http://127.0.0.1:7001/default/getArticleList。如果能出现结果，说明我们已经完成了数据和接口的开发。

```
{
"data": [
{
"id": 1,
"title": "React01",
"introduce": "入我相思门，知我相思苦。相识相见知何日，此时此夜难为情。\n\n情到深处人孤独，爱到无语，痛到泪流。假如人生不曾相逢，我不过是浩渺天地的一粒微尘，湮没在茫茫人海中。\n\n依旧是那个为了生活，日夜奔波忙忙碌碌的我，只因为遇见了你，我的生命才有了美丽的传奇。\n\n是你给了我痛苦，也给了我甜蜜，给了我幻想，也给了我绝望！如果有来生，我们会不会再重逢？不负如来不负卿！",
"addTime": 1213,
"view_count": 0,
"typeName": null
},
{
"id": 2,
"title": "React02",
"introduce": null,
"addTime": 123123,
"view_count": 1,
"typeName": null
}
]
}

```



### 第17节：前中台结合1-前台读取首页文章列表（bug点）

> bug  前台和中台关于数据请求结构问题

安装 axios

- cd blog 进入blog 文件夹(前台)
- yarn add axios 数据请求

>  新建getInitialProps 方法获取数据
/blog/pages/index.js
```
    Home.getInitial = async() => {
        const promise = new Promise((resolve) => {
            axios('http://127.0.0.1:7001/default/getArticleList').then((resolve)=> {
                console.log(res.data,'=============>请求数据');
                resolve(res.data);
            })
            .catch((error)=> {console.log(error+'请求数据报错');})
        })
        return await promise;
    }
```

> 把数据放到页面上

```
const Home = (list) =>{

  console.log(list)
  //---------主要代码-------------start
  const [ mylist , setMylist ] = useState( list.data);
  //---------主要代码-------------end
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>

              <List
                header={<div>最新日志</div>}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>

                    <div className="list-title">{item.title}</div>
                    <div className="list-icon">
                      <span><Icon type="calendar" /> {item.addTime}</span>
                      <span><Icon type="folder" /> {item.typeName}</span>
                      <span><Icon type="fire" /> {item.view_count}人</span>
                    </div>
                    <div className="list-context">{item.introduce}</div>  
                  </List.Item>
                )}
              />  

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer/>

   </>
  )

} 
```

> 修改时间戳为日期格式

`service/app/controller/default/home.js`

```
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
	  // 原代码
      // 'article.addTime as addTime,' +
	  // 新代码修改 时间戳为日期格式
	  "From_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s')as addTime,"+
      'article.view_count as view_count ,' +
      '.type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id';

    const results = await this.app.mysql.query(sql);
    //  前台数据交互可能出现问题点
    this.ctx.body = { data: results };
```






### 第18节前中台结合2-文章详细页面接口制作  (通过id跳转到指定的详情页)

>  编写中台详细接口

页面： `servie/app/controller/default/home.js`
```
获取指定的id详情页方法
  async getArticleById(){
	   //先配置路由的动态传值，然后再接收值
	  let id = this.ctx.params.id;
	  let sql = 'SELECT article.id as id,'+
	         'article.title as title,'+
	         'article.introduce as introduce,'+
			 // 文章内容
	         'article.article_content as article_content,'+
	         "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
	         'article.view_count as view_count ,'+
	         'type.typeName as typeName ,'+
			 // 文章id查询
	         'type.id as typeId '+
	         'FROM article LEFT JOIN type ON article.type_id = type.Id '+
	         'WHERE article.id='+id
	 
			const result = await this.app.mysql.query(sql);
			this.ctx.body = {data: result}  
	 
  }

```


>  添加详情接口路由

页面： `service/app/router/default.js`
```
router.get('default/getArticleById', controller.default.home.getArticleById);
```


> 编写前台导航链接

页面  `blog/pages/index.js`

```
import Link from 'next/link';
				  <div className="list-title">
				  <Link href={{pathname:'/detailed', query:{id: item.id}}}>
				  <a>{item.title}</a>
				  </Link>
				  </div>
```


> 详情页从接口获取数据

页面：`blog/pages/index.js`

```
//  获取id详情的方法
Detailed.getInitialProps = async (context) => {
	console.log(context.query.id);
	
	let id = context.query.id;
	const promise = new Promise((resolve) => {
		axios('http://127.0.0.1:7001/default/getArticleById').then((res)=> {
			console.log(res,'res');
			resolve(res.data.data[0]);
		})
	})
	return await promise;
}
```



> 跨域问题

![](https://github.com/xiaoguiking/ReactBlog/blob/master/gitImages/image-20200211204536329.png)

