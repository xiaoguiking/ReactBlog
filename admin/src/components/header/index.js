import React, {useState, useEffect} from 'react';
import { Modal} from 'antd';
import {withRouter} from 'react-router-dom';
import '../../static/css/header.css';
import menuList from '../../config/menuConfig';
import moment from 'moment';
import {reqWeather} from '../../config/index';

const { confirm } = Modal;

const Header= (props) => {

    // 退出功能实现
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
    
    //根据当前请求的path得到对应的title 双层遍历
    const getTitle = () => {
        let title = '';
        const path = props.location.pathname;
        menuList.forEach( item => {
            if(item.key === path){
                title = item.title;
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title;
                }
            }
           
        })
        return title
    }

   const title = getTitle();

    // 显示时间
    const [time, setTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
    // 显示天气
    const [weather, setWeather] = useState(''); 
    // 显示图片
    const [dayPictureUrl, setdayPictureUrl] = useState('');
  

    // 获取天气信息显示
    const getWeather = async () => {
        const {weather, dayPictureUrl} = await reqWeather('北京');
        setWeather(weather);
        setdayPictureUrl(dayPictureUrl);
    }
    // 显示天气jsonp 请求
    useEffect(() => {
        getWeather();
    }, [])

    // 显示时间
    useEffect(() => {
        // 启动定时器
        const timer = setInterval(() => {
        setTime(moment().format('YYYY-MM-DD HH:mm:ss'));
        }, 1000)
        // 清除定时器
        return () => {
            clearInterval(timer);
        } 
    }, [])

    return (
        <div className="header">
            <div className="header-top">
                欢迎admin
                <a href=':javascript' onClick={handleOut}>退出</a>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{title}</div>
                <div className="header-bottom-right">
                    <span>{time}</span>
                    <img src={dayPictureUrl} alt="weather"/>
                    <span>{weather}</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header);