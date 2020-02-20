
## Available Scripts  admin（后台管理系统）



### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



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




### 第30节：后台开发6-添加文章页面制作2

- 暂存和发布按钮
- 编写文章简介
- 编写时间发布



### 第31节：后台开发7-Markdown转HTML （marked ， 语法解析写入	）

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



### 第32节：后台开发8-中台service登录接口编写 （中台连接后台）



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







###  第33节：后台开发9-后台登录功能的实现 （bug）

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

![image-20200218193238318](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200218193238318.png)

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
            <Route path='/index/' exact component={AdminIndex}  />
        </Router>
```



> # Egg post 失败 { message: 'invalid csrf token' } 解决方案





###   第34节：后台开发10-中台路由守卫制作  （中台使用中间件	）



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



###  第35节：后台开发11-读取文章分类信息  ( bug 路由守卫问题没有解决)

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



### 第36节：后台开发12-添加文章内容(上)

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

