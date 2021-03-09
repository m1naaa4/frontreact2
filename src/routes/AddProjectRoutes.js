import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from '../layout/Header/HeaderProfile';
import AddProjectPage from "../pages/User/Project/AddProjectPage";



export default function AddProjectRoutes(props) {
    return (
        <div>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/create`}  component = {AddProjectPage} />
                    <Route  exact path={props.match.path} render={ props=>(
                        <Redirect to={{pathname: `${props.match.path}/create` }} />
                    )} />
                </Switch>
            </div>

        </div>
    )
}
