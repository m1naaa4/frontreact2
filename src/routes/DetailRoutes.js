import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import DetailProjectPage from "../pages/User/Profile/DetailProjectPage";



export default function DetailRoutes(props) {
    console.log(props)
    return (
        <div>
            <HeaderProfile props={props}/>
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
