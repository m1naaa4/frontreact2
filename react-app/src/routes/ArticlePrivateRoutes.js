import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import ArticlesList from '../pages/Admin/articles/ArticlesList';
import ArticleDetails from '../pages/Admin/articles/ArticleDetails';
import Footer from "../layout/footer/footer";
import NotFound from '../pages/404';


export default function ArticlePrivateRoutes(props) {
    return (
        <div>
            <HeaderProfile props={props} />
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/`} component={ArticlesList} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/` }} />
                    )} />

                    <Route exact path={`${props.match.path}/:id`} component={ArticleDetails} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/article/:id` }} />
                    )} />

                    {/* <Route exact  path={`${props.match.path}/show/:id`}  component = {ShowProjectView} />
                    <Route exact  path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/show/:id` }} />
                    )} />

                    <Route exact path={`${props.match.path}/update/:id`}  component = {UpdateProjectPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/update/:id` }} />
                    )} /> */}
                </Switch>
            </div>
            <Footer />

        </div>
    )
}
