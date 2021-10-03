import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {LanguageProvider} from "./containers/Language";
import UserLogin from "./pages/User/Auth/Login";
import UserRegister from "./pages/User/Auth/Register";
import {Gaurd} from './Gaurd'
import ProjectListPrivateRoutes from "./routes/ProjectListPrivateRoutes";
import ProfilePrivateRoute from "./routes/ProfilePrivateRoutes";
import MessengerPrivateRoutes from './routes/MessengerPrivateRoutes';
import FundersPrivateRoutes from './routes/FundersPrivateRoutes';
import NotFound from './pages/404';
import Opps from './pages/500';
import Expired from './pages/Expired';
import SettingPrivateRoutes from './routes/SettingPrivateRoutes';
import FavoritePrivateRoutes from './routes/FavoritePrivateRoutes';
import NoAuthorization from './pages/NoAuthorization';
import NotificationsPrivateRoutes from './routes/NotificationsPrivateRoutes';

const Routes = (props) => {

    return (
        <div>
            <LanguageProvider>
                <Switch>
                        <Route  exact path="/" render={ props=>(
                            <Redirect to={{pathname: '/login'}} />
                        )} />
                        <Route exact path="/login" component={UserLogin} />
                        <Route exact path="/login/:token" component={UserLogin} />
                        <Route exact path="/register" component={UserRegister} />
                        <Route path="/register/:token" component={UserRegister} />
                        <Gaurd  path="/project" token='user-token' routeRedirect='/login' component={ProjectListPrivateRoutes} />
                        <Gaurd  path="/profile/:id" token='user-token' routeRedirect='/login' component={ProfilePrivateRoute} />
                        <Gaurd  path="/user/:id" token='user-token' routeRedirect='/login' component={SettingPrivateRoutes} />
                        <Gaurd  path="/favorite" token='user-token' routeRedirect='/login' component={FavoritePrivateRoutes} />
                        <Gaurd  path="/notifications" token='user-token' routeRedirect='/login' component={NotificationsPrivateRoutes} />
                        <Gaurd  path="/messages" token='user-token' routeRedirect='/login' component={MessengerPrivateRoutes} />
                        <Gaurd  path="/funder" token='user-token' routeRedirect='/login' component={FundersPrivateRoutes} />
                        <Gaurd  path="/funders" token='user-token' routeRedirect='/login' component={FundersPrivateRoutes} />
                
                        <Route exact path="/noauthorization/:id" component={NoAuthorization} />
                        <Route exact path="/expired" component={Expired} />
                        <Route exact path="/oops" component={Opps} />

                        <Route path="*" render={ props=>(
                            <NotFound header="show" />
                        )} />
                </Switch>
            </LanguageProvider>

        </div>
    )
}
export default Routes;