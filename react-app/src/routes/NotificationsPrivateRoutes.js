import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Footer from '../layout/footer/footer';
import HeaderProfile from '../layout/Header/HeaderProfile';
import NotFound from '../pages/404';
import NotificationPage from '../pages/NotificationPage';


export default function NotificationsPrivateRoutes(props) {
    
    return (
        <div>
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}`}  component = {NotificationPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}` }} />
                        )} />

                    <Route component={NotFound} header="false" />
                </Switch>
            </div>
            <Footer/>
        </div>
    )
}
