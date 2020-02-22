import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import AdminIndex from '../Pages/AdminIndex';


import AddArticle from './AddArticle';
import ArticleList from './ArticleList'

const Main = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/index' exact component={AdminIndex} />
                <Route path='/index/add' exact component={AddArticle} />
                <Route path='/index/list' exact component={ArticleList} />
            </Switch>

        </Router>
    )
}

export default Main;