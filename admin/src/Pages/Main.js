import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import AdminIndex from './AdminIndex';
import User from './User';

const Main = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/index/'  component={AdminIndex} />
            </Switch>
        </Router>
    )
}

export default Main;

// <Route path='/index'  component={AdminIndex} />  删除这里的精确匹配