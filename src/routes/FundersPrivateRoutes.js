import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import ShowProjectView from '../views/Project/ShowProjectView';
import ListProjectPage from '../pages/User/Project/ListProjectPage';
import ListingFunders from '../views/Funder/ListingFunders'
import UpdateProjectPage from '../pages/User/Project/UpdateProjectPage';
import Footer from "../layout/footer/footer";
import NotFound from '../pages/404';
import CreateFunder from '../views/Funder/CreateFunder';
import ViewFunder from '../views/Funder/ViewFunder';


export default function FundersRoutes(props) {
    return (
        <div>
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}`}  component = {ListingFunders} />
                    {/* <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}` }} />
                    )} /> */}

                    <Route exact path={`${props.match.path}/create`}  component = {CreateFunder} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/create` }} />
                    )} />

                    <Route exact  path={`${props.match.path}/:id`}  component = {ViewFunder} />
                    <Route exact  path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/:id` }} />
                    )} />

                    {/*
                    <Route exact path={`${props.match.path}/update/:id`}  component = {UpdateProjectPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/update/:id` }} />
                    )} /> */}

                    <Route component={NotFound} header="false" />
                </Switch>
            </div>
            <Footer/>

        </div>
    )
}
