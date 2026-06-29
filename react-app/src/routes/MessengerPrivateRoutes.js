import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from '../layout/Header/HeaderProfile'
import SidebarNav from '../layout/Sidebar/SidebarNav';
import MessengerPage from '../pages/Messenger/MessengerPage'


export default function MessengerPrivateRoutes(props) {
    console.log('props')
    console.log( props.history.location.pathname)
    return (
        <div>      
            <SidebarNav />
            <HeaderProfile props={props}/>     
            <div className="Dadupa-Page Sidebar-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/:id`}  component = {MessengerPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/:id` }} />
                    )} />
                </Switch>
            </div>
        </div>
    )
}
