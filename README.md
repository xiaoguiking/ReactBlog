# ReactBlog 个人博客项目搭建


## 项目汇总
  -  前台 blog
  -  中台 service
  -  后台admin

[TOC]


#Bug 记录
没有exact时候导致页面没有传递相对应的数据
体验在修改文章
### 45 路由二次修改 开始细节加入

**组件拆分**

- 头部 header
- 侧边导航left-nav


**config/menuConfig.js**
```
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
```
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


### 46引入echarts


### 47header修改
```
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




### 48ajax添加优化（admin）配置配置代理，解决开发时候ajax请求跨域问题
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

```
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
```
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
```
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
