import  React,{useState, useEffect, useLayoutEffect} from 'react';
import '../public/style/pages/comm.css';
import '../public/style/components/header.css';
import {Row, Col, Icon, Menu} from 'antd';

// 加入路由
import Router from 'next/router';

//  读取文章类别信息
import axios from 'axios';
import servicePath from '../config/apiUrl';

const Header = () => {

    // 远程读取文章类别信息
    const [navArray, setNavArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then((res) => {
                console.log(res.data.data,'data');
               return res.data.data;
            })
            setNavArray(result);
        }
        fetchData();
    },[])

    // 跳转路由方法

    const handleClick = (e) => {
        if(e.key == 0){
            Router.push('/index');
        }else{
            Router.push('/list?id='+ e.key);
        }
    }




    return (
        <div className="header">
            <Row type= "flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">React Blog</span>
                <span className="header-txt">专注前端学习 HTML+Css+JavaScript</span>
            </Col>
            <Col  xs={0} sm={0} md={14} lg={8} xl={6}>
               <Menu mode="horizontal" onClick={handleClick}>
               <Menu.Item key="0">
               <Icon type="home" />
               博客首页
               </Menu.Item>
               {
                navArray.map((item) => {
                    return (
                        <Menu.Item key={item.Id}><Icon type={item.icon} />{item.typeName}</Menu.Item>
                    )
                })
               }
               </Menu>
            </Col>
            </Row>
        </div>
    )
}

export default Header;