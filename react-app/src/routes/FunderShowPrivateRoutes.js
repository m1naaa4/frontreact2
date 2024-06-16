import React, { useState, useEffect } from 'react'
import { Route, Redirect, useParams, Switch, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GetFunder } from '../store/actions/Funder/FunderActions';
import ViewFunder from '../views/Funder/ViewFunder';
import ShowFunderImgs from '../views/Funder/Media/ShowFunderImgs';
import ShowFunderVids from '../views/Funder/Media/ShowFunderVids';
import ShowFunderDocs from '../views/Funder/Media/ShowFunderDocs';


export default function FunderShowPrivateRoutes(props) {
    const params = useParams();
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[location.pathname.split('/').length - 1];
    const [currentPage, setCurrentPage] = useState('details');

    useEffect(() => {
        if (currentLocation === 'images') {
            setCurrentPage('images');
        } else if (currentLocation === 'videos') {
            setCurrentPage('videos');
        } else if (currentLocation === 'docs') {
            setCurrentPage('docs');
        } else {
            setCurrentPage('details');
        }
    })

    const project = useSelector(state => state.funders.funder);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetFunder('/' + params.id));
    }, [dispatch]);

    return (
        <div className="Single-Wrapper">
            <div className="container">
                <div className="row">
                    <div className='col-12'>
                        <div className="Profile-Navigation mb-3" style={{ maxWidth: "100%", top: 0 }}>
                            <ul className="Profie-Menu">
                                <li><NavLink className={currentPage === 'details' ? 'active-profile-link' : ''} to={`/funder/show/${params.id}`}><i className="uil uil-user-square"></i> Details</NavLink></li>
                                <li><NavLink className={currentPage === 'images' ? 'active-profile-link' : ''} to={`/funder/show/${params.id}/images`}><i className="uil uil-apps"></i> Images</NavLink></li>
                                <li><NavLink className={currentPage === 'videos' ? 'active-profile-link' : ''} to={`/funder/show/${params.id}/videos`}><i className="uil uil-apps"></i> Videos</NavLink></li>
                                <li><NavLink className={currentPage === 'docs' ? 'active-profile-link' : ''} to={`/funder/show/${params.id}/docs`}><i className="uil uil-layer-group"></i> Documents</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-12'>
                        {
                            currentPage != "details" && project != undefined &&
                            <ul className='detail-page-breadcrumbs'>
                                <li className='detail-breadcrumbs-item'>{project.name}</li>
                                <li className='detail-breadcrumbs-item current-item'>{currentPage}</li>
                            </ul>
                        }
                    </div>
                </div>
                <Switch>
                    <Route exact path={`${props.match.path}`} component={ViewFunder} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}` }} />
                    )} />

                    <Route exact path={`${props.match.path}/images`} component={ShowFunderImgs} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/images` }} />
                    )} />

                    <Route exact path={`${props.match.path}/videos`} component={ShowFunderVids} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/videos` }} />
                    )} />

                    <Route exact path={`${props.match.path}/docs`} component={ShowFunderDocs} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/docs` }} />
                    )} />

                </Switch>
            </div>
        </div>
    )
}