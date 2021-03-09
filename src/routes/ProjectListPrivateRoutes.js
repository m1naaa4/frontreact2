import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ListProject from "../pages/User/Project/ListProject";
import HeaderProfile from "../layout/Header/HeaderProfile";
import ViewProject from '../views/User/Project/ViewProject';
import AddProjectPage from "../pages/User/Project/AddProjectPage"


export default function ProjectListPrivateRoutes(props) {
    console.log('props')
    console.log( props.history.location.pathname)
    return (
        <div>
            <HeaderProfile props={props}/>
            <div className="Dadupa-Page">
            {(() => {
                switch(props.history.location.pathname){
                    case '/project/lists': 
                        return (
                            <Switch>
                                <Route exact path={`${props.match.path}/lists`}  component = {ListProject} />
                                <Route  exact path={props.match.path} render = { props => (
                                    <Redirect to={{pathname: `${props.match.path}/lists` }} />
                                )} />
                            </Switch>
                        );
                    case '/project/create': 
                        return (
                            <Switch>
                                <Route exact path={`${props.match.path}/create`}  component = {AddProjectPage} />
                                <Route  exact path={props.match.path} render = { props => (
                                    <Redirect to={{pathname: `${props.match.path}/create` }} />
                                )} />
                            </Switch>
                        );
                    case '/project/show': console.log('dfdfd')
                        return (
                            <Switch>
                                <Route exact path={`${props.match.path}/show`}  component = {ViewProject} />
                                <Route  exact path={props.match.path} render = { props => (
                                    <Redirect to={{pathname: `${props.match.path}/show` }} />
                                )} />
                            </Switch>
                        );
                    default: 
                        return  (
                            <Switch>
                                <Route exact path={`${props.match.path}/lists`}  component = {ListProject} />
                                <Route  exact path={props.match.path} render = { props => (
                                    <Redirect to={{pathname: `${props.match.path}/lists` }} />
                                )} />
                            </Switch>
                        );
                }
            })()
            }
                
            </div>

        </div>
    )
}
