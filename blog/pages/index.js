import React from 'react'
import Head from 'next/head'
import Header from  '../components/Header';
import '../public/style/pages/comm.css';
import {Row, Col} from 'antd';
// import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>
  <Header />
  <Row type="flex" justify="center">
    <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>左侧</Col>
    <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>右侧</Col>
  </Row>
  </div>
)

export default Home
