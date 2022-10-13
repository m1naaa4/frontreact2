import React, { useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import {Text} from "../../containers/Language";
import { Player } from 'video-react';
import VideoPlayer from 'simple-react-video-thumbnail'
import SharePopUp from '../../utils/SharePopUp'
import { useHistory } from "react-router-dom";
import slugify from 'react-slugify';
import {countryName, financeLabel, sectorName} from '../../helpers/Helpres'
import { useTranslation } from 'react-i18next';


const ListingItemFunder = ({ project }) => {
    const [shareUrl, setShareUrl] = useState(false);
    let history = useHistory();
    const { t, i18n } = useTranslation();

    let url_to_share = slugify(project.name, { prefix: `${process.env.REACT_APP_FRONT_URL}`+'/funder/'+project.id });

    const showPage = (id) => {
         history.push('/funder/'+ id)
    };

    return (

             <div className="offer-box">
                    <div className="offer-header">
                        <div className="offer-title" onClick={() => showPage(project.id) } >
                            <h3>{project.name}</h3>
                            <span>{t(sectorName(project.sector_id))}</span>
                        </div>
                        <div className="offer-logo">
                            {/* <button className="offer-bookmark" type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i className="uil uil-bookmark"></i></button> */}
                            {!project.date_limit && <label className="no-deadline" data-toggle="tooltip" data-placement="bottom" title={t('has_deadline')}><i className="uil uil-bell"></i></label>}

                            <img src={project.logo} style={{ height: "45" , width: "45"}}  title="Nom du projet" alt=""/>
                        </div>
                    </div>
                    <div className="offer-media">
                        {
                            project.is_video ? (
                                // <VideoPlayer videoUrl={project.media_link} snapshotAt={10} />
                                <Player width="100%" height="100%"
                                    playsInline
                                    poster="/assets/poster.png"
                                    src={project.medi}
                                />
                                ) : (<img width="100%" height="300" src={project.media} alt="Project"/>)
                        } 
                    </div>
                    <div className="offer-meta">
                        <ul className="meta-items">
                            <li className="meta-item">
                                <div className="meta-icon">
                                    <img src="/assets/images/icons/marker.svg" alt=""/>
                                </div>
                                <div className="meta-details">
                                    <span className="meta-value">{countryName(project.zone)}</span>
                                </div>
                            </li>
                            <li className="meta-item">
                                <div className="meta-icon">
                                    <img src="/assets/images/icons/value.svg" alt=""/>
                                </div>
                                <div className="meta-details">
                                    <span className="meta-value">{ t(financeLabel(project.finances)) }</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="offer-reactions">
                        <ul className="reactions-box">
                            <li className="reaction likes"><i className="dadupa-icon icon-clap"></i><span>{project.likeCount}</span></li>
                            <li className="reaction views"><i className="uil uil-eye"></i><span>{project.visit}</span></li>
                            <li className="reaction comments"><i className="uil uil-comment-dots"></i> <span>{project.commentCount}</span></li>
                            <li className="reaction shares" onClick={() => setShareUrl(true)}><i className="uil uil-share-alt"></i><span>{project.shared} {t('share')}</span></li>
                        </ul>
                    </div>
                    <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
                </div>

    )
}

export default ListingItemFunder;