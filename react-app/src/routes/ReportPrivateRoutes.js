import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import  Header from '../pages/Admin/Header';
import Report from '../pages/Admin/Report';



export default function ReportPrivateRoutees(props) {
    return (
        <div>
            <Header props={props}/>
            <Switch>
                <Route exact path={`${props.match.path}/`}  component={Report} />
                <Route  exact path={props.match.path} render={ props=>(
                <Redirect to={{pathname: `${props.match.path}/` }} />
                )} />
            </Switch>
        </div>
    )
}
