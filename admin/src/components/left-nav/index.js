import React from 'react';
import { Icon, Menu } from 'antd';
import '../../static/css/AdminIndex.css';
import { Link, withRouter } from 'react-router-dom';
import MenuItem from 'antd/lib/menu/MenuItem';
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;
const LeftNav = (props) => {
    // 请求的路径
    const path = props.location.pathname;
    // 第一种方案侧边栏渲染  map + 递归
    // const getNavNode = (menuList) => {
    //     return menuList.map((item) => {
    //         if (!item.children) {
    //             return (
    //                 <MenuItem key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </MenuItem>
    //             )
    //         }
    //         return (
    //             <SubMenu
    //                 key={item.key}
    //                 title={
    //                     <span>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </span>
    //                 }
    //             >
    //                 {getNavNode(item.children)}
    //             </SubMenu>
    //         )
    //     })
    // }
   
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
                // 判断当前item的key是否是我需要的openKey
                // 查找item的所有children中item的key，看是否可请求的path匹配
                // const cItem  = item.children.find((cItem) => cItem.key === path) 
                // if(cItem ){
                //    const openKey = item.key;
                //    defaultOpenKeys={[openKey]}
                //  }
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

    // 高阶组件动态包裹侧边栏渲染得到当前路由的请求路径
    const selectKey = props.location.pathname;
    console.log(selectKey,'selectKey');
    // console.log(openKey, 'openkey');
    const menuNodes =  getNavNode2(menuList)
    return (
        <div>
            <div className="logo">
                <Link to="/index">
                    <span>React blog admin</span>
                </Link>
            </div>
            <Menu theme="dark" defaultSelectedKeys={[selectKey]} mode="inline" >
                {   
                    menuNodes
                }
            </Menu>
        </div>
    )
}

/**
 *向外暴露使用啊高阶组件来包裹非路由组件
 */


 /**
  * 问题解决
  * 1)默认选中对应的menuItem
  * 2）有可能要默认打开某个SubMenu对应的path： 访问的是某个二级菜单对应的path
  */

export default withRouter(LeftNav);

