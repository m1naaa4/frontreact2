import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';


export default function BioSkeleton(props) {
    return (
        <div className="col-md-6">
            <div className="Center-Side">
                <div className="Profile-Sections">
                    <div className="Profile-Section">
                        <button type="button" className="UpdateInfos-BTN"><Skeleton width={24} height={24} /></button>
                        <h3 className="Profile-Section-Title"><Skeleton width={24} height={24} /> Skills</h3>
                        <div className="Profile-Skills">
                            <ul>
                                <li>
                                    <span><Skeleton width={169} height={24} /></span>
                                    <button className="delete-skill"><Skeleton width={24} height={24} /></button>
                                </li>
                                <li>
                                    <span><Skeleton width={200} height={24} /></span>
                                    <button className="delete-skill"><Skeleton width={24} height={24} /></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="Profile-Section">
                        <button type="button" className="UpdateInfos-BTN"><Skeleton width={24} height={24} /></button>
                        <h3 className="Profile-Section-Title"><Skeleton width={24} height={24} /> Etudes</h3>
                        <ul className="Section-Items">
                            <div>
                                <li className="Section-Item">
                                    <div className="d-flex justify-content-between">
                                        <label><Skeleton width={170} height={24} /></label>
                                        <div>
                                            <div className="Contact">
                                                <div className="Add-Contact Invitation-Options">
                                                    <button type="button" className="Invitation-Option_Confirm"><Skeleton width={24} height={24} /></button>
                                                    <button type="button" className="Invitation-Option_Delete"><Skeleton width={24} height={24} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Skeleton width={240} height={16} />
                                </li>
                            </div>
                            <div>
                                <li className="Section-Item">
                                    <div className="d-flex justify-content-between">
                                        <label><Skeleton width={240} height={24} /></label>
                                        <div>
                                            <div className="Contact">
                                                <div className="Add-Contact Invitation-Options">
                                                    <button type="button" className="Invitation-Option_Confirm"><Skeleton width={24} height={24} /></button>
                                                    <button type="button" className="Invitation-Option_Delete"><Skeleton width={24} height={24} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Skeleton width={170} height={16} />
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div className="Profile-Section">
                        <button type="button" className="UpdateInfos-BTN"><Skeleton width={24} height={24} /></button>
                        <h3 className="Profile-Section-Title"><Skeleton width={24} height={24} /> Etudes</h3>
                        <ul className="Section-Items">
                            <div>
                                <li className="Section-Item">
                                    <div className="d-flex justify-content-between">
                                        <label><Skeleton width={170} height={24} /></label>
                                        <div>
                                            <div className="Contact">
                                                <div className="Add-Contact Invitation-Options">
                                                    <button type="button" className="Invitation-Option_Confirm"><Skeleton width={24} height={24} /></button>
                                                    <button type="button" className="Invitation-Option_Delete"><Skeleton width={24} height={24} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Skeleton width={240} height={16} />
                                </li>
                            </div>
                            <div>
                                <li className="Section-Item">
                                    <div className="d-flex justify-content-between">
                                        <label><Skeleton width={240} height={24} /></label>
                                        <div>
                                            <div className="Contact">
                                                <div className="Add-Contact Invitation-Options">
                                                    <button type="button" className="Invitation-Option_Confirm"><Skeleton width={24} height={24} /></button>
                                                    <button type="button" className="Invitation-Option_Delete"><Skeleton width={24} height={24} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Skeleton width={170} height={16} />
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div className="Profile-Section">
                        <a className="UpdateInfos-BTN"><Skeleton width={24} height={24} /></a>
                        <h3 className="Profile-Section-Title"><Skeleton width={24} height={24} /> réalisations</h3>
                        <div className="Portfolio-Item">
                            <Skeleton width={300} height={300} />
                        </div>
                        <div className="Portfolio-Item">
                            <Skeleton width={300} height={300} />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
