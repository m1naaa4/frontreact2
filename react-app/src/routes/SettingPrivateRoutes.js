import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from '../layout/Header/HeaderProfile';
import SidebarNav from '../layout/Sidebar/SidebarNav';
import NotFound from '../pages/404';
import SettingPage from '../pages/Setting/SettingPage';


export default function SettingPrivateRoutes(props) {
    
    return (
        <div>
            <SidebarNav />
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page Sidebar-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/settings/:tab`}  component = {SettingPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/settings/:tab` }} />
                        )} />
                    
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
