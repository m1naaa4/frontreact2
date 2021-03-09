import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {LanguageProvider} from "./containers/Language";
import UserLogin from "./pages/User/Auth/Login";
import UserRegister from "./pages/User/Auth/Register";
import {Gaurd} from './Gaurd'
import ProjectListPrivateRoutes from "./routes/ProjectListPrivateRoutes";
import AddProjectRoutes from "./routes/AddProjectRoutes";
import ShowProjectRoutes from "./routes/ShowProjectRoutes";

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
                    <Gaurd  path="/project" token='user-token' routeRedirect='/login' component={ProjectListPrivateRoutes} />
                </LanguageProvider>
            </Switch>
        </div>
    )
}
export default Routes;