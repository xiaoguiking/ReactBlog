import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import '../public/style/pages/comm.css';
import { Row, Col, List, Icon } from 'antd';
import axios from 'axios';    // 请求数据
import Link from 'next/link';
import '../public/style/pages/index.css';
import Author from '../components/Author';  //  头像组件
import Advert from '../components/Advert';  // 广告组件
import Footer from '../components/Footer';  // 底部组件

// 引入 统一API配置管理
import servicePath from '../config/apiUrl';


// const renderItem = (item) => (
//   <List.Item>
//     <div className="list-title">{item.title}</div>
//     <div className="list-icon">
//       <span><Icon type="calendar" />{item.addTime}</span>
//       <span><Icon type="folder" />{item.typeName}</span>
//       <span><Icon type="fire" />{item.view_count}</span>
//     </div>
//     <div className="list-txt">{item.introduce}</div>
//   </List.Item>
// )

// const Home = (list) => {
//   //  传递数据代码
//   const [mylist, setMylist] = useState(list.data);
//   console.log(mylist, 'mylist');


//   return (
//     <div>
//       <Head>
//         <title>Home</title>
//       </Head>
//       <Header />
//       <Row type="flex" justify="center">
//         <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
//           <List
//             header={<div>最新日志</div>}
//             itemLayout="vertical"
//             renderItem={renderItem}
//             dataSource={mylist}
//           />
//         </Col>
//         <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
//             <Author />
//             <Advert />
//         </Col>
//       </Row>
//       <Footer />
//     </div>

//   )
// }
const Home = (list) => {

  
  //---------主要代码-------------start
  const [mylist, setMylist] = useState(list.data);
  console.log(list.data, '132222222222222')
  //---------主要代码-------------end

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
				  <Link href={{pathname:'/detailed', query:{id: item.id}}}>
				  <a>{item.title}</a>
				  </Link>
				  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )

}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then((res) => {
      console.log(res.data, '请求得到res数据');
      resolve(res.data);
    })
      .catch((error) => { console.log(error + '数据获取失败'); })
  })
  return await promise;
}

export default Home;
