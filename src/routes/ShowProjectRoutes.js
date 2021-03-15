import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ViewProject from "../views/User/Project/ViewProject";



export default function ShowProjectRoutes(props) {
    return (
        <div>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/show`}  component = {ViewProject} />
                    <Route  exact path={props.match.path} render={ props=>(
                        <Redirect to={{pathname: `${props.match.path}/show` }} />
                    )} />
                </Switch>
            </div>

        </div>
    )
}
