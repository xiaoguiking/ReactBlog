import React from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import '../public/style/pages/comm.css';
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd';

import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../public/style/pages/detailed.css';
import axios from 'axios';

// import ReactMarkdown from 'react-markdown';  // 引入markdown 解析
// import MarkNav from 'markdown-navbar';  //  引入导航目录插件  不再使用
// import 'markdown-navbar/dist/navbar.css';  // 引入自带样式

//  重构博客详情页 引入marked 和 highlight.js
import marked from 'marked';  // markdown 解析软件
import hljs from 'highlight.js'; // 代码高亮软件
import 'highlight.js/styles/monokai-sublime.css'; // 代码高亮需要引入css 

//  文章目录导航  引入tocify.tsx
import Tocify from '../components/tocify.tsx';

//  引入统一中台API配置管理 
import servicePath from '../config/apiUrl';


const Detailed = (props) => {

  // let markdown='## 01:课程介绍和环境搭建\n' + '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  // '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
  //  '**这是加粗的文字**\n\n' +
  // '*这是倾斜的文字*`\n\n' +
  // '***这是斜体加粗的文字***\n\n' +
  // '~~这是加删除线的文字~~ \n\n'+
  // '\`console.log(111)\` \n\n'+
  // '# p02:来个Hello World 初始Vue3.0\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n'+
  // '***\n\n\n' +
  // '# p03:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p04:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '#5 p05:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p06:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p07:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '``` var a=11; ```'


  // 代码解析marked 语法解析设置
  const renderer = new marked.Renderer();
  
  // 导航栏目方法写入 tocify 
  const tocify = new Tocify();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id=${anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypans: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  let html = marked(props.article_content)





  return (
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
            <div className="list-title">React Blog视频实战 前端开发</div>
            <div className="list-icon center">
              <span><Icon type="calendar" />2020-01-22</span>
              <span><Icon type="folder" />视频教程</span>
              <span><Icon type="fire" />访问人数:121212</span>
            </div>
            <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }} >
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}


//  获取id详情的方法
Detailed.getInitialProps = async (context) => {
  console.log(context.query.id);

  let id = context.query.id;
  // 使用统一配置API改写
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then((res) => {
      console.log(res.data, 'res请求数据');
      resolve(res.data.data[0]);
    })
  })
  return await promise;
}

export default Detailed;

// dangerouslySetInnerHTML={{__html:html}}
// <ReactMarkdown source={markdown} escapeHtml={false} />

// 重构前文章目录
        //   <div className="nav-title">文章目录</div>
        //   <MarkNav
        //     className="article-menu"
        //     // source={markdown}
        //     source={html}
        //     ordered={false}
        //   />
        // </div>
