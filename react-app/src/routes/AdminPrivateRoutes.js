import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Gaurd } from '../Gaurd'
import NotFound from '../pages/404';
import Dashboard from '../pages/Admin/Dashboard';
import Header from '../pages/Admin/Header';
import Report from '../pages/Admin/Report';
import ArticlesList from '../pages/Admin/articles/ArticlesList';
import CreateArticlePage from '../pages/Admin/articles/CreateArticlePage';


export default function AdminPrivateRoutes(props) {
    console.log(`${props.match.path}`)
    return (
        <div>
            <Header props={props} />
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/dashboard`} component={Dashboard} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/dashboard` }} />
                    )} />

                    <Route exact path={`${props.match.path}/reports`} component={Report} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/reports` }} />
                    )} />


                    <Route exact path={`${props.match.path}/articles`} component={ArticlesList} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/articles` }} />
                    )} />

                    <Route exact path={`${props.match.path}/articles/create`} component={CreateArticlePage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/articles/create` }} />
                    )} />

                    {/* 
                    <Route exact path={`${props.match.path}/reclamations`}  component = {ListProjectPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/reclamations` }} />
                    )} /> */}

                    <Route component={NotFound} header="false" />
                </Switch>
            </div>
        </div>
    )
}
