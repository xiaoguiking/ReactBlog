import React from 'react'
import Head from 'next/head'
import Header from  '../components/Header';
import '../public/style/pages/comm.css';
import {Row, Col, Icon, Breadcrumb} from 'antd';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../public/style/pages/detailed.css';


const Detailed = () => (
  <div>
    <Head>
      <title>Detailed</title>
    </Head>
  <Header />
  <Row type="flex" justify="center">
    <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
      <div className="bread-div">
        <Breadcrumb>
            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">视频列表</a></Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <div className="detailed-title">React Blog视频实战 前端开发</div>
        <div className="list-icon center">
           <span><Icon type="calendar" />2020-01-22</span>
           <span><Icon type="folder" />视频教程</span>
           <span><Icon type="fire" />访问人数:121212</span>
        </div>
        <div className="detailed-content">
          markDown html 解析
        </div>
      </div>
    </Col>
    <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
     <Author />
     <Advert />
    </Col>
  </Row>
  <Footer />
  </div>
)

export default Detailed