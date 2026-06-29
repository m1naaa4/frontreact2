import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import SidebarNav from "../layout/Sidebar/SidebarNav";
import AddProjectPage from '../pages/User/Project/AddProjectPage';
import ListProjectPage from '../pages/User/Project/ListProjectPage';
import Footer from "../layout/footer/footer";
import NotFound from '../pages/404';
import ProjectShowPrivateRoutes from './ProjectShowPrivateRoutes';

export default function ProjectListPrivateRoutes(props) {
    return (
        <div>
            <SidebarNav />
            <HeaderProfile props={props} />
            <div className="Dadupa-Page Sidebar-Page">
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
                    <Route component={NotFound} header="false" />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}
