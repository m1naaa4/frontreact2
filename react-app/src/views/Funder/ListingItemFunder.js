import React, { useState} from 'react'
import { Player } from 'video-react';
import SharePopUp from '../../utils/SharePopUp'
import { useHistory } from "react-router-dom";
import slugify from 'react-slugify';
import {countryName, financeLabel, sectorName} from '../../helpers/Helpres'
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import $ from 'jquery'


const ListingItemFunder = ({ project }) => {
    const [shareUrl, setShareUrl] = useState(false);
    let history = useHistory();
    const { t } = useTranslation();

    let url_to_share = slugify(project.name, { prefix: `${process.env.REACT_APP_FRONT_URL}`+'/funder/'+project.id });

    const showPage = (id) => {
         history.push('/funder/show/'+ id)
    };

    const getExtension = (file) => {
        if (/^(https?:\/\/)?((www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/.test(file)) {
            return 'youtube';
        } else if (/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/.test(file)) {
            return 'vimeo';
        } else {
            return file.split('.').pop().toLowerCase();
        }
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
                        {(function() {
                            let link = $.isArray(project.media) ? project.media[0] : project.media;
                            if(getExtension(link) == 'youtube'){
                                return <ReactPlayer width='340' url={link} controls={true} />
                            }else{
                                if(getExtension(link) == 'vimeo'){
                                    return <ReactPlayer url={link} controls={true} />
                                }else{
                                    if(getExtension(link) == 'mp4' || getExtension(link) == ('x-mpeg2') ||
                                        getExtension(link) == ('x-msvideo') || getExtension(link) == ('quicktime')){
                                        return <ReactPlayer url={link} controls={true} />
                                    } else if (/\.(doc|docx|xls|xlsx|ppt|pptx|csv|pdf)$/i.test(link)) {
                                        return <div className="Doc-Wrap">
                                            <a href="#!">
                                                <div className="Doc-Icon" height='300'><span className="Doc-Type">file</span><i className="uil uil-file-alt"></i></div>
                                            </a>
                                        </div>
                                    }
                                    else{
                                        return <img width="100%" height="300" src={link} alt="Project"/>
                                    }
                                }
                            }
                        })()}
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