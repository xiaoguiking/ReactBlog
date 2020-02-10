import React,{useState} from 'react';
import '../static/css/AddArticle.css';
import marked from 'marked';
import {Row, Col ,Input, Select ,Button ,DatePicker} from 'antd';

const {TextArea}  = Input;
const {Option} = Select;

const AddArticle = () => {
    return (
        <div>
        <Row gutter={5}>
            <Col span={18}>
                <Row gutter={10}>
                    <Col span={20}>
                        <Input placeholder="博客标题" size="large" />
                    </Col>
                    <Col span={4}>
                    &nbsp;
                        <Select defaultValue="1" size="large">
                            <Option value="1">视频教程</Option>
                        </Select> 
                    </Col>
                </Row>
                <br />
                <Row gutter={10}>
                    <Col span={12}>
                        <TextArea  placeholder="文章内容" className="markdown-content" rows={35}/>
                    </Col>
                    <Col span={12}>
                        <div className="show-html"></div>
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
				<Row>
					<Col span={24}>
						<Button size="large">暂存文章</Button>&nbsp;
						<Button size="large" type="primary	">发布文章</Button>
					</Col>
				</Row>
				<Col span={24}>
				<br />
					<TextArea placeholder="文章简介" rows={4}>
					</TextArea>
					<br /><br />
					<div className="introduce-html">文章简介: 编辑</div>
				</Col>
				<Col span={12}>
					 <div className="date-select">
					        <DatePicker
					            placeholder="发布日期"
					            size="large"  
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