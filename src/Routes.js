import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {LanguageProvider} from "./containers/Language";
import UserLogin from "./pages/User/Auth/Login";
import UserRegister from "./pages/User/Auth/Register";
import {Gaurd} from './Gaurd'
import ProjectListPrivateRoutes from "./routes/ProjectListPrivateRoutes";
import ProfilePrivateRoute from "./routes/ProfilePrivateRoutes";
import MessengerPrivateRoutes from './routes/MessengerPrivateRoutes';
import NotFound from './pages/404';
import Opps from './pages/500';

const Routes = (props) => {

    return (
        <div>
            <LanguageProvider>
                <Switch>
                        <Route  exact path="/" render={ props=>(
                            <Redirect to={{pathname: '/login'}} />
                        )} />
                        <Route exact path="/login" component={UserLogin} />
                        <Route path="/register" component={UserRegister} />
                        <Gaurd  path="/project" token='user-token' routeRedirect='/login' component={ProjectListPrivateRoutes} />
                        <Gaurd  path="/profile" token='user-token' routeRedirect='/login' component={ProfilePrivateRoute} />
                        <Gaurd  path="/messages" token='user-token' routeRedirect='/login' component={MessengerPrivateRoutes} />
                
                        <Route exact path="/oops" component={Opps} />

                        <Route component={NotFound} />
                </Switch>
            </LanguageProvider>

        </div>
    )
}
export default Routes;