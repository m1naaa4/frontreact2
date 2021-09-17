import React, { useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import {Text} from "../../containers/Language";
import { Player } from 'video-react';
import VideoPlayer from 'simple-react-video-thumbnail'
import SharePopUp from '../../utils/SharePopUp'
import {countryName} from '../../helpers/Helpres'
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
    let url_to_share = slugify(project.name, { prefix: config.urls.front+'/project/show/'+project.id });

    const addTofavorite = (id) => {
        setClasse(!classe)
        let data = {
            'url' : 'favorite/addToFavorite',
            'provider_id' : id,
            'provider' : 'project',
        }
        dispatch(AddFavoriteAction(data))
    }

    const goToShowproject = (id) => {
        history.push('/project/show/'+ id)
     };
    return (

             <div className="offer-box">
                    <div className="offer-header">
                        <div className="offer-title">
                            <h3><NavLink to={`/project/show/${project.id}`}>{project.name}</NavLink></h3>
                            <span>{project.sector}</span>
                        </div>
                        <div className="offer-logo">
                            <button className={`${classe ? 'near-deadline' : ''} offer-bookmark`} onClick={e => addTofavorite(project.id)} type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i class="uil uil-bookmark"></i></button>
                            <img src={project.logo_link} style={{ height: "60" , width: "40"}}  title="Nom du projet" alt=""/>
                        </div>
                    </div>
                    <div className="offer-media">
                        {
                            project.is_video ? (
                                // <VideoPlayer videoUrl={project.media_link} snapshotAt={10} />
                                <Player width="100%" height="100%"
                                    playsInline
                                    poster="/assets/poster.png"
                                    src={project.media_link}
                                />
                                ) : (<img width="100%" height="300" src={project.media_link} alt="Project"/>)
                        } 
                    </div>
                    <div className="offer-meta">
                        <ul className="meta-items">
                            <li className="meta-item">
                                <div className="meta-icon">
                                    <img src="/assets/images/icons/marker.svg" alt=""/>
                                </div>
                                <div className="meta-details">
                                    <span className="meta-title" onClick={() => goToShowproject(project.id) }><Text tid="targetAreas" /></span>
                                    <span className="meta-value">{countryName(project.project_area)}</span>
                                </div>
                            </li>
                            <li className="meta-item">
                                <div className="meta-icon">
                                    <img src="/assets/images/icons/cost.svg" alt=""/>
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