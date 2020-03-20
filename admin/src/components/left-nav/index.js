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

