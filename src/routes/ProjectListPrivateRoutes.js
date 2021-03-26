import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ListProject from "../pages/User/Project/ListProjectPage";
import HeaderProfile from "../layout/Header/HeaderProfile";
import ViewProject from '../views/User/Project/ViewProject';
import AddProjectPage from "../pages/User/Project/AddProjectPage"
import UpdateProjectPage from '../pages/User/Project/UpdateProjectPage';


export default function ProjectListPrivateRoutes(props) {
    console.log('props')
    console.log( props.history.location.pathname)
    return (
        <div>
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/lists`}  component = {ListProject} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/lists` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create`}  component = {AddProjectPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/create` }} />
                    )} />

                    <Route exact  path={`${props.match.path}/show/:id`}  component = {ViewProject} />
                    <Route exact  path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/show/:id` }} />
                    )} />

                    <Route exact path={`${props.match.path}/update/:id`}  component = {UpdateProjectPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/update/:id` }} />
                    )} />
                </Switch>
            </div>
        </div>
    )
}
