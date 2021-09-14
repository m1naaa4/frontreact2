import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from '../layout/Header/HeaderProfile';
import NotFound from '../pages/404';
import FriendPage from '../pages/Profile/FriendPage';
import OffrePage from '../pages/Profile/OffrePage';
import ProfilePage from '../pages/Profile/ProfilePage';
import SettingPage from '../pages/Profile/SettingPage';
import MainCvthequeView from '../views/Profile/Cvtheque/MainCvthequeView';


export default function ProfilePrivateRoutes(props) {
    
    return (
        <div>
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/:id/me`}  component = {ProfilePage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/:id/me` }} />
                    )} />

                    
                    <Route exact path={`${props.match.path}/:id/cvtheque`}  component = {MainCvthequeView} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/:id/cvtheque` }} />
                    )} />

                    
                    <Route exact path={`${props.match.path}/:id/meoffre`}  component = {OffrePage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/:id/meoffre` }} />
                    )} />

                    
                    <Route exact path={`${props.match.path}/:id/settings`}  component = {SettingPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/:id/settings` }} />
                    )} />

                    <Route exact path={`${props.match.path}/:id/friends`}  component = {FriendPage} />
                    <Route exact path={props.match.path} render = { props => (
                        <Redirect to={{pathname: `${props.match.path}/:id/friends` }} />
                    )} />


                    <Route component={NotFound} header="false" />
                </Switch>
            </div>
        </div>
    )
}
