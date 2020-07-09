import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import DetailProjectPage from "../pages/User/Profile/DetailProjectPage";



export default function DetailProjectRoutes(props) {
    return (
        <div>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/addproject`}  component = {DetailProjectPage} />
                    <Route  exact path={props.match.path} render={ props=>(
                        <Redirect to={{pathname: `${props.match.path}/addproject` }} />
                    )} />
                </Switch>
            </div>

        </div>
    )
}
