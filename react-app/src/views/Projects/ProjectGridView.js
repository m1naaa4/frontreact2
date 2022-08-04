import React, { useEffect, useState, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Text } from "../../containers/Language";
import { Player } from 'video-react';
import VideoPlayer from 'simple-react-video-thumbnail'
import SharePopUp from '../../utils/SharePopUp'
import { countryName } from '../../helpers/Helpres'
import config from '../../Config'
import slugify from 'react-slugify';
import { useHistory } from "react-router-dom";
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';
import { useDispatch } from 'react-redux';


const ProjectGridView = ({ project }) => {
    const [shareUrl, setShareUrl] = useState(false);
    const [classe, setClasse] = useState(project?.favorite);
    const dispatch = useDispatch();
    let history = useHistory();

    const ref = useRef();
    const [options_List, SetOptions_List] = useState(false);
    const showOptions = () => {
        SetOptions_List(true)
    }
    const hideOptions = () => {
        SetOptions_List(false)
    }

    let url_to_share = slugify(project.name, { prefix: config.urls.front + '/project/show/' + project.id });

    const addTofavorite = (id) => {
        setClasse(!classe)
        let data = {
            'url': 'favorite/addToFavorite',
            'provider_id': id,
            'provider': 'project',
        }
        dispatch(AddFavoriteAction(data))
    }

    const goToShowproject = (id) => {
        localStorage.setItem('provider', 'project')
        localStorage.setItem('provider_name', project.name)
        history.push('/project/show/' + id)
    };
    return (

        <div className="offer-box">
            <div className="offer-header" >
                <div className="offer-title" onMouseEnter={showOptions} onMouseLeave={hideOptions}>
                    {(project.logo_link === '/assets/images/porject-logo.png') ? <img src={project.logo_link} title="Nom du projet" alt="" /> :
                        <img src={project.logo_link} title="Nom du projet" alt="" />}

                    <h3><span onClick={() => goToShowproject(project.id)} data-toggle="tooltip" data-placement="top" title={project.name}>
                        {project.name.substring(0, 10)}</span></h3>
                    <div className='footer-title'>
                        <span className='mr-5'>{project.sector && (project.sector.charAt(0).toUpperCase() + project.sector.slice(1))}, </span>
                        {project.owner && project.owner.map((value) => {
                            return <Link to={`/profile/${value.profile_id}`} data-toggle="tooltip" data-placement="top" title={value.username}>
                                {value.username.substring(0, 6)}
                            </Link>
                        }
                        )}
                        <span>{project.visibility == 'public' ? <i className="uil uil-globe"></i> : ''}</span>
                    </div>
                    {options_List && <div ref={ref} className="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active popup_project_details">
                        {project.owner && project.owner.map((value) => {
                            return <div className="project-popup-item">
                                <Link className='project-popup-item-avatar' to={`/profile/${value.profile_id}`}><img src={value.avatar} alt={value.username} /></Link>
                                <div className="project-popup-item-username">
                                    <Link to={`/profile/${value.profile_id}`}><h5>{value.username}</h5></Link>
                                    <Link to={`/profile/${value.profile_id}`}><span>{value.type}</span></Link>
                                </div>
                            </div>
                        }
                        )}
                    </div>}
                </div>

                <div className="offer-logo">
                    <button className={`${classe ? 'near-deadline' : ''} offer-bookmark`} onClick={e => addTofavorite(project.id)} type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer">
                        {console.log(classe)}
                        <i className={classe ? 'uis uis-bookmark' : 'uil uil-bookmark'} ></i>
                    </button>
                </div>
            </div>
            <div className="offer-media">
                {
                    project.is_video ? (
                        <img width="100%" height="300" src={project.media_link} alt="Project" />
                    ) : (<img width="100%" height="300" src={project.media_link} alt="Project" />)
                }
            </div>
            <div className="offer-meta">
                <ul className="meta-items">
                    <li className="meta-item">
                        <div className="meta-icon">
                            <img src="/assets/images/icons/marker.svg" alt="" />
                        </div>
                        <div className="meta-details">
                            <span className="meta-title" onClick={() => goToShowproject(project.id)}><Text tid="targetAreas" /></span>
                            <span className="meta-value">{countryName(project.project_area)}</span>
                        </div>
                    </li>
                    <li className="meta-item">
                        <div className="meta-icon">
                            <img src="/assets/images/icons/cost.svg" alt="" />
                        </div>
                        <div className="meta-details">
                            <span className="meta-title"><Text tid="funding" /></span>
                            <span className="meta-value">{project.funding_search}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="offer-reactions">
                <ul className="reactions-box">
                    <li className="reaction likes"><i className="dadupa-icon icon-clap"></i>
                        <span>{project.likeCount}</span></li>
                    <li className="reaction views"><i className="uil uil-eye"></i>
                        <span>1500</span></li>
                    <li className="reaction comments"><i
                        className="uil uil-comment-dots"></i> <span>{project.commentCount}</span>
                    </li>
                    <li className="reaction shares" onClick={() => setShareUrl(true)}>
                        <i className="uil uil-share-alt"></i>
                        <span>380 Shares</span>
                    </li>
                </ul>
            </div>
            <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
        </div>

    )
}

export default ProjectGridView;