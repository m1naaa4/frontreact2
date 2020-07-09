import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import AddProjectPage from "../pages/User/Profile/AddProjectPage";



export default function AddProjectRoutes(props) {
    return (
        <div>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/addproject`}  component = {AddProjectPage} />
                    <Route  exact path={props.match.path} render={ props=>(
                        <Redirect to={{pathname: `${props.match.path}/addproject` }} />
                    )} />
                </Switch>
            </div>

        </div>
    )
}
