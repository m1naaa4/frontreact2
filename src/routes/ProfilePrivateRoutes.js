import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import ProfilePage from '../pages/Profile/ProfilePage';


export default function ProfilePrivateRoutes(props) {
    console.log('props')
    console.log( props.history.location.pathname)
    return (
        <div>
            
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/:id`}  component = {ProfilePage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/:id` }} />
                    )} />
                </Switch>
            </div>
        </div>
    )
}
