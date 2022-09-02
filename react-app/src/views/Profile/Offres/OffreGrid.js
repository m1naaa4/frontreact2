import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Player } from 'video-react';
import useOutsideClick from '../../../helpers/useOutsideClick';
import { DeleteAction } from '../../../store/actions/Offres/MyContentAction';

export default function OffreGrid({ offre }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef();
    const user = useSelector(state => state.userProfile.userProfile);

    const [options_List, SetOptions_List] = useState(false);
    const [user_id, setUserId] = useState();


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
                        <span>{offre.sector} {offre.visibility === 'public' && <i class="uil uil-globe"></i>}</span>
                    </div>
                    <div className="offer-logo">
                        <button className="offer-bookmark" type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i className="uil uil-bookmark"></i></button>
                        <button type="button" className="PostOptions-BTN" onClick={showOptions}><i className="uil uil-ellipsis-h"></i></button>
                    </div>


                    {
                        options_List && (
                            <ul className="PostOptions-List PostOptions-ListShow" ref={ref} >
                                <li className="PostFavorite">
                                    <button onClick={e => addTofavorite(offre.id)}><i className="uil uil-favorite"></i> Favorite</button>
                                </li>
                                {/* <li className="PostKey">
                    <button><i className="uil uil-key-skeleton"></i> Historique clé</button>
                  </li> */}
                                {user_id === offre.owner[0].id &&
                                    <>
                                        <li className="PostDelete">
                                            <button onClick={e => edit(offre.id)}><i className="uil uil-pen"></i> Edit</button>
                                        </li>
                                        <li className="PostDelete">
                                            <button onClick={e => deletecontent(offre.id)}><i className="uil uil-trash-alt"></i> Supprimer</button>
                                        </li>
                                    </>
                                }

                            </ul>
                        )
                    }


                </div>
                <div className="offer-media">
                    {
                        offre.is_video ? (
                            // <VideoPlayer videoUrl={project.media_link} snapshotAt={10} />
                            <Player width="100%" height="100%"
                                playsInline
                                poster="/assets/poster.png"
                                src={offre.media_link}
                            />
                        ) : (<img width="100%" height="300" src={offre.media_link} alt="Project" />)
                    }
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