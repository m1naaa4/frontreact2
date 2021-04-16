import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import AddProjectPage from '../pages/User/Project/AddProjectPage';
import ShowProjectView from '../views/Project/ShowProjectView';
import ListProjectPage from '../pages/User/Project/ListProjectPage';
import UpdateProjectPage from '../pages/User/Project/UpdateProjectPage';


export default function ProjectListPrivateRoutes(props) {
    return (
        <div>
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/lists`}  component = {ListProjectPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/lists` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create`}  component = {AddProjectPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/create` }} />
                    )} />

                    <Route exact  path={`${props.match.path}/show/:id`}  component = {ShowProjectView} />
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
