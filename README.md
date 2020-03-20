# ReactBlog 个人博客项目搭建


## 项目汇总
  -  前台 blog
  -  中台 service
  -  后台admin

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



