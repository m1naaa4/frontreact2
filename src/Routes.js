import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {LanguageProvider} from "./containers/Language";
import UserLogin from "./pages/User/Auth/Login";
import UserRegister from "./pages/User/Auth/Register";
import {Gaurd} from './Gaurd'
import PorteurPrivateRoutes from "./routes/PorteurPrivateRoutes";
import AddProjectRoutes from "./routes/AddProjectRoutes";

const Routes = (props) => {

    return (
        <div>
            <Switch>
                <LanguageProvider>
                    <Route  exact path="/" render={ props=>(
                        <Redirect to={{pathname: '/login'}} />
                    )} />
                    <Route path="/login" component={UserLogin} />
                    <Route path="/register" component={UserRegister} />
                    <Gaurd  path="/projects" token='user-token' routeRedirect='/login' component={PorteurPrivateRoutes} />
                    <Gaurd  path="/projects" token='user-token' routeRedirect='/login' component={AddProjectRoutes} />
                </LanguageProvider>
            </Switch>
        </div>
    )
}
export default Routes;