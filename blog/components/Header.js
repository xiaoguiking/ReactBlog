import  react from 'react';
import '../public/style/pages/comm.css';
import '../public/style/components/header.css';
import {Row, Col, Icon, Menu} from 'antd';

const Header = () => {
    return (
        <div className="header">
            <Row type= "flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">React Blog</span>
                <span className="header-txt">专注前端学习 HTML+Css+JavaScript</span>
            </Col>
            <Col  xs={0} sm={0} md={14} lg={8} xl={6}>
               <Menu mode="horizontal">
               <Menu.Item key="home"><Icon type="home" />首页</Menu.Item>
               <Menu.Item key="video"><Icon type="youtube" />视频</Menu.Item>
               <Menu.Item key="life"><Icon type="smile" /> 生活</Menu.Item>
               </Menu>
            </Col>
            </Row>
        </div>
    )
}

export default Header;