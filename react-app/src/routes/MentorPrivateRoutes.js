import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import SidebarNav from "../layout/Sidebar/SidebarNav";
import Footer from "../layout/footer/footer";
import NotFound from '../pages/404';
import ListingMentors from '../views/Mentor/ListingMentors';
import AddMentorPage from '../pages/Mentor/AddMentorPage';
import MentorShowPrivateRoutes from './MentorShowPrivateRoutes';


export default function MentorPrivateRoutes(props) {
    return (
        <div>
            <SidebarNav />
            <HeaderProfile props={props} />
            <div className="Dadupa-Page Sidebar-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/lists`} component={ListingMentors} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/lists` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create`} component={AddMentorPage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/create` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create/:id`} component={AddMentorPage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/create/:id` }} />
                    )} />

                    <Route exact path={`${props.match.path}/create/:id/:step`} component={AddMentorPage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/create/:id/:step` }} />
                    )} />

                    <Route path={`${props.match.path}/show/:id`} component={MentorShowPrivateRoutes} />

                    <Route exact path={`${props.match.path}/update/:id`} component={AddMentorPage} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/update/:id` }} />
                    )} />

                    <Route component={NotFound} header="false" />
                </Switch>
            </div>
            <Footer />

        </div>
    )
}
