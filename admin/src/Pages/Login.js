import React, { useState } from 'react';
import { Card, Spin, Input, Icon, Button } from 'antd';
import 'antd/dist/antd.css';
import '../static/css/Login.css';

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onChangeName = (e) => {
        setUserName(e.target.value)
    };

    const onChangePwd = (e) => {
        setPassWord(e.target.value);
    }
    const checkLogin =  () => {
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    return (
        <div className="login-div">
            <Spin tip="loading..." spinning={isLoading} >
                <Card title="JSBlog 后台登录" bordered={true} style={{ width: 400 }}>
                    <Input
                        id="username"
                        size="large"
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}/>}
                        onChange={onChangeName}
                    />
                    <br/> <br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}}/>}
                        onChange={onChangePwd}
                    />
                    <br/><br/>
                    <Button 
                        type="primary" 
                        block 
                        onClick={checkLogin}
                    >Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login;