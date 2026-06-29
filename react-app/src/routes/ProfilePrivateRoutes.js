import React, { useEffect } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from '../layout/Header/HeaderProfile';
import SidebarNav from '../layout/Sidebar/SidebarNav';
import NotFound from '../pages/404';
import FriendPage from '../pages/Profile/FriendPage';
import DashboardPage from '../pages/Profile/DashboardPage';
import OffrePage from '../pages/Profile/OffrePage';
import ProfilePage from '../pages/Profile/ProfilePage';
import MainCvthequeView from '../views/Profile/Cvtheque/MainCvthequeView';
import ProfileHeaderForm from '../views/Profile/ProfileFormData';
import SideLeftProfileView from '../views/Profile/SideLeftProfileView';
import SideRightProfileView from '../views/Profile/SideRightProfileView';
import { ProfileAction } from '../store/actions/Profile/UserActions';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';


export default function ProfilePrivateRoutes(props) {
    const params = useParams();
    const id = params.id;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch( ProfileAction(params.id));
    },[id]);
    return (
        <div>
            <SidebarNav />
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page Sidebar-Page">
                <div className="Page-Wrapper Profile">
                    <ProfileHeaderForm {...props}/>
                    <div className="Profile-Wrapper">
                        <div className="container">
                            <div className="row">
                                <SideLeftProfileView />
                                    <Switch>
                                        <Route exact path={`${props.match.path}`}  component = {ProfilePage} />
                                        <Route exact path={props.match.path} render = { props => (
                                            <Redirect to={{pathname: `${props.match.path}` }} />
                                        )} />

                                        <Route exact path={`${props.match.path}/dashboard`} component={DashboardPage} />
                                        <Route exact path={props.match.path} render={props => (
                                            <Redirect to={{ pathname: `${props.match.path}/dashboard` }} />
                                        )} />

                                        
                                        <Route exact path={`${props.match.path}/cvtheque`}  component = {MainCvthequeView} />
                                        <Route exact path={props.match.path} render = { props => (
                                            <Redirect to={{pathname: `${props.match.path}/cvtheque` }} />
                                        )} />
                                        
                                        <Route exact path={`${props.match.path}/meoffre`}  component = {OffrePage} />
                                        <Route exact path={props.match.path} render = { props => (
                                            <Redirect to={{pathname: `${props.match.path}/meoffre` }} />
                                        )} />

                                        <Route exact path={`${props.match.path}/friends/:page`}  component = {FriendPage} />
                                        <Route exact path={props.match.path} render = { props => (
                                            <Redirect to={{pathname: `${props.match.path}/friends/:page` }} />
                                        )} />

                                        <Route exact path={`${props.match.path}/friends`}  component = {FriendPage} />
                                        <Route exact path={props.match.path} render = { props => (
                                            <Redirect to={{pathname: `${props.match.path}/friends` }} />
                                        )} />
                                        <Route component={NotFound} header="false" />
                                    </Switch>
                                {(props.location.pathname.indexOf('/friends') < 0 && props.location.pathname.indexOf('/meoffre') < 0)  && <SideRightProfileView/>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
