
## Available Scripts  admin（后台管理系统）


```
yarn start

[http://localhost:3000](http://localhost:3000) to view it in the browser
```

**文章目录**

[TOC]



### 第25节后台开发1-开发环境搭建

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



### 第26节后台开发2-页面路由配置

- 安装路由管理包 
  
    > yarn add react-router-dom
- src 建立Pages文件夹 包含Login.js  Main.js
- 在Main.js 建立路由并且抛出到 index.js



### 第27节后台开发3-登录页面UI制作

src/static/css/Login.css

`import { Card, Input, Icon,Button ,Spin } from 'antd';`
引入Spin 加载组件
isLoading主要用于控制Spin组件是否进入加载状态，进入加载状态可以有效防止重复提交



### 第28节后台开发4-UI框架的Layout搭建

> Layout 布局

API地址：https://ant.design/components/layout-cn/

这步完成后，还需要在/src/static/css文件夹下建立一个AdminIndex.css文件，复制下面的代码
本结主要是将class有状态组件变成hooks函数式组件的改写



### 第29节后台开发5-添加文章页面制作1


/src/Pages/AddArticle.js  添加文章页面



/src/Pages/AdminIndex.js  (后台首页显示添加文章的路由)
```
import AddArticle from '../Pages/AddArticle';
import {Route} from 'react-dom-router';

<div>
	<Route path="/index/" exact component={AddArticle}/>
</div>
```



/src/static/css/AddArticle.css  

```
.markdown-content{
    font-size:16px !important;
    max-height: 745px;
}
.show-html{
    padding:10px;
    border:1px solid #ddd;
    border-radius: 5px;
    font-size:16px;
    height: 745px;
    background-color: #f0f0f0;
    overflow: auto;
}

.show-html h1{
    font-size:30px;
}

.show-html h2{
    font-size:28px;
    border-bottom: 1px solid #cbcbcb;
}
.show-html h3{
    font-size:24px;
}

.show-html pre{
    display: block;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
}
.show-html pre>code{
    color: #000;
    background-color: #f0f0f0;
}
.show-html code {
    background-color: #fff5f5;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0px 3px; 
    color: #ff502c; 
}
.show-html blockquote{
    border-left:4px solid #cbcbcb ;
    padding: 10px 10px 10px 30px; 
    background-color: #f8f8f8;
}
.introduce-html{
    padding:10px;
    border:1px solid #ddd;
    border-radius: 5px;
    font-size:16px;

    background-color: #f0f0f0;
}


.introduce-html h1{
    font-size:30px;
}

.introduce-html h2{
    font-size:28px;
    border-bottom: 1px solid #cbcbcb;
}
.introduce-html h3{
    font-size:24px;
}

.introduce-html pre{
    display: block;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
}
.introduce-html pre>code{
    color: #000;
    background-color: #f0f0f0;
}
.introduce-html code {
    background-color: #fff5f5;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0px 3px; 
    color: #ff502c; 
}
.introduce-html blockquote{
    border-left:4px solid #cbcbcb ;
    padding: 10px 10px 10px 30px; 
    background-color: #f8f8f8;
}
.date-select{
    margin-top:10px;
}
```




### 第30节后台开发6-添加文章页面制作2

- 暂存和发布按钮
- 编写文章简介
- 编写时间发布



### 第31节后台开发7-Markdown转HTML,marked语法解析写入）

 > bug
```
 Class constructor Renderer cannot be invoked without 'new'
 如果没有“ new”，则不能调用类构造函数Renderer
 
 
```

> 设置marked 声明完成后需要对marked进行基本的设置


```
import marked from 'marked';
	marked.setOptions({
    renderer: new marked.Renderer(),  //   加入new 改正错误
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  }); 
```

> 编写实时预览方法

```
	   const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
	   const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
const changContent = (e) => {
 	setArticleContent(e.target.value);
	let html = marked(e.target.value);
	setMarkdownContent(html);
}


		<Col span={12}>
			<TextArea  placeholder="文章内容" className="markdown-content" rows={35} onChange={changeContent}/>
		</Col>
		<Col span={12}>
			<div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}></div>
		</Col>
```



### 第32节后台开发8-中台service登录接口编写（中台连接后台）



>  新建 main.js  文件

页面: `/service/controller/admin/ main.js`  后台使用的接口

建立好文件后，编写代码：

```
'use strict',
const Controller = require('egg').Controller;

class MainController extends Controller {
	async index(){
		// 首页的文章列表数据
		this.ctx.body = 'Hi api';
	}
}

modult.exports  = MainController;
```



> 中台路由文件制作

页面： `service/router/admin.js`   配置后台接口文件路由

```
module.exports = app => {
	const {router, controller} = app;
	router.get('/admin/index', controller.admin.main.index)
}
```

路由配置以后在总的路由文件`router.js`进行配置， 

```
'use strict';
modult.exports = app => {
	require(./router/default)(app);
	require('./router/admin')(app);
}
```

测试浏览效果 `http://localhost:7001/admin/index/`



> 登录方法的编写

页面： `service/controller/admin/main.js`

```

 //判断用户名密码是否正确
  async checkLogin(){
      let userName = this.ctx.request.body.userName
      let password = this.ctx.request.body.password
      const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                  "' AND password = '"+password+"'"

      const res = await this.app.mysql.query(sql)
      if(res.length>0){
          //登录成功,进行session缓存
          let openId=new Date().getTime()
          this.ctx.session.openId={ 'openId':openId }
          this.ctx.body={'data':'登录成功','openId':openId}

      }else{
          this.ctx.body={data:'登录失败'}
      } 
  }
```

> 创建数据表   react-blog 数据库下创建 数据表 admin-user



```
userName:  admin
password: 123
```







###  第33节后台开发9-后台登录功能的实现（bug）

> 设置中台路由

页面: `service/app/router/admin.js`

```
router.post('/admin/checkOpenId', controller.admin.main.checkLogin);
```

>  后台设置 统一管理API     安装 axios  yarn  add axios

页面: `/admin/config/apiUrl.js`

```
const ipUrl = 'http://127.0.0.1:7001/admin/';
const servicePath = {
	checkLogin: ipUrl + 'checkLogin', // 检查用户名密码时候正确
}
```



> 后台登录方法编写checkLogin

点击登录按钮后，就要去后台请求接口，验证输入的用户名和密码是否正确，如果正确跳到博客管理页面，如果不正确在登录页面进行提示。

页面 `admin/src/Pages/Login.js`

```
const checkLogin = () => {
	setIsLoading(true);
	if(!userName){
		message.error('用户名不能为空');
		return false;
	}else if {
	setTimeout(() => {
	 setIsLoading(false);
	}, 1000)
			message.error('密码不能为空');
		    return false;
	}
	let dataProps = {
	'userName': userName,
	'passWord':  passWord,
	}
	axios({
	 method:'post',
	 url: servicePath.checkLogin,
	 data: dataProps,
	 withCredentials: true
	}).then(
	res => {
	setIsLoading(false);
	if(res.data.data == '登录成功'){
		locatlStorage。setItem('openId', res.data.openId)
		props.history.push('/index');
	}else {
		message.error('用户名密码错误');
	}
	})
}
```

![](https://github.com/xiaoguiking/ReactBlog/blob/master/gitImages/image-20200218193238318.png)

> 解决跨域

页面： `service/config/config.default.js`

```
 config.security = {
　　　　csrf: {enable: false},
　　　　domainWhiteList: [ '*' ]
　　};
  config.cors = {
    origin: 'http://localhost:3000',
    credentials: true,  //允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    };
```



> 修改后台管理 登录 路由

页面`admin/src/Pages/Main.js`

```
<Router>
            <Route path='/' exact component={Login}  />
            <Route path='/index/'  component={AdminIndex}  />   需要删除exact
        </Router>
```



> # Egg post 失败 { message: 'invalid csrf token' } 解决方案





###  第34节后台开发10-中台路由守卫制作（中台使用中间件）



登录后生成session，通过后台是不是存在对应session，作为一个中台的路由守卫，如果没有登录，是不允许后台访问对应的后台接口，也就没办法实现对应操作，实现了接口的安全。

> **编写守卫方法**

守卫方法通过`egg.js`中间件实现`middleware`， 

页面建立 `service/app/middleware/adminauth.js`

```
module.exports = options => {
	return async function adminauth(ctx, next) {
		console.log(ctx.session.openId);
		if(ctx.session.openId){
			await next();
		}else {
			ctx.body = {data: '没有登录'};
		}
	}
}
```

路由守卫是一个异步的方法，如果验证session成功，就用用awat next() 向下执行，（走正确的流程执行下去），如果验证失败，就直接返回 ‘没有登录’



> **前后台分离共享session 的方法?**

页面： 中台实现 `service/config/config.default.js` 加入**credentials： true**

```
config.cors = {
	origin: 'http://localhost:3000',
	credentials: true, //  允许Cookie 跨域（session）
}
```



> ***使用中间件实现路由守卫*** （路由配置）

页面 `service/app/router/admin.js`

```
const {router, controller} = app;
var adminauth = app.middleware.adminauth();
router.get('/admin/index',adminauth, controller.amdin.main.index );

```



###  第35节后台开发11-读取文章分类信息( bug 路由守卫问题已经解决)

从中台写入一个读取文章类别的接口，然后从接口汇总获得数据，展现在添加文章页面

> **编写文章类别接口**

页面： `service/app/controller/admin/main.js`

```
// 后台文章信息
async getTypeInfo(){
	const resType = this.app.mysql.select('type');
	this.ctx.body = {data: resType};
}
```

> **编写中台路由**

页面 `service/app/router/admin/admin.js`

```
modules.exports = app => {
	const {router, controller} = app;
	var adminauth = app.middleware.adminauth();
	router.get('admin/index', controller.admin.main.index);
	router.get('admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
}
```

> **后台admin apiUrl.js 设置**

```
const service = {
	getTypeInfo: ipUrl + 'getTypeInfo', // 获取文章类别
}
```



> **在添加文章页面 显示出类别**

页面： `	admin/src/Pages/AddArticle.js`

```
import {Row, Col, Input, Select, Button, DatePicker, message} from 'antd';
import axios from 'axios';
import servicePath from '../config/apiUrl';

const [typeInfo, setTypeInfo] = useState([]);  // 文章类别信息

```

引入编写的`getTypeInfo `方法

```


 //从中台得到文章类别信息
  const getTypeInfo =()=>{

        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then(
           res=>{
               if(res.data.data=="没有登录"){
                 localStorage.removeItem('openId')
                 props.history.push('/')  
               }else{
                setTypeInfo(res.data.data)
               }

            }
        )
  }js
```

useEffect  进行使用

````
useEffect(() => {
	getTypeInfo();
},[])
````

样式代码部分

<Select	defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
    {
    typeInfo.map((item,index) => {
    	return <Option key={index} value={item.Id}>{item.typeName}</Option>
    })
    }
</select>

> bug 路由守卫问题没有解决 (解决)

```
清空浏览器 缓存
```



### 第36节后台开发12-添加文章内容(上)

> **选择 文章类别的调用方法**

页面:  `	admin/src/Pages/AddArticle.js`

```
//  选择文章类别的方法
const selectTypeHandler = (value) => {
	setSelectType(value);
}

//  使用
<Select defaultValue={selectedType} onChange={selectTypeHandler}></Select>
```



> **发布时间文本框修改** 

选择文章可用后，修改发布日期对应的文本框，增加相应的方法，让选择日期文本框可用

```
<Col span={12}>
    <div className="date-select">
        <DatePicker
            onChange={(date,dateString)=>setShowDate(dateString)} 
            placeholder="发布日期"
            size="large"

        />
        </div>
</Col>
```

> **对文章标题文本框进行修改**

```
<Col span={16}>
    <Input 
            value={articleTitle}
            placeholder="博客标题" 
            onChange={e=>{

            setArticleTitle(e.target.value)
            }}
            size="large" />
</Col>
```



>  **编写文章保存方法**

````
const saveArticle = () => {
	if(!selectedType){
		message.error('必须选择文章类别');
		return false;
	}else if (!articleTitle){
	message.error('文章名称不能为空');
	return false;
	}else if (!articleContent){
	message.error('文章内容不能为空');
	return false;
	}
	else if (!introducemd){
	message.error('简介不能为空');
	return false;
	}
	else if (!showDate){
	message.error('发布日期不能为空');
	return false;
	}
	message.success('检验通过');
}

没有return false 中断 会和检验通过一起执行
````

发布文章部分写上保存的方法

```
<Col span={24}>
        <Button  size="large">暂存文章</Button>&nbsp;
        <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
        <br/>
</Col>
```



###  第37节后台开发13-添加文章内容(中 bug修复，问题出在中台await)

完善中台service 和后台admin 的saveArticle 方法

>  **编写中台addArticle 方法**

页面： `service/app/controller/admin/main.js`  编写 addArticle 方法

```
// 添加文章
async addArticle() {
 const temArticle = this.ctx.request.body;
 const result = await this.app.mysql.insert('article, tmpArticle');
 const insertSuccess = result.affectedRows === 1;
 const insertId = result.insertId;
 this.ctx.body = {
  isSuccess: insertSuccess,
  insertId: insertId
 }
}
```

> **编写对用的路由**

页面： `service/app/router/admin.js`

```
router.post('admin/addArticle', adminauth, controller.admin,main.addArticle);
```

>  admin后台统一管理api ， apiUrl.js

```
let servicePath = {
	addArticle: ipUrl +'addArticle', // 添加文章
}
```



>  **编写saveArticle方法**

```
const saveArticle = () => {
 const dataProps = {}; // 传递到接口的参数  dataProps.参数 对应数据库中的名字
 dataProps.type_id = selectedType
 dataProps.title = articleTitle
 dataProps.article_content = articleContent
 dataProps.introduce = introducemd
 let dateText = showDate.replace('-','/');  // 把字符串变成时间戳
 dataProps.addTime = (new Date(dataText).getTime())/1000
 
 if(articleId === 0)
 console.log('articleId=:'+articleId);
 dataProp.view_count = Math.ceil(Math.random()*100+1000);
 axios({
  method: 'post',
  url: service.addArticle,
  data: dataProps,
  withCredentials: true
 }).then((res) => {
 	setArticleId(res.data.insertId);
 	if(res.data.isSuccess) {
 	message.success('文章保存成功');
 	}else {
 	message.error('文章保存失败');
 	}
 })
}

```



###  第38节后台开发14-添加文章内容(下)

实现需求： 已经加入数据库如果我们继续改动，实现对文章内容更新功能

> **编写中台接口方法**

页面 `service/app/controller/admin/main.js`

```
编写更新方法 updateArticle 方法
async updateArticle (){
	const tmpArticle = this.ctx.request.body;
	const result = await this.app.mysql.update('article', tmpArticle);
	const updateSuccess = result.affectedRows === 1;  // 判断
	console.log(updateSuccess,'updateSuccess');
	this,ctx.body = {
		isSuccess: updateSuccess
	}
}
```

> **编写对应的路由**

页面`service/app/router/admin.js`

```
router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
```

> **admin后台统一管理API**

页面`admin/src/config/apiUrl.js`

```
const servicePath = {
	updateArticle: ipUrl + 'updateArticle';  更新修改文章
}
```

> **admin后台保存方法修改**

在保存的时候使用判断 `if(article === 0)` 如果等于0 说明新添加， 如果不等于0，说明是修改

```
else {
 dataProps.id = articleId;
 axios({
 	method: 'post',
 	url: servicePath.updateArticle,
 	withCredentials: true,
 	data: dataProps,
 }).then(
 res => {
 	if(res.data.isSuccess){
 		message.success('文章修改成功');
 	}else {
 		message.error('文章修改失败');
 	}
 })
}
```



### 第39节后台开发15-文章列表制作(上) admin（bug路由父子级别路由问题冲突）


> **新建ArticleList.js 文件**

页面： `admin/src/pages/ArticleList.js`

```
import React,{useState, useEffect} from 'react';
import '../public/css/ArticleList.css';
import {List, Row, Col, Modal, message, Button, Switch} from 'antd';
import axios from 'axios';
import servicePath from '../config/apiUrl';

const {confirm}  = Modal;

function ArticleList(props){

    const [list,setList]=useState([])
    return (
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                             {item.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>
                                共<span>{item.part_count}</span>集
                            </Col>
                            <Col span={3}>
                              {item.view_count}
                            </Col>

                            <Col span={4}>
                              <Button type="primary" >修改</Button>&nbsp;

                              <Button >删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />

        </div>
    )

}

export default ArticleList
```



>  编写 admin 路由

页面  `admin/src/pages/AdminIndex.js`

```
import ArticleList from './ArticleList'

const handleClickArticle = e => {
 console.log(e.item.props);
 if(e.key === 'addArticle') {
  props.history.push ('/index/add'); 
 }else {
 props.history.push('/index/list');
 }
}

<div>
    <Route path="/index/" exact  component={AddArticle} />
    <Route path="/index/add/" exact   component={AddArticle} />
    <Route path="/index/add/:id"  exact   component={AddArticle} />
    <Route path="/index/list/"   component={ArticleList} />

</div>

···

然后找到文章管理，文章列表的部分，修改代码如下：

​```js
<SubMenu
    key="sub1"
    onClick={handleClickArticle}
    title={
    <span>
        <Icon type="desktop" />
        <span>文章管理</span>
    </span>
    }
>
    <Menu.Item key="addArticle">添加文章</Menu.Item>
    <Menu.Item key="articleList">文章列表</Menu.Item>

</SubMenu>
```



>  Bug 路由跳转出现空白页问题 未解决 ----   解决

```
精确匹配导致问题

将Main.js 页面 

 <Route path='/index'  component={AdminIndex} />  里面的exact 删除
```






### 第40节后台开发16-文章列表制作(中)



> 编写中台获取文章列表接口service

页面： `service/app/controller/admin/main.js`

```
编写getArticleList 方法
// 获得文章列表
async getArticleList() {
 const sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC ';  // 查看顺序;
         const resList = await this.app.mysql.query(sql);
         this.ctx.body = {data: resList};  // 这里的data 对应data对应获取admin 后台data
}
```

> 编写对应的路由

```
router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
```



> admin 统一api管理 apiUrl.js

```
const servicePath = {
	getArticleList: ipUrl + 'getArticleList',   // 文章列表
}
```

> admin后台获取数据 文章列表

页面： `admin/src/Pages/ArticleList.js`

```
// 请求数据得到文章列表

const getList = () => {
  axios({
  	method: 'get',
  	url: servicePath.getgetArticleList,
  	withCredentials: true,
    header:{ 'Access-Control-Allow-Origin':'*' }
  }).then((res) => {
  	setList(res.data.data);  //  注意这里的data对应的是后台接口的data
  })
}

刚进入页面 获得文章列表

useEffect(() => {
	getList();
},[])

```



###  第41节后台开发17-删除文章



>  **service删除文章中台方法编写**

页面 `service/app/controller/admin/main.js`

```
// 删除文章

async deleteArticle (){
	const id = this.ctex.params.id  // 接受id
	const res = await this.app.mysql.delete('article', {'id': id});
	this.ctx.body = {
	data: res
	}
}
```

>  **路由配置**

页面： `router/admin.js`

```
 router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)  // 删除文章
```

> **admin 统一api管理文件**

页面 `admin/src/config/apiUrl.js`

```
deleteArticle: ipUrl + 'deleteArticle/',  // 删除文章
```

> **管理页面删除方法编写**

页面 `admin/src/pages/ArticleList.js`

```
// 编写删除方法delArticle

cosnt delArticle = （id） => {
	confirm({
		title: '确定要删除这篇文章吗'
		content: '如果点击ok按钮，文章用删除并且无法恢复',
		on(){
		axios(
		servicePath.deleteArticele + id, {withCredentials: true}.then(
		res => {
		 message.success('文章删除成功');
		 getList(); // 删除 之后再次请求数据
		}
		)
		)
		}，
		onCancel(){
		message.success('没有发生改变');
		}
	})
}
```

```
<Button onClick={()=>{delArticle(item.id)}} >删除 </Button>
```



### 第42节后台开发18-修改文章（上）



>  **编写中台接口方法**

页面 `service/app/controller/admin/main.js`

```
// 根据文章I得到文章详情， 用于修改文章 getArticleById
async getArticle() {
	const id = this.ctx.params.id;  // 接收传递过来的id
	const id = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.id='+id;  // 查询文章的id
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
    data: result;
    }
}
```

> **service配置路由**

页面： `router/admin.js`

```
router.get(/admin/getArticleById/:id, adminauth, controller.admin.main.getArticleById);
```

> **admin 统一api管理**

页面： `admin/src/config/apiUrl.js`

```
getArticleId: ipUrl + 'getArticleId'/,  // 根据id 获取文章详情
```

> updateArticle 方法编写

页面 `admin/src/pages/ArticleList.js`

```
// 修改文章方法 updateArticle 跳转到添加页面的方法
const updateArticle  = (id) => {
 porps.history.push ('/index/add'+ id);
}
```

### 第43节后台开发19-修改文章（下）

> **getArticleById方法编写**

页面： `admin/src/pages/AddArticle.js`

```
const getArticleById = (id) => {
 axios(servicePath.getArticleByid+ id, {
   withCredentials: true,
   header:{ 'Access-Control-Allow-Origin':'*' }
 }).then(
 res=> {
  
 }
 )
}
```
### 第44节后台开发部署


### 45 路由二次修改 开始细节加入

**组件拆分**

- 头部 header
- 侧边导航left-nav


**config/menuConfig.js**
```js
const menuList = [
    {
        title: '首页',// 菜单名称
        key: '/index',  // 对应path
        icon: 'home' ,   // 对应图标
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'user',
    },
    {
        title: '文章管理',
        key: '/file',
        icon: 'file',
        children: [
            {
                title: '添加文章',
                key: '/index/add',
                icon: '',
            },
            {
                title: '文章列表',
                key: '/index/list',
                icon: '',
            },
        ]
    },
    {
        title: '列表',
        key: '/index/list',
        icon: '',
    },
    {
        title: '首页',
        key: '/charts',
        icon: 'home',
        children: [// 子菜单列表
            {
                title: '折线图',
                key: '/charts/line',
                icon: 'line-chart',
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: 'pie-chart',
            }
        ]
    },
]

export default menuList;
```

**lefe-nav**
```js
import React from 'react';
import { Icon, Menu } from 'antd';
import '../../static/css/AdminIndex.css';
import { Link } from 'react-router-dom';
import MenuItem from 'antd/lib/menu/MenuItem';
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;
const LeftNav = () => {

    // 第一种方案侧边栏渲染  map + 递归
    const getNavNode = (menuList) => {
        return menuList.map((item) => {
            if (!item.children) {
                return (
                    <MenuItem key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </MenuItem>
                )
            }
            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {getNavNode(item.children)}
                </SubMenu>
            )
        })
    }
    //  第二种方案 reduce
    const getNavNode2 = (menuList) => {
        return menuList.reduce((pre, item) => {
            //添加Menu.item
            if (!item.children) {
                pre.push (
                    <MenuItem key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </MenuItem>
                )
            } else {
                //添加SubMenu
                pre.push (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {getNavNode2(item.children)}
                    </SubMenu>
                )
            }
            return pre
        }
        , [])
    }
    return (
        <div>
            <div className="logo">
                <Link to="/index">
                    <span>React blog admin</span>
                </Link>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {
                    getNavNode2(menuList)
                }
            </Menu>
        </div>
    )
}

export default LeftNav;
```

**使用路由hooks**
- useHistory
- useLocation
- useParams
- useRouteMatch


### 46引入echarts


### 47header修改
```js
import React from 'react';
import { Modal} from 'antd';
import {withRouter} from 'react-router-dom';
import '../../static/css/header.css';

const { confirm } = Modal;

const Header= (props) => {

    const handleOut = () => {
        confirm({
            title: 'Do you Want to out?',
            content: 'Some descriptions',
            onOk() {
              console.log('OK');
              props.history.push('/');
              // 没有清空登录的状态
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    return (
        <div className="header">
            <div className="header-top">
                欢迎admin
                <a onClick={handleOut}>退出</a>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">首页</div>
                <div className="header-bottom-right">
                    <span>时间</span>
                    <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather"/>
                    <span>晴天</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header);
```



### 48ajax添加优化（admin）配置配置代理，

**解决开发时候ajax请求跨域问题**

`admin/config/ajax.js`和`admin/config/index.js`

`package.json`
"proxy": 'http://localhost: 70001',
webpack-dev-sever http-proxy-middleware(代理中间件)

```
/**
 * 包含应用中所有请求接口的函数 接口请求函数
 * 
 */

import ajax from './ajax';

// import qs from 'qs';

const BASE = '';

// 最简写法
export const reqLogin = (username, pwssword) = ajax.post(BASE + '/login', {username, pwssword});

// 第二种写法
// export const reqLogin = (username, password) => (
//     ajax({ // 默认是使用json格式的请求体携带数据
//         method: 'post',
//         url: BASE + '/login',
//         data: {
//             username,
//             password
//         }
//        // data: qs.stringify({username, password})  // coded模式
//     })
// )


 // 请求登录 第一种写法
//  export function reqLogin(username, password){
//      return ajax({ // 默认是使用json格式的请求体携带数据
//          method: 'post',
//          url: BASE + '/login',
//          data: {
//              username,
//              password
//          }
//         // data: qs.stringify({username, password})  // coded模式
//      })
//  } 

 const name = 'admin',
 const pwd = '123';

 reqLogin(name, pwd).then(result => { // respon.data值
    // const result = response.data;
    console.log('请求成功', result);

 })
```
> 如何使用

```js
import {reqLogin} from '../api/index.js'
(async(err, {username, password}) => {
    const result = await reqLogin(username, password);
    <!-- try{} catch{} -->
    if(result.state === 0) {
        //code 登录成功跳转
    }else {
        失败
    }
})

```

#### async/await 理解和使用
1） 理解

   -  简化promise对象的使用: 不再使用then()指定回调函数
   - 能同步编码方式实现异步流程
2）使用
   -  哪里使用await？ 在返回promise对象的表达式的左侧，左侧得到不再是promise，而是promise异步成功

   -  哪里使用async？ await所在最近函数定义的左侧



### 49 优化登录功能localStorage

`admin/src/login.js`
```js
        // localStorage存取多个key
        let lcoVal = {
            userName: res.data.userName,
            openId: res.data.openId
        }
        localStorage.setItem('lcoVal', JSON.stringify(lcoVal));
        
        props.history.push('/index');
        message.success(`登录成功,欢迎${userName}归来` );
```
`admin/src/Home.js`
```
读取保存的userName,如果不存在，直接跳转到登录页面
const userName = JSON.parse(localStorage.getItem('userName')||'{}');
if(!id){
    //this.props.history.replace('/login');事件回调函数
    // 自动跳转到指定路由路径
    return <Redirect to="/" />
}
```

**utils工具函数模块**

- 封装localStorage
```js
/**
 *操作local数据工具函数模块
 */
 const USERNAME = 'userName';
 // 全部暴露
 export default {
    //  const USERNAEME = 'userName';
     // 保存
    saveUser(user){
        localStorage.setItem(USERNAME, JSON.stringify(user));
    },
    /**
     * 获取， 返回一个user对象，如果没有返回{}
     */
    getUser(){
        return JSON.parse(localStorage.getItem(USERNAME)|| '{}');
    },
    // 清除
    removeUser(){
        localStorage.removeItem(USERNAME);
    },
 }


//  单独暴露
// export const saveUser(){
// }
```
- 使用
```
import storageUtils from './storageUtils';

storageUtils.saveUser(user);
```

**引入封装好的store**





### 50 title首页切换显示（header）

```
    //根据当前请求的path得到对应的title 双层遍历
    const getTitle = () => {
        let title = '';
        const path = props.location.pathname;
        menuList.forEach( item => {
            if(item.key === path){
                title = item.title;
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title;
                }
            }
           
        })
        return title
    }

   const title = getTitle();
```

###  51 Header_jsonp请求显示天气信息

- 安装jsonp 请求方式
yarn add jsonp

- 引用使用 `admin/src/config/index.js`发送jsonp 请求得到天气信息
```
http://api.map.baidu.com/telematics/v3/weather?location=上海&output=json&ak=[ak密钥]

http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2

```
- 具体写法

```
// 发送jsonp请求得到天气信息

export default reqWeather = (city) => {
// 执行器函数： 内部去执行异步任务
// 成功调用resolve(), 失败了不调用reject(),直接提示错误
    return new Promise((resolve, reject) => {
        cont url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url,{}, (error, data) => {
        if(!error && data.error === 0){
            const {dayPictureUrl, weather} = data.results[0].weather_data[0];
            resolve({dayPictureUrl, weather}) // 成功的
        }else { // 失败的
            message.error('获取天气信息失败');
        }
    })
    })
}


```
