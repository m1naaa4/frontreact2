import React, { useState, useEffect } from 'react'
import { Route, Redirect, useParams, Switch, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GetMentor } from '../store/actions/Mentor/MentorActions';
import ViewMentor from '../views/Mentor/ViewMentor';
import ShowMentorImgs from '../views/Mentor/Media/ShowMentorImgs';
import ShowMentorVids from '../views/Mentor/Media/ShowMentorVids';
import ShowMentorDocs from '../views/Mentor/Media/ShowMentorDocs';


export default function MentorShowPrivateRoutes(props) {
    const params = useParams();
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
    });

    const project = useSelector(state => state.mentors.mentor);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetMentor('/' + params.id));
    }, [dispatch]);

    return (
        <div className="Single-Wrapper">
            <div className="container">
                <div className="row">
                    <div className='col-12'>
                        <div className="Profile-Navigation mb-3" style={{ maxWidth: "100%", top: 0 }}>
                            <ul className="Profie-Menu">
                                <li><NavLink className={currentPage === 'details' ? 'active-profile-link' : ''} to={`/mentor/show/${params.id}`}><i className="uil uil-user-square"></i> Details</NavLink></li>
                                <li><NavLink className={currentPage === 'images' ? 'active-profile-link' : ''} to={`/mentor/show/${params.id}/images`}><i className="uil uil-apps"></i> Images</NavLink></li>
                                <li><NavLink className={currentPage === 'videos' ? 'active-profile-link' : ''} to={`/mentor/show/${params.id}/videos`}><i className="uil uil-apps"></i> Videos</NavLink></li>
                                <li><NavLink className={currentPage === 'docs' ? 'active-profile-link' : ''} to={`/mentor/show/${params.id}/docs`}><i className="uil uil-layer-group"></i> Documents</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-12'>
                        {
                            currentPage != "details" && project != undefined &&
                            <h1 className='text-uppercase'>
                                {/* <i className="uil uil-apps"></i>  */}
                                {currentPage + ': ' + project.name}
                            </h1>
                        }
                    </div>
                </div>
                <Switch>
                    <Route exact path={`${props.match.path}`} component={ViewMentor} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}` }} />
                    )} />


                    <Route exact path={`${props.match.path}/images`} component={ShowMentorImgs} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/images` }} />
                    )} />

                    <Route exact path={`${props.match.path}/videos`} component={ShowMentorVids} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/videos` }} />
                    )} />

                    <Route exact path={`${props.match.path}/docs`} component={ShowMentorDocs} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/docs` }} />
                    )} />

                </Switch>
            </div>
        </div>
    )
}