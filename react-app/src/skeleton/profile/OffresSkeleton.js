import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';


export default function OffresSkeleton() {
    return (
        <div className="col-md-9">
            <div className="Center-Side">
                <div className="container">
                    <div className="offers-list">
                        <div className="row">

                            {Array(5).fill().map((e, index) => (
                                <div key={index + 1} div className="col-md-6">
                                    <div className="offer-box">
                                        <div className="offer-header">
                                            <div className="offer-title">
                                                <Skeleton width={40} heigh={50} />
                                                {/* <img src={offre.logo_link} style={{ height: "50", width: "40" }} title="Nom du projet" alt="" /> */}
                                                <h3><a><Skeleton width={169} heigh={24} /></a></h3>
                                                <span><Skeleton width={70} heigh={24} /></span>
                                            </div>
                                            <div className="offer-logo">
                                                <button className="offer-bookmark" type="button" name="button"><Skeleton width={24} heigh={24} /></button>
                                                <button type="button" className="PostOptions-BTN"><Skeleton width={24} heigh={24} /></button>
                                            </div>
                                        </div>
                                        <div className="offer-media">
                                            <Skeleton style={{ width: "100%", height: "200px" }} />
                                        </div>
                                        <div className="offer-reactions d-flex justify-content-center">
                                            <Skeleton width={24} heigh={24} /> &nbsp; <Skeleton width={24} heigh={24} /> &nbsp;&nbsp;&nbsp;
                                            <Skeleton width={24} heigh={24} /> &nbsp; <Skeleton width={30} heigh={24} /> &nbsp;&nbsp;&nbsp;
                                            <Skeleton width={24} heigh={24} /> &nbsp; <Skeleton width={50} heigh={24} /> &nbsp;&nbsp;&nbsp;
                                            <Skeleton width={24} heigh={24} /> &nbsp; <Skeleton width={40} heigh={24} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
