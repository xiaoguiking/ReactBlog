import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import AdminIndex from '../Pages/AdminIndex';


const Main = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/index'  component={AdminIndex} />
            </Switch>
        </Router>
    )
}

export default Main;

// <Route path='/index'  component={AdminIndex} />  删除这里的精确匹配