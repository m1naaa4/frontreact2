import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {LanguageProvider} from "./containers/Language";
import UserLogin from "./pages/User/Auth/Login";
import UserRegister from "./pages/User/Auth/Register";
import {Gaurd} from './Gaurd'
import ProjectListPrivateRoutes from "./routes/ProjectListPrivateRoutes";
import ArticlePrivateRoutes from "./routes/ArticlePrivateRoutes";
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
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPrivateRoutes from './routes/AdminPrivateRoutes';
import ReportPrivateRoutes from './routes/ReportPrivateRoutes';
import Resetpassword from './pages/User/Auth/Resetpassword';
import Resetpass from './pages/User/Auth/Resetpass';

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
                        <Route path="/resetPassword" component={Resetpassword} />
                        <Route path="/password/:token" component={Resetpass} />
                        <Gaurd  path="/project" token='user-token' routeRedirect='/login' component={ProjectListPrivateRoutes} />
                        <Gaurd  path="/profile/:id" token='user-token' routeRedirect='/login' component={ProfilePrivateRoute} />
                        <Gaurd  path="/user/:id" token='user-token' routeRedirect='/login' component={SettingPrivateRoutes} />
                        <Gaurd  path="/favorite" token='user-token' routeRedirect='/login' component={FavoritePrivateRoutes} />
                        <Gaurd  path="/notifications" token='user-token' routeRedirect='/login' component={NotificationsPrivateRoutes} />
                        <Gaurd  path="/messages" token='user-token' routeRedirect='/login' component={MessengerPrivateRoutes} />
                        <Gaurd  path="/funder" token='user-token' routeRedirect='/login' component={FundersPrivateRoutes} />
                        <Gaurd  path="/funders" token='user-token' routeRedirect='/login' component={FundersPrivateRoutes} />
                        <Gaurd  path="/articles" token='user-token' routeRedirect='/login' component={ArticlePrivateRoutes} />


                        <Route  path="/admin/login" component={AdminLogin} />
                        <Gaurd  path="/admin" token='admin-token' routeRedirect='/admin/login' component={AdminPrivateRoutes} />
                        <Gaurd  path="/reports" token='admin-token' routeRedirect='/admin/login' component={ReportPrivateRoutes} />


                        <Gaurd path="/noauthorization/:id" token='user-token' routeRedirect='/login'  component={NoAuthorization} />
                        <Gaurd path="/notfound/:id" token='user-token' routeRedirect='/login'  component={NotFound} />
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