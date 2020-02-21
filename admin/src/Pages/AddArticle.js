import React, { useState, useEffect } from 'react';
import '../static/css/AddArticle.css';
import marked from 'marked';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';

import servicePath from '../config/apiUrl';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const AddArticle = (props) => {

	//  添加文章页面的整体 业务逻辑
	const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
	const [articleTitle, setArticleTitle] = useState('')   //文章标题
	const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容  文章内容
	const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
	const [introducemd, setIntroducemd] = useState()            //简介的markdown内容  文章简介
	const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
	const [showDate, setShowDate] = useState()   //发布日期
	// const [updateDate, setUpdateDate] = useState() //修改日志的日期
	const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
	const [selectedType, setSelectType] = useState('选择类别') //选择的文章类别

	// 设置marked 声明完成后需要对marked进行基本的设置
	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		smartypants: false,
	});

	// 编写实时预览方法 文章内容
	const changeContent = (e) => {
		setArticleContent(e.target.value);
		let html = marked(e.target.value);
		setMarkdownContent(html);
	}

	// 文章简介
	const changeIntroduce = (e) => {
		setIntroducemd(e.target.value);
		let html = marked(e.target.value);
		setIntroducehtml(html);
	}
	// 通过 数组执行一次
	useEffect(() => {
		getTypeInfo();
	}, [])

	// 获取文章类别 axios
	const getTypeInfo = () => {
		axios({
			method: 'get',
			url: servicePath.getTypeInfo,
			header: { 'Access-Control-Allow-Origin': '*' },
			withCredentials: true   // 跨域进行访问
		}).then((res) => {
			if (res.data.data == '没有登录') {
				localStorage.removeItem('openId');
				props.history.push('/');
			} else {
				setTypeInfo(res.data.data);
				console.log(res.data.data, 'data');
			}
		})
	}

	// 选择文章类别
	const selectTypeHandler = (value) => {
		setSelectType(value);
	}

	// 编写文章保存方法

	const saveArticle = () => {
		if (!articleTitle) {
			message.error('文章标题不能为空');
			return false;
		} else if (!articleContent) {
			message.error('文章内容不能为空');
			return false;
		} else if (!introducemd) {
			message.error('文章简介不能为空');
			return false;
		} else if (!showDate) {
			message.error('发布时期不能为空');
			return false;
		}
		// message.success('检验通过');
		// 传递到接口的参数
		const dataProps = {}; 
		// 文章类别
		dataProps.type_id = selectedType; 
		console.log(dataProps.type_id , 'type_id');
		// 文章标题
		dataProps.title = articleTitle;
		// 文章内容
		dataProps.article_content = articleContent;
		// 文章简介
		dataProps.introduce = introducemd;
		// 把发布日期字符串变成时间戳
		const dateText= showDate.replace('-','/')
		dataProps.addTime = (new Date(dateText).getTime())/1000;
		
		if(articleId == 0){
			console.log('artilceId=:', articleId);
			// dataProps.view_count = Math.ceil(Math.random()*100+1000);
			dataProps.view_count = 0 ;
			console.log(dataProps.view_count, 'view');
			axios({
				method: 'post',
				url: servicePath.addArticle,
				withCredentials: true,
				data: dataProps,
			}).then(
			res => {
				setArticleId(res.data.insertId);  // 新增
				if(res.data.isSuccess){
					message.success('文章保存成功');
				}else {
					message.error('文章保存失败');
				}
			})
		}
	}
	return (
		<div>
			<Row gutter={5}>
				<Col span={18}>
					<Row gutter={10}>
						<Col span={20}>
							<Input
								placeholder="博客标题"
								value={articleTitle}
								size="large"
								onChange={(e) => setArticleTitle(e.target.value)}
							/>
						</Col>
						<Col span={4}>
							&nbsp;
                        <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
								{
									typeInfo.map((item, index) => {
										return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
									})
								}
							</Select>
						</Col>
					</Row>
					<br />
					<Row gutter={10}>
						<Col span={12}>
							<TextArea placeholder="文章内容" className="markdown-content" rows={35} onChange={changeContent} />
						</Col>
						<Col span={12}>
							<div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
						</Col>
					</Row>
				</Col>
				<Col span={6}>
					<Row>
						<Col span={24}>
							<Button size="large">暂存文章</Button>&nbsp;
						<Button size="large" type="primary" onClick={saveArticle}>发布文章</Button>
						</Col>
					</Row>
					<Col span={24}>
						<br />
						<TextArea placeholder="文章简介" rows={4} onChange={changeIntroduce}>
						</TextArea>
						<br /><br />
						<div className="introduce-html" dangerouslySetInnerHTML={{ __html: '文章简介:' + introducehtml }}></div>
					</Col>
					<Col span={12}>
						<div className="date-select">
							<DatePicker
								placeholder="发布日期"
								size="large"
								onChange={(data, dataString) => setShowDate(dataString)}
							/>
						</div>
					</Col>
					<Col span={12}>
						<div className="date-select">
							<DatePicker
								placeholder="修改日期"
								size="large"
							/>
						</div>
					</Col>
				</Col>
			</Row>
		</div>
	)
}

export default AddArticle;