import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from '../layout/Header/HeaderProfile';
import NotFound from '../pages/404';
import SettingPage from '../pages/Profile/SettingPage';


export default function SettingPrivateRoutes(props) {
    
    return (
        <div>
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/settings`}  component = {SettingPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/settings` }} />
                        )} />

                    <Route component={NotFound} header="false" />
                </Switch>
            </div>
            
        </div>
    )
}
