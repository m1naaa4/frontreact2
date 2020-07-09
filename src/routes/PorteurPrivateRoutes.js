import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Porteur from "../pages/User/Profile/Porteur";
import HeaderProfile from "../layout/Header/HeaderProfile";



export default function PorteurPrivateRoutes(props) {
    return (
        <div>
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/lists`}  component={Porteur} />
                    <Route  exact path={props.match.path} render={ props=>(
                        <Redirect to={{pathname: `${props.match.path}/lists` }} />
                    )} />
                </Switch>
            </div>

        </div>
    )
}
