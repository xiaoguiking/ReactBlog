import React, { useState, useEffect } from 'react';
import axios from 'axios';
import servicePath from '../config/apiUrl.js';
import '../static/css/ArticleList.css';
import { List, Row, Col, message, Button, Modal, Switch } from 'antd';

const { confirm } = Modal;

function ArticleList(props) {
  console.log('进入页面');
  const [list, setList]=useState([])
  
  console.log(list, '请求得到list');
  useEffect(()=>{
	 getList(); 
	 
  },[])
  // 获取文章列表方法
  const getList = () => {
	  axios({
		  method: 'get',
		  url: servicePath.getArticleList,
		   withCredentials: true,
		  header:{ 'Access-Control-Allow-Origin':'*' }
	  }).then((res) => {
		  setList(res.data.data);
		  // 注意这里 data 对应的是this.ctx.body = {data: resList}
		  console.log(res.data.data,'res.data.data');
	  })
  }
  
  // 删除指定文章
  const delArticle  = (id) => {
	 confirm({
		 title: '确定要删除这边博客文章吗?',
		 content: '如果点击ok按钮,文章删除无法恢复',
		 onOk (){
			 axios(
				 servicePath.deleteArticle + id,{withCredentials: true}
			 ).then(
			 res => {
				 message.success('文章删除成功');
				 getList(); // 删除后再请求一遍数据
			 })
		 },
		 onCancel(){
			 message.success('没有删除');
		 }
	 })
	}
  
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>集数</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                {item.title}
              </Col>
              <Col span={3}>
                {item.typeName}
              </Col>
              <Col span={3}>
                {item.addTime}
              </Col>
              <Col span={3}>
                共<span>{item.part_count}</span>集
            </Col>
              <Col span={3}>
                {item.view_count}
              </Col>

              <Col span={4}>
                <Button type="primary"  >修改</Button>&nbsp;
                <Button onClick={() => {delArticle (item.id)}}>删除 </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )

}

export default ArticleList


