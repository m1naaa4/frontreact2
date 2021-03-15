import React from 'react'
import {Text} from "../../../containers/Language";


const ProjectView = ({ project }) => {



    return (

             <div className="offer-box">
                        <div className="offer-header">
                            <div className="offer-title">
                                <h3><a href="#!" >{project.name}</a></h3>
                                <span>{project.sector}</span>
                            </div>
                            <div className="offer-logo">
                                <img src="/assets/images/porject-logo.png" title="Nom du projet" alt=""/>
                            </div>
                        </div>
                        <div className="offer-media">
                            <video className="player"  controls
                                   data-poster="assets/images/offer-thumb-1.jpg">
                                <source src="/assets/media/earth.mp4" type="video/mp4"/>
                                <source src="/assets/media/earth.ogv" type="video/ogv"/>
                            </video>
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