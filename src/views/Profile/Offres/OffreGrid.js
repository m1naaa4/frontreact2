import React from 'react'
import { Link } from 'react-router-dom';
import { Player } from 'video-react';

export default function OffreGrid({offre}) {
    return (
        <>
            <div className="offer-box">
                <div className="offer-header">
                <div className="offer-title">
                    <h3><Link to={`/project/show/${offre.id}`}>{offre.name}</Link></h3>
                    <span>{offre.sector}</span>
                </div>
                <div className="offer-logo">
                    <button className="offer-bookmark" type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i className="uil uil-bookmark"></i></button>
                    <img src={offre.logo_link} style={{ height: "50" , width: "40"}} title="Nom du projet" alt=""/>
                </div>
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
                        ) : (<img width="100%" height="300" src={offre.media_link} alt="Project"/>)
                }
                </div>
                <div className="offer-meta">
                <ul className="meta-items">
                    <li className="meta-item">
                    <div className="meta-icon">
                        <img src="/assets/images/icons/marker.svg" alt=""/>
                    </div>
                    <div className="meta-details">
                        <span className="meta-value">{offre.project_area}</span>
                    </div>
                    </li>
                    <li className="meta-item">
                    <div className="meta-icon">
                        <img src="/assets/images/icons/value.svg" alt=""/>
                    </div>
                    <div className="meta-details">
                        <span className="meta-value">Type 3</span>
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