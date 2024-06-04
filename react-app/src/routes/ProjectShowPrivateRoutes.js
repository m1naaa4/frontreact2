import React, { useState, useEffect } from 'react'
import { Route, Redirect, useParams, Switch, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ShowProjectDocs from '../views/Project/ShowProjectDocs';
import ShowProjectImgs from '../views/Project/ShowProjectImgs';
import ShowProjectVids from '../views/Project/ShowProjectVids';
import ShowProjectView from '../views/Project/ShowProjectView';
import { getProjectAction } from '../store/actions/Project/ProjectAction';


export default function ProjectShowPrivateRoutes(props) {
    const params = useParams()
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const [currentPage, setCurrentPage] = useState('details')

    useEffect(() => {
        if (currentLocation === 'images') {
            setCurrentPage('images')
        } else if (currentLocation === 'videos') {
            setCurrentPage('videos')
        } else if (currentLocation === 'docs') {
            setCurrentPage('docs')
        } else {
            setCurrentPage('details')
        }
    })

    const fullproject = useSelector(state => state.getproject);
    const project = fullproject?.getproject.project?.project;    

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProjectAction(params.id, '/get'));
    }, [dispatch]);

    return (
        <div className="Single-Wrapper">
            <div className="container">
                <div className="row">
                    <div className='col-12'>
                        <div className="Profile-Navigation mb-3" style={{ maxWidth: "100%", top: 0 }}>
                            <ul className="Profie-Menu">
                                <li><NavLink className={currentPage === 'details' ? 'active-profile-link' : ''} to={`/project/show/${params.id}`}><i className="uil uil-user-square"></i> Details</NavLink></li>
                                <li><NavLink className={currentPage === 'images' ? 'active-profile-link' : ''} to={`/project/show/${params.id}/images`}><i class="uil uil-images"></i> Images</NavLink></li>
                                <li><NavLink className={currentPage === 'videos' ? 'active-profile-link' : ''} to={`/project/show/${params.id}/videos`}><i class="uil uil-video"></i> Videos</NavLink></li>
                                <li><NavLink className={currentPage === 'docs' ? 'active-profile-link' : ''} to={`/project/show/${params.id}/docs`}><i class="uil uil-file-alt"></i> Documents</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-12'>
                        {
                            currentPage != "details" && project != undefined &&
                            <h1 className='text-uppercase'>
                                {currentPage + ': ' + project.name}
                            </h1>
                        }
                    </div>
                </div>
                <Switch>
                    <Route exact path={`${props.match.path}`} component={ShowProjectView} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}` }} />
                    )} />


                    <Route exact path={`${props.match.path}/images`} component={ShowProjectImgs} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/images` }} />
                    )} />

                    <Route exact path={`${props.match.path}/videos`} component={ShowProjectVids} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/videos` }} />
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