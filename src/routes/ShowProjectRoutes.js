import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import AddProjectPage from "../pages/User/Profile/AddProjectPage";
import ViewProject from "../views/User/Project/ViewProject";
import FinalView from "../views/User/Project/Step/FinalView";



export default function ShowProjectRoutes(props) {
    return (
        <div>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/show`}  component = {FinalView} />
                    <Route  exact path={props.match.path} render={ props=>(
                        <Redirect to={{pathname: `${props.match.path}/show` }} />
                    )} />
                </Switch>
            </div>

        </div>
    )
}
