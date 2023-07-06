import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import ListingFunders from '../views/Funder/ListingFunders'
import Footer from "../layout/footer/footer";
import NotFound from '../pages/404';
import CreateFunder from '../views/Funder/CreateFunder';
import FunderShowPrivateRoutes from './FunderShowPrivateRoutes';


export default function FundersRoutes(props) {
    return (
        <>
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/lists`}  component = {ListingFunders} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/lists` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create`}  component = {CreateFunder} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/create` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create/:id`} component={CreateFunder}/>
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/create/:id` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create/:id/:step`} component={CreateFunder}/>
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/create/:id/:step` }} />
                    )} />

                    <Route path={`${props.match.path}/show/:id`} component={FunderShowPrivateRoutes} />

                    {/* <Route exact path = {`${props.match.path}/create/:id/:step`} component={CreateFunder}/>
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/create/:id/:step` }} />
                    )} /> */}

                    <Route component={NotFound} header="false" />
                </Switch>  
            </div>
            <Footer/>
        </>
    )
}
