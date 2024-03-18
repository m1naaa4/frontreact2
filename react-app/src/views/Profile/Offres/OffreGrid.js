import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useOutsideClick from '../../../helpers/useOutsideClick';
import { DeleteAction } from '../../../store/actions/Offres/MyContentAction';
import ReactPlayer from 'react-player';
import $ from "jquery";
import sectors from '../../../data/sectorsCreate';
import { useTranslation } from 'react-i18next';

export default function OffreGrid({ offre }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef();
    const user = useSelector(state => state.userProfile.userProfile);
    const [sector, setSector] = useState();

    const [options_List, SetOptions_List] = useState(false);
    const [user_id, setUserId] = useState();

    const [t] = useTranslation();


    useEffect(() => {
        setUserId(user.id);
    }, [user])

    const showOptions = () => {
        SetOptions_List(!options_List)
    }
    const addTofavorite = (id) => {

    }

    useOutsideClick(ref, () => {
        SetOptions_List(false)
    });

    const edit = (id) => {
        history.push('/project/update/' + id);
    }

    const deletecontent = (id) => {
        let data = {
            url: 'creation/delete',
            provider_id: offre.id,
            provider: offre.provider
        }
        dispatch(DeleteAction(data));
        dispatch({ type: 'DELETE_MY_CONTENT_SUCCESS', data });
        SetOptions_List(!options_List)
    }
    const getExtension = (file) => {
        if (file) {
            if (/^(https?:\/\/)?((www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/.test(file)) {
                return 'youtube';
              } else if (/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/.test(file)) {
                return 'vimeo';
              } else {
                return file.split('.').pop().toLowerCase();
              }
        }
    };

    useEffect(() => {
        sectors.map((key) =>
        {
            if (key[0] === offre.sector) {
                setSector(t(key[1]))
            }
        }
        );
    },[])

    const handleImageError = (event) => {
        event.target.src = '/assets/images/offer-thumbnail.svg';
    };

    return (
        <>
            <div className="offer-box">
                <div className="offer-header">
                    <div className="offer-title">
                        {
                            offre.logo_link != null
                                ? <img src={offre.logo_link} style={{ height: "50", width: "40" }} title="Nom du projet" alt="" />
                                : <img src="/assets/images/porject-logo.png" style={{ height: "50", width: "40" }} title="Nom du projet" alt="" />
                        }

                        <h3><Link to={`/project/show/${offre.id}`}>{offre.name}</Link></h3>
                        <span>{t(`${sector}`)} {offre.visibility === 'public' && <i className="uil uil-globe"></i>}</span>
                    </div>
                    <div className="offer-logo">
                        <button className="offer-bookmark" type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i className="uil uil-bookmark"></i></button>
                        <button type="button" className="PostOptions-BTN" onClick={showOptions}><i className="uil uil-ellipsis-h"></i></button>
                    </div>


                    {
                        options_List && (
                            <ul className="PostOptions-List PostOptions-ListShow" ref={ref} >
                                <li className="PostFavorite">
                                    <button onClick={e => addTofavorite(offre.id)}><i className="uil uil-favorite"></i> {('favorite')}</button>
                                </li>
                                {/* <li className="PostKey">
                    <button><i className="uil uil-key-skeleton"></i> Historique clé</button>
                  </li> */}
                                {user_id === offre.owner[0].id &&
                                    <>
                                        <li className="PostDelete">
                                            <button onClick={e => edit(offre.id)}><i className="uil uil-pen"></i>{t('edit')} </button>
                                        </li>
                                        <li className="PostDelete">
                                            <button onClick={e => deletecontent(offre.id)}><i className="uil uil-trash-alt"></i>{t('delete')} </button>
                                        </li>
                                    </>
                                }

                            </ul>
                        )
                    }


                </div>
                <div className="offer-media">
                    {(function() {
                    let link = $.type(offre.media_link) !== "string" ? $.parseJSON(offre.media_link) : offre.media_link;
                    link = $.isArray(link) ? link[0] : link;
                    if (getExtension(link) == 'youtube') {
                        return <ReactPlayer width='340' height='234px' url = {link} controls={true} />
                    }else{
                        if (getExtension(link) == 'vimeo') {
                            return <ReactPlayer width='340' height='234px' url={link} controls={true} />
                        }else{
                            if(getExtension(link) == 'mp4' || getExtension(link) == ('x-mpeg2') ||
                            getExtension(link) == ('x-msvideo') || getExtension(link) == ('quicktime')){
                                return <ReactPlayer width={340} url={link} controls={true} />
                            } else if (/\.(doc|docx|xls|xlsx|ppt|pptx|csv|pdf)$/i.test(link)) {
                                return <div className="Doc-Wrap">
                                    <a href="#!">
                                        <div className="Doc-Icon" height='300'><span className="Doc-Type">file</span><i className="uil uil-file-alt"></i></div>
                                    </a>
                                </div>
                            }
                            else{
                                return <img width="100%" height="300px" onError={handleImageError} src={link} alt="Project"/>
                            }
                        }
                    }
                })()}
                </div>
                <div className="offer-meta">
                    <ul className="meta-items">
                        <li className="meta-item">
                            <div className="meta-icon">
                                <img src="/assets/images/icons/marker.svg" alt="" />
                            </div>
                            <div className="meta-details">
                                <span className="meta-value">{offre.project_area}</span>
                            </div>
                        </li>
                        <li className="meta-item">
                            <div className="meta-icon">
                                <img src="/assets/images/icons/cost.svg" alt="" />
                            </div>
                            <div className="meta-details">
                                <span className="meta-value">${offre.funding_search}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="offer-reactions">
                    <ul className="reactions-box">
                        <li className="reaction likes"><i className="dadupa-icon icon-clap"></i> <span>{offre.likeCount}</span></li>
                        <li className="reaction views"><i className="uil uil-eye"></i> <span>1500</span></li>
                        <li className="reaction comments"><i className="uil uil-comment-dots"></i> <span>{offre.commentCount}</span></li>
                        <li className="reaction shares" data-toggle="modal" data-target="#SharingModal"><i className="uil uil-share-alt"></i> <span>380 Shares</span></li>
                    </ul>
                </div>
            </div>

        </>
    )
}