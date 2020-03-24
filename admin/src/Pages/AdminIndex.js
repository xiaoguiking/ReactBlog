import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import '../static/css/AdminIndex.css';

import { Switch, Route} from 'react-router-dom';

import Home from './Home';
import LeftNav from '../components/left-nav'; // 侧边导航
import Header from '../components/header'; // 头部
import AddArticle from './AddArticle.js';   // 添加文章
import ArticleList from './ArticleList.js';  // 文章列表
import Bar from './charts/Bar';
import Line from './charts/Line';
import Pie from './charts/Pie';
import User from './User';


const { Content, Footer, Sider } = Layout;

const AdminIndex = (props) => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <LeftNav />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>,
            <div>
              <Switch>
              <Route path="/index" exact component={Home} />
              <Route path="/index/add" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list" component={ArticleList} />
              <Route path="/index/user" component={User}/>
              <Route path="/index/charts/bar" component={Bar} />
              <Route path="/index/charts/line" component={Line} />
              <Route path="/index/charts/pie" component={Pie} />
              </Switch>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', fontSize: '18px' }}>推荐使用谷歌浏览器</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex;

// <Route path="/index" component={Home} />
// <Route path="/index/add" component={AddArticle} />
// <Route path="/index/add/:id" component={AddArticle} />
// <Route path="/index/list" component={ArticleList} />
// <Route path="/user" component={User}/>
// <Route path="/index/charts/bar" component={Bar} />
// <Route path="/index/charts/line" component={Line} />
// <Route path="/index/charts/pie" component={Pie} />