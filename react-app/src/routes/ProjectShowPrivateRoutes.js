import React, { useState, useEffect } from 'react'
import { Route, Redirect, useParams, Switch, NavLink, useLocation } from 'react-router-dom';
import ShowProjectDocs from '../views/Project/ShowProjectDocs';
import ShowProjectMedia from '../views/Project/ShowProjectMedia';
import ShowProjectView from '../views/Project/ShowProjectView';

export default function ProjectShowPrivateRoutes(props) {
    const params = useParams()
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const [currentPage, setCurrentPage] = useState('details')

    useEffect(() => {
        if (currentLocation === 'media') {
            setCurrentPage('media')
        } else if (currentLocation === 'docs') {
            setCurrentPage('docs')
        } else {
            setCurrentPage('details')
        }
    })


    return (
        <div className="Single-Wrapper">
            <div className="container">
                <div className="row">
                    <div className='col-12'>
                        <div className="Profile-Navigation mb-3" style={{ maxWidth: "100%", top: 0 }}>
                            <ul className="Profie-Menu">
                                <li><NavLink className={currentPage === 'details' ? 'active-profile-link' : ''} to={`/project/show/${params.id}`}><i className="uil uil-apps"></i> Details</NavLink></li>
                                <li><NavLink className={currentPage === 'media' ? 'active-profile-link' : ''} to={`/project/show/${params.id}/media`}><i className="uil uil-user-square"></i> Media</NavLink></li>
                                <li><NavLink className={currentPage === 'docs' ? 'active-profile-link' : ''} to={`/project/show/${params.id}/docs`}><i className="uil uil-layer-group"></i> Documents</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route exact path={`${props.match.path}`} component={ShowProjectView} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}` }} />
                    )} />


                    <Route exact path={`${props.match.path}/media`} component={ShowProjectMedia} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/media` }} />
                    )} />

                    <Route exact path={`${props.match.path}/docs`} component={ShowProjectDocs} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/docs` }} />
                    )} />

                </Switch>
            </div>
        </div>
    )
}