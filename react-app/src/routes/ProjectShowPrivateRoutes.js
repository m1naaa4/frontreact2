import React, { useEffect, useRef, useState } from 'react'
import { Route, Redirect, useParams, Switch, NavLink } from 'react-router-dom';
import ShowProjectView from '../views/Project/ShowProjectView';

export default function ProjectShowPrivateRoutes(props) {
    const params = useParams()
    const [currentPage, setCurrentPage] = useState()


    return (
        <div className="Single-Wrapper">
            <div className="container">
                <div className="Single-Content">
                    <div className="row">
                        <div className='col-12'>
                            <div className="Profile-Navigation" style={{ top: "5px" }}>
                                <ul className="Profie-Menu">
                                    <li><NavLink className={currentPage === 'details' ? 'active-profile-link' : ''} to={`/project/show/${params.id}`}><i className="uil uil-apps"></i> Details</NavLink></li>
                                    <li><NavLink className={currentPage === 'media' ? 'active-profile-link' : ''} to={`/project/show/${params.id}/media`}><i className="uil uil-user-square"></i> Media</NavLink></li>
                                    <li><NavLink className={currentPage === 'docs' ? 'active-profile-link' : ''} to={`/project/show/${params.id}/docs`}><i className="uil uil-layer-group"></i> Documents</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Switch>
                            <Route exact path={`${props.match.path}`} component={ShowProjectView} />
                            <Route exact path={props.match.path} render={props => (
                                <Redirect to={{ pathname: `${props.match.path}` }} />
                            )} />


                            <Route exact path={`${props.match.path}/media`} component={<></>} />
                            <Route exact path={props.match.path} render={props => (
                                <Redirect to={{ pathname: `${props.match.path}/media` }} />
                            )} />

                            <Route exact path={`${props.match.path}/docs`} component={<></>} />
                            <Route exact path={props.match.path} render={props => (
                                <Redirect to={{ pathname: `${props.match.path}/docs` }} />
                            )} />

                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}