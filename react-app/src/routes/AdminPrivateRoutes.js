import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import  Header from '../pages/Admin/Header';



export default function AdminPrivateRoutes(props) {
    return (
        <div>
            <Header props={props}/>
            <Switch>
                <Route exact path={`${props.match.path}/dashboard`}  component={Dashboard} />
                <Route  exact path={props.match.path} render={ props=>(
                <Redirect to={{pathname: `${props.match.path}/dashboard` }} />
                )} />
            </Switch>     
        </div>
    )
}
