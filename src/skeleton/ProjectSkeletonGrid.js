import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';





const ProjectSkeletonGrid  = () =>{

    return(
        
                <div className="col-md-12"  >
                    <div className="offer-box">
                        <div className="offer-header">
                            <div className="offer-title">
                                <h3><a href="#!" ><Skeleton height={30} width={200} /></a></h3>
                                <span><Skeleton height={25} width={100} /></span>
                            </div>
                            <div className="offer-logo">
                                <Skeleton variant="circle" height={60} width={45} />
                                {/*<img src="/assets/images/porject-logo.png" title="Nom du projet" alt=""/>*/}
                            </div>
                        </div>
                        <div className="offer-media">
                            <div className="player" >
                                <Skeleton width={350} height={234}  />
                            </div>
                        </div>
                        <div className="offer-meta">
                            <ul className="meta-items">
                                <li className="meta-item">
                                    <div className="meta-icon">
                                        <Skeleton variant="circle" height={40} width={40} />
                                    </div>
                                    <div className="meta-details">
                                        <span className="meta-title"><Skeleton height={20} width={80} /></span>
                                        <span className="meta-value"><Skeleton height={30} width={80} /></span>
                                    </div>
                                </li>
                                <li className="meta-item">
                                    <div className="meta-icon">
                                        <Skeleton variant="circle" height={40} width={40} />
                                    </div>
                                    <div className="meta-details">
                                        <span className="meta-title"><Skeleton height={20} width={80} /></span>
                                        <span className="meta-value"><Skeleton height={30} width={80} /></span>
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
                </div>

            
    )
}
export default ProjectSkeletonGrid