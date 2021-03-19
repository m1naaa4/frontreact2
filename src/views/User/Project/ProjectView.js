import React from 'react'
import { NavLink } from 'react-router-dom';
import {Text} from "../../../containers/Language";
import { Player } from 'video-react';


const ProjectView = ({ project }) => {

//console.log("goloooooooooooooooooooo", project.logo_link)

    return (

             <div className="offer-box">
                        <div className="offer-header">
                            <div className="offer-title">
                                <h3><NavLink to={`/project/show/${project.id}`}>{project.name}</NavLink></h3>
                                <span>{project.sector}</span>
                            </div>
                            <div className="offer-logo">
                                <img src={project.logo_link} style={{ width: "30px"}}  title="Nom du projet" alt=""/>
                            </div>
                        </div>
                        <div className="offer-media">
                            {
                                project.is_video ? (
                                    <Player width="100%" height="100%"
                                        playsInline
                                        poster="/assets/poster.png"
                                        src={project.media_link}
                                    />) : (<img width="100%" height="300" src={project.media_link} alt="Project"/>)
                            } 
                        </div>
                        <div className="offer-meta">
                            <ul className="meta-items">
                                <li className="meta-item">
                                    <div className="meta-icon">
                                        <img src="/assets/images/icons/marker.svg" alt=""/>
                                    </div>
                                    <div className="meta-details">
                                        <span className="meta-title"><Text tid="targetAreas" /></span>
                                        <span className="meta-value">{project.project_area}</span>
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
                                <li className="reaction likes"><i className="uil uil-thumbs-up"></i>
                                    <span>145</span></li>
                                <li className="reaction views"><i className="uil uil-eye"></i>
                                    <span>1500</span></li>
                                <li className="reaction comments"><i
                                    className="uil uil-comment-dots"></i> <span>1.9K Comments</span>
                                </li>
                                <li className="reaction shares"><i className="uil uil-share-alt"></i>
                                    <span>380 Shares</span></li>
                            </ul>
                        </div>
                    </div>

    )
}

export default ProjectView;