import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import AddProjectPage from '../pages/User/Project/AddProjectPage';
import ListProjectPage from '../pages/User/Project/ListProjectPage';
import Footer from "../layout/footer/footer";
import NotFound from '../pages/404';
import ProjectShowPrivateRoutes from './ProjectShowPrivateRoutes';


export default function ProjectListPrivateRoutes(props) {
    return (
        <div>
            <HeaderProfile props={props} />
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/lists`} component={ListProjectPage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/lists` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create`} component={AddProjectPage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/create` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create/:id`} component={AddProjectPage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/create/:id` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create/:id/:step`} component={AddProjectPage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/create/:id/:step` }} />
                    )} />

                    <Route path={`${props.match.path}/show/:id`} component={ProjectShowPrivateRoutes} />
                    {/* <Route path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/show/:id` }} />
                    )} /> */}

                    {/* <Route render={props => (
                        <Component {...props} />
                    )} /> */}

                    <Route exact path={`${props.match.path}/update/:id`} component={AddProjectPage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/update/:id` }} />
                    )} />

                    <Route component={NotFound} header="false" />
                </Switch>
            </div>
            <Footer />

        </div>
    )
}
