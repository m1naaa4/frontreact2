import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HeaderProfile from '../layout/Header/HeaderProfile'
import SidebarNav from '../layout/sidebar/SidebarNav';
import MessengerPage from '../pages/Messenger/MessengerPage'

export default function MessengerPrivateRoutes(props) {
    return (
        <div>
            <SidebarNav />
            <HeaderProfile props={props} />
            <div className="Dadupa-Page Sidebar-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/:id`} component={MessengerPage} />
                    <Route exact path={props.match.path} component={MessengerPage} />
                </Switch>
            </div>
        </div>
    )
}
