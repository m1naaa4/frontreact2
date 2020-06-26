import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {LanguageProvider} from "./containers/Language";
import UserLogin from "./pages/User/Auth/Login";
import UserRegister from "./pages/User/Auth/Register";
import {Gaurd} from './Gaurd'
import PorteurPrivateRoutes from "./routes/PorteurPrivateRoutes";
import DetailRoutes from "./routes/DetailRoutes";

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
                    <Gaurd  path="/addproject" token='user-token' routeRedirect='/login' component={DetailRoutes} />
                </LanguageProvider>
            </Switch>
        </div>
    )
}
export default Routes;