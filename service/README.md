# service （中台）



## QuickStart



see [egg docs][egg] for more detail.

### Development

```bash
$ npm i            yarn
$ npm run dev	   yarn  dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start  
$ npm stop
```



### 12 中台搭建 egg.js( 01）service



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



### 第14节：中台搭建03 RESTFul api 设计和路由配置


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



### 第15节： 中台搭建04-Egg.js中连接mysql数据库(安装环境有坑点)

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
- 新建数据库 react_blog
- 新建数据表 blog_content
- 数据表下添加字段： title， type用  VarChar，introduce， content 用 text

>  使用get 进行表的查询

打开 /app/controller/default/home.js 改写index 方法

```
打开测试http://127.0.0.1:7001/default/index
```



### 第16节：中台搭建5-数据库设计和首页文章接口编写(bug 修复)

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
async getArticleList(){

   let sql = 'SELECT article.id as id,'+
             'article.title as title,'+
             'article.introduce as introduce,'+
             'article.addTime as addTime,'+
             'article.view_count as view_count ,'+
             '.type.typeName as typeName '+
             'FROM article LEFT JOIN type ON article.type_id = type.Id'

    const results = await this.app.mysql.query(sql)

    this.ctx.body={
        data:results
    }
}
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



### 第17节：前中台结合1-前台读取首页文章列表（bug 点）

> bug  前台和中台关于数据请求结构问题

安装 axios

- cd blog 进入blog 文件夹(前台)
- yarn add axios 数据请求

>  新建getInitialProps 方法获取数据
>  /blog/pages/index.js

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






### 第18节：前中台结合2-文章详细页面接口制作  (通过id跳转到指定的详情页)

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

### 第19节：解决Egg.js跨域问题和Bug调试（重点 注意问题出在中台  403）

> 安装egg-cors  中台解决跨域



- 安装使用`yarn add egg-cors`（如果npm也报错使用 `npm i egg-cors --save`）

- 配置模块引入文件  `service/config/plugin.js`

  ```
  exports.cors: {
      enable: true,
      package: 'egg-cors'
  }
  ```

- 配置允许域名请求方法跨域访问

  ```
  　config.security = {
  　　　　csrf: {
  　　　　　　enable: false
  　　　　},
  　　　　domainWhiteList: [ '*' ]
  　　};
   config.cors = {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  ```

  ```
  如果只是想让3000 接口方案  使用下面的配置
  config.security = {
  　　　　csrf: {enable: false},
  　　　　domainWhiteList: [ '*' ]
  　　};
    config.cors = {
      origin: 'http://localhost:3000', //只允许这个域进行访问接口
      credentials: true,   // 开启认证
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
      };
  ```

  

- 配置id 传值方法，页面： `service/app/controller/default/home.js`

  ```
    //  通过id传值的方法
    async getArticleById() {
      // 先配置路由的动态传值，然后再接收值
      let id = this.ctx.params.id;
  
      let sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduce as introduce,' +
        'article.article_content as article_content,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
        'article.view_count as view_count ,' +
        'type.typeName as typeName ,' +
        'type.id as typeId， ' +
        'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
        'WHERE article.id=' + id;
  
  
      const result = await this.app.mysql.query(sql);
  
  
      this.ctx.body = { data: result };
  
    }
  ```

  

- 配置传值id 对应的路由

  ```
  // 根据id 传值配置的路由
    router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
  ```

  

- 前台部分配置  `blog/pages/detailed.js`

  ```
  	axios(`http://127.0.0.1:7001/default/getArticleById/${id}`)
  ```

  

### 第20节：重构前台博客详细页面1-marked+highlight.js



>  安装marked 和 highlight

打开终端， cd blog 目录  下面的命令进行安装

```
yarn add marked
yarn add highlight.js
```



> 重构 `blog/pages/detailed.js`

目前重构主要是替换以前的Markdown 解决方案， 在代码页面部分引用刚才安装的 marke和highlight

.js 模块

引入模块（注意高亮需要一起引入css）

```
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
```

引入设置·`marked.setOptions`,  详情介绍 属性

```
const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypans: false,
  highlight: function(code){   // 直接设置高亮显示代码
  	return hljs.highlightAuto(code).value;
  }
});
let html = marked(props.article_count);


```



- renderer: 这个是必须填写的，你可以通过自定义的`Renderer`渲染出自定义的格式
- gfm：启动类似Github样式的Markdown,填写true或者false
- pedatic：只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
- sanitize: 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
- tables： 支持Github形式的表格，必须打开gfm选项
- breaks: 支持Github换行符，必须打开gfm选项，填写true或者false
- smartLists：优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
- highlight: 高亮显示规则 ，这里我们将使用highlight.js来完成



>  修改了 detailed.css  样式



> Bug   



![](https://github.com/xiaoguiking/ReactBlog/blob/master/gitImages/image-20200214170912672.png)



```
分析点：
  <div className="detailed-content"  dangerouslySetInnerHTML={{html}} >
              {html}
  </div>
  加入dangerouslySetInnerHTML 报错
  
  
  解决
  <div dangerouslySetInnerHTML={{__html:html}}>
  </div>
```





### 第21节：重构前台博客详细页面2-文章导航



重构后前台详细页的文章导航出现了错误提示，主要是选择markdown-navbar 模块的问题，直接启用新插件

 

> tocify.tsx 文件简介

`typeScript`语法编写jsx部分，使用的是`tsx`  的扩展名。

使用此文件的两个必要条件

	 1. 程序中使用Ant design UI 库，里面的导航部分，使用了antd的Anchor 组件
  	 2. 安装lodash 模块（工具库）， 直接使用`yarn add lodash`安装

页面： `/blog/components/tocify.tsx`

```
import React from 'react';
import { Anchor } from 'antd';
import { last } from 'lodash';

const { Link } = Anchor;

export interface TocItem {
  anchor: string;
  level: number;
  text: string;
  children?: TocItem[];
}

export type TocItems = TocItem[]; // TOC目录树结构

export default class Tocify {
  tocItems: TocItems = [];

  index: number = 0;

  constructor() {
    this.tocItems = [];
    this.index = 0;
  }

  add(text: string, level: number) {
    const anchor = `toc${level}${++this.index}`;
    const item = { anchor, level, text };
    const items = this.tocItems;

    if (items.length === 0) { // 第一个 item 直接 push
      items.push(item);
    } else {
      let lastItem = last(items) as TocItem; // 最后一个 item

      if (item.level > lastItem.level) { // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 2; i++) {
          const { children } = lastItem;
          if (!children) { // 如果 children 不存在
            lastItem.children = [item];
            break;
          }

          lastItem = last(children) as TocItem; // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) { // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item);
            break;
          }
        }
      } else { // 置于最顶级
        items.push(item);
      }
    }

    return anchor;
  }

  reset = () => {
    this.tocItems = [];
    this.index = 0;
  };

  renderToc(items: TocItem[]) { // 递归 render
    return items.map(item => (
      <Link key={item.anchor} href={`#${item.anchor}`} title={item.text}>
        {item.children && this.renderToc(item.children)}
      </Link>
    ));
  }

  render() {
    return (
      <Anchor affix showInkInFixed>
         {this.renderToc(this.tocItems)}
      </Anchor>
    );
  }
}
```



> 使用tocify.tsx  生成文章目录

页面:  `/blog/pages/detailed.js`

```
引入 指定模块
import Tocify from '../compontents/tocify.tsx';

引入后需要对marked 的渲染进行自定义 设置renderer.heading (写一个方法重新定义# 标签的解析)

const tocify = new Tocify();
renderer.heading = function(text, level, raw) {
	const anchor = tocify.add(text, level);
	return `<a id=${anchor} href="#${anchor}" class="anchor-fix"><h${level}>{$text}</h${level}></a>\n`;
}

最后在HTML 代码部分写出
 <div className="toc-list">
        {tocify && tocify.render()}
  </div>
```



> Bug  导航过程写入没有效果？ 注意放置的位置 具体原因？？？？？？？？？？？？？？？？



```
  const renderer = new marked.Renderer();
  
  // 导航栏目方法写入 tocify 
  const tocify = new Tocify();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id={$anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }

```



### 第22节：前台文章列表也的制作-接口制作 （编写统一中台API配置文件 Header 组件）



>  编写统一中台API 配置文件

新建页面  `/blog/config/apiUrl.js`

```
const ipUrl = 'http://127.0.0.1:7001/default/';
const servicePath = {
	getArticleList: ipUrl + 'getArticleList',  // 首页文章列表接口   list
	getArticleById: ipUrl + 'getArticleById/',   //  详细文章接口页 需要接受参数   detailed 
	getTypeInfo: ipUrl + 'getTypeInfo',
}

export default servicePath;
```



> 更换详情页案例实例

页面： `blog/pages/detailed.js`

```
// 先进行引入
import servicePath from '../config/apiUrl';

// 引入后进行修改 （注意id参数）
Detailed.getInitialProps = async(context) => {
	console.log(context.query.id);
	let id = context.query.id;
	const promise = new Promise((resolve) => {
		axios(servicePath.getArticleById + id).then((res)=> {
			// console.log(title);
			resolve(res.data.data[0]);
		})
	})
	return await promise;

}

```



> 修改首页接口 读取文章类别信息

希望每个页面只读取一次接口，然后服务端渲染好展示给我们，这时候就需要在首页的`getArticleList` 接口修改

文件位置 `/service/app/default/home.js`

```
修改代码如下：

// 得到类别名称和编号
async getTypeInfo(){
	const result = await this.app.mysql.select('type');
	this.ctx.body = {data: result};
}
```

配置 文章列表信息路由

页面： `service/router/default.js`

```
router.get('default/getTypeInfo', controller.default.home.getTypeInfo);
```



接口编写变成，就可以在`<Header/>` 中使用



> 修改数据库

图标存入数据库

打开mysql管理， 加入icon字段（varChar）

- 视频教程 youtube

- 信息前沿 message

- 生活快乐 smile

  

有了图标字段并且有值之后再次修改 `<Header>` 组件， 加入图标的部分，加入博客首页上去



>  **修改Header组件**

以前 `Header` 组件是写死的，（静态），利用useEffect（）方法 从接口 动态获取数据

```
import React,{useState, useEffect} from 'react';
import Router from 'next/router';
import axios from 'axios';
import servicePath from '../config/apiUrl';
```

```
引入后用useState 声明navArray  使用useEffect 获取 远程数据
const [navArray, setNavArray] = useState([]);
useEffect(() => {
	const fetchData = async () => {
		const result = await axios(servicePath.getTypeInfo).then((res) => {
			return res.data.data;
		})
		setNavArray(result);
	}
	fetchData();
}, [])
```

useEffect()  写完后，可以获得博客的分类信息， 实现分类信息跳转的方法 handleClick

```
// 跳转到列表页
const handleClick = （e）=> {
	if(e.key == 0) {
		Router.push('/index')
	}else {
		Router.push('/list?id='+ e.key);
	}
}
```



> **Menu 组件部分**

```
       <Menu mode="horizontal" onClick={handleClick}>
       <Menu.Item key="0"><Icon type="home" />首页</Menu.Item>
       {
        navArray.map((item) => {
            return (
                <Menu.Item key={item.Id}><Icon type={item.icon} />{item.typeName}</Menu.Item>
            )
        })
       }
       </Menu>
```



###  第23节：前台文章列表页的制作2-界面制作



> 编写根据类别ID 获取文章列表 接口

页面位置：`service/app/default/home.js`

```
根据列类别ID获取 文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };

  }
```

> 中台为其配置路由

页面: `service/router/default.js`

```
router.get('/default/getListById/:id', controller.default.home.getListById);
```

> 前台 API 统一管理文件

页面： `blog/config/apiUrl.js`

```
let servicePath = {
	getListById: ipUrl + 'getListById',  根据类别Id获得文章列表
}
```

> 编写前台UI 界面  (请求数据)

页面： `blog/pages/list.js`

```
import servicePath from '../config/apiUrl.js';
import axios from 'axios';
import Link from 'next/link';

// 直接使用 getInitialProps 在接口中获取数据

ArticleList.getInitialProps = async (context) =>{
	let id = context.query.id;
	const promise = new Promise((resolve) => {
	 axios(servicePath.getListById + id).then(
	 (res) => resolve(res.data))
	})
	return await promise;
}

const MyList  = list =>  {
  const [myList, setMylist] = useState(list.data);
  useEffect(() => {
  	setMylist(list.data);
  })
  
  
  <List
    itemLayout="vertical"
    dataSource={mylist}
    renderItem={item => (
      <List.Item>
        <div className="list-title">
            <Link href={{pathname:'/detailed',query:{id:item.id}}}>
            <a>{item.title}</a>
          </Link>
        </div>
        <div className="list-icon">
          <span><Icon type="calendar" />{item.addTime}</span>
          <span><Icon type="folder" /> {item.typeName}</span>
          <span><Icon type="fire" />  {item.view_count}人</span>
        </div>
        <div className="list-context">{item.introduce}</div>  
      </List.Item>
    )}
  />  
  
}


```



###   第24节：让前台所有页面支持Markdown （）



- 前台页面完成 01