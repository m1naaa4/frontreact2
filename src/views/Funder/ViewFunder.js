import React, { useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { Player } from 'video-react';
import SharePopUp from '../../utils/SharePopUp'
import { useHistory, useParams } from "react-router-dom";
import config from '../../Config'
import slugify from 'react-slugify';
import {countryName, financeLabel, sectorName, typeFunderName} from '../../helpers/Helpres'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import ProjectSkeletonGrid from "../../skeleton/ProjectSkeletonGrid";
import {GetFunder} from "../../store/actions/Funder/FunderActions";
import parse from 'html-react-parser';
import Comments from '../Comments';
import { LikeAction } from '../../store/actions/Like/LikeAction';


const ViewFunder = (props) => {
    const params = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [urlToShare, setUrlToShare] = useState("");
    const [shareUrl, setShareUrl] = useState(false);
    let history = useHistory();
    const { t, i18n } = useTranslation();
    const loading = useSelector(state => state.funders.loading);
    const dispatch = useDispatch();
    const project =  useSelector(state => state.funders.data);

    useEffect(() => {
        dispatch(GetFunder(params.id, props));
    }, [dispatch])

    useEffect(() => {
        if(!loading){
            setIsLike(project.is_liked)
            setLikeCount(project.likeCount);
            setUrlToShare(slugify(project.name, { prefix: config.urls.front+'/funder/'+params.id }));
        }
        setIsLoaded(true);
    }, [project])

    
    const likeClick = () => {
        setIsLike(!isLike);
        let like_type = isLike?'dislike':'like'
        const dataa = {
            action: "like",
            provider_id: params.id,
            provider: "funder",
            type    : like_type,
        }
        dispatch(LikeAction(dataa, 'like/like', props));
        if(like_type === 'like'){
            setLikeCount(likeCount + 1);
        }else{
            if(likeCount > 0)
                setLikeCount(likeCount - 1)
        }
    }

    const goToEdit = () => {
        history.push('/funder/update/'+params.id)
    }

    return (
        <div className="Single-Wrapper">
            <div className="container">
            {
                loading ? (
                    <ProjectSkeletonGrid/>
                ) : (project.success === true && isLoaded) ? (
                        <div className="Single-Content">
                        <div className="row">
                        <div className="col-md-8">
                            <div className="single-header">
                                {/* <div className="signle-offer-type">Project Financement</div> */}
                                <div className="single-offer-header">
                                    <h3 className="single-offer-name">{project.name}</h3>
                                </div>
                            </div>
            
                            <div className="Company-Infos">
                                <div className="Company-Left">
                                    <div className="single-offer-logo">
                                        <img src={project.logo} title="Nom du projet" alt="" />
                                        {/* <button className="offer-bookmark" type="button" name="button"><i className="uil uil-bookmark"></i></button> */}
                                        {!project.date_limit && <label className="no-deadline" data-toggle="tooltip" data-placement="bottom" title={t('has_deadline')}><i className="uil uil-bell"></i></label>}
                                    </div>
                                    <div className="Company-Name"></div>
                                    <div className="Company-Email">{project.email}</div>
                                    <div className="Company-Addresse">{project.address}</div>
                                </div>
                                <div className="Company-Right">
                                    <div className="Company-Phone"><a href={"tel:"+project.phone}><i className="uil uil-phone-alt"></i> {project.phone}</a></div>
                                    { project.website && 
                                        <div className="Company-Website"><a href="#!"><i className="uil uil-globe"></i> {t('postuler')}</a></div>
                                    }
                                </div>
                            </div>
            
                            <div className="Content-Wrap">
                                <div className="Signle-Offer-Media">
                                    {
                                            project.is_video ? (
                                            <Player width="100%" height="100%"
                                                playsInline
                                                poster="/assets/poster.png"
                                                src={project.media}
                                            />) : (<img width="100%" className="img-fluid" src={project.media} alt={project.name}/>)
                                    }    
                                </div>
                
                                <div className="Signle-Offer-Content">
                                    <div className="reactions-wrap">
                                        <div className="reactions-box">
                                            <div className="row">
                                            <div className="col-6 col-md-4 col-lg-6">
                                                <div className="reaction likes"><i className="dadupa-icon icon-clap"></i> <span>{likeCount}</span></div>
                                                <div className="reaction views"><i className="uil uil-eye"></i> <span>{project.visit}</span></div>
                                            </div>
                                            <div className="col-6 col-md-8 col-lg-6 text-right">
                                                <div className="reaction comments"><span>{project.commentCount} {t('comments')}</span></div>
                                                <div className="reaction shares"><span>{project.shared} {t('share')}</span></div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reactions-buttons">
                                        <button className={isLike ? "reaction-button reaction-like reaction-clicked post-liked" : "reaction-button reaction-like " } onClick={likeClick} type="button" name="button">
                                            <img src="/assets/images/icons/dadupa-like.svg" alt="" />
                                            {t('clap')}
                                        </button>
                                        <a className="reaction-button reaction-comment" href="#Comments-Wrap">
                                            <img src="/assets/images/icons/dadupa-comment.svg" alt="" />
                                            {t('commenter')}
                                        </a>
                                        <button className="reaction-button" type="button" name="button" onClick={() => setShareUrl(true)}>
                                            <img src="/assets/images/icons/dadupa-share.svg" alt="" />
                                            {t('share')}
                                        </button>
                                    </div>
                                    <div className="Signle-Offer-Text">
                                        {project.description &&  parse(project.description)}
                                    </div>
                
                                </div>
                            </div>
            
                            {project.id && <Comments  provider_id={project.id} provider="funder" />}
                        </div>
                        
                        <div className="col-md-4">
                            <div className="Post-Actions">
                                {project.is_author && 
                                    <div className="Update-Post">
                                        <button type="button" name="button" onClick={goToEdit}  data-toggle="tooltip" data-placement="bottom" title="Edit Post" className="edit-button"><i className="uil uil-pen"></i></button>
                                    </div>
                                }
                            
                                {/* <div className="Send-Message">
                                    <button className="Button-Send" type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Send a message"><span>Envoyer un message</span> <i className="uil uil-message"></i></button>
                                </div> */}

                            </div>
                            <div className="Single-Offer-Details">
                                <ul className="Offer-Details-List">
                                    <li className="Offer-Item">
                                    <label>{t('published_at')}</label>
                                    <span>{project.created_at && project.created_at.date}</span>
                                    </li>
                                    <li className="Offer-Item">
                                    <label>{t('filter.funder.type')}</label>
                                    <span>{t(typeFunderName(project.type))}</span>
                                    </li>
                                    <li className="Offer-Item">
                                    <label>{t('target_sector')}</label>
                                    <span>{t(sectorName(project.sector_id))}</span>
                                    </li>
                                    <li className="Offer-Item">
                                    <label>{t('target_zone')}</label>
                                    <span>{t(countryName(project.zone))}</span>
                                    </li>
                                    <li className="Offer-Item">
                                    <label>{t('funder.form.financement')}</label>
                                    <span>{t(financeLabel(project.finances))}</span>
                                    </li>
                                </ul>
                            </div>
                            {project.tags.length > 0 && 
                                <div className="Single-Offer-Tags">
                                    <h3>{t('tags')}</h3>
                                    
                                        <ul className="Tags-List">
                                            {project.tags.map((name, index) => (
                                                <li className="Tag-Item" key={index}>
                                                    {name}
                                                </li>
                                            ))}
                                        </ul>
                                </div>
                            }
            
                            {/* <div className="Co-Porteurs">
                                <h3>Co-financeurs</h3>
                                <ul className="Co-Porteurs-List">
                                    <li className="Co-Porteur">
                                        <a href="#">
                                        <div className="Co-Porteur-Profile">
                                            <img src="assets/images/abbass-iya.jpg" />
                                        </div>
                                        <div className="Co-Porteur-Name">cscscs</div>
                                        </a>
                                    </li>                         
                                </ul>
                            </div> */}
                        </div>
                        </div>
                    </div>
                ): (
                    <div data-testid="error-message">ERROR</div>
                )
            }

                <SharePopUp url={urlToShare} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
            </div>
      </div>
    )
}

export default ViewFunder;