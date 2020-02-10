
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

