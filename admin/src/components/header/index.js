import React from 'react';
import { Modal} from 'antd';
import {withRouter} from 'react-router-dom';
import '../../static/css/header.css';

const { confirm } = Modal;

const Header= (props) => {

    const handleOut = () => {
        confirm({
            title: 'Do you Want to out?',
            content: 'Some descriptions',
            onOk() {
              console.log('OK');
              props.history.push('/');
              // 没有清空登录的状态
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    return (
        <div className="header">
            <div className="header-top">
                欢迎admin
                <a onClick={handleOut}>退出</a>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">首页</div>
                <div className="header-bottom-right">
                    <span>时间</span>
                    <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather"/>
                    <span>晴天</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header);