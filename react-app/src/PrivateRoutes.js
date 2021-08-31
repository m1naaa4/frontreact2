import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import PorteurPrivateRoutes from "./routes/PorteurPrivateRoutes";
import AddProjectRoutes from "./routes/AddProjectRoutes";
import ShowProjectRoutes from "./routes/ShowProjectRoutes";



export default function PrivateRoutes(props) {
    return (
        <div>
            <Switch>
                <Route  exact path={`${props.match.path}/project/show`} component={PorteurPrivateRoutes}/>
                <Route  exact path={`${props.match.path}/projectss`} component={AddProjectRoutes} />
                <Route  exact path={`${props.match.path}/projects`} component={ShowProjectRoutes} />
                
                <Route  exact path={props.match.path} render={ props=>(
                <Redirect to={{pathname: `${props.match.path}/project` }} />
                    )} />
    
            </Switch>     
        </div>
    )
}