import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import ListingFunders from '../views/Funder/ListingFunders'
import Footer from "../layout/footer/footer";
import NotFound from '../pages/404';
import CreateFunder from '../views/Funder/CreateFunder';
import ViewFunder from '../views/Funder/ViewFunder';
import UpdateFunder from '../views/Funder/UpdateFunder';


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

                    
                    <Route exact path={`${props.match.path}/update/:id`}  component = {UpdateFunder} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/update/:id` }} />
                    )} />

                    <Route component={NotFound} header="false" />
                </Switch>
            </div>
            <Footer/>

        </div>
    )
}
