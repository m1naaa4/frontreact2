import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import SearchBar from './SearchBar';
import SideListBar from './SideListBar';
import MessengerContent from './MessengerContent';
import Body from './MessengerWraps/Body';
import Header from './MessengerWraps/Header';




export default function MainMessengerView(props) { 
    const dispatch = useDispatch();
    const params = useParams();
    

    const conversation = useSelector(state => state.messages);
    const showContent = () =>{
        console.log('salam')
        //setShow(conversation)
    }
    const [show, setShow] = useState(conversation);
    useEffect(() => {
        setShow(conversation)
    }, [conversation]);
    //const showContent = () => setShow(true);


    return (
        <div className="Page-Profile">  
            <div className="Messenger-Wrapper">
                <div className="container-fluid">
                    <div className="row MessengerDesktop">
                        <div className="col-md-4 col-lg-3">
                            <div className="row">
                                <div className="Messenger-List">
                                    <SearchBar/>
                                    <div onClick={showContent}>
                                        <SideListBar/>
                                    </div >
                                            {/* <SideLeftProfileView />
                                            <PostView  {...props}/>
                                            <SideRightProfileView/> */}
                                </div>
                            </div>
                        </div>
                    <div className="col-md-8 col-lg-9">
                        <div className="row">
                            <div className="tab-content Messenger-row" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-abdelkarim-ichia" role="tabpanel" aria-labelledby="v-abdelkarim-ichia-tab">                                    
                                    <div className="Messenger-wrapper">
                                        {show ? 
                                            (<div className="Messenger-box" rel="'+ userID+'">
                                            <Header conversation={conversation} />
                                            <Body conversation={conversation} />                       
                                            </div>): (<div className="Messenger-box" rel="'+ userID+'"></div>)
                                        }
                                        
                                        <div className="Messenger-user-profile">
                                            <div className="Messenger-profile-header">
                                            <div className="Messenger-Profile-Infos">
                                                <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                                                <div className="Profile-Picture" id="imageProfile" style={{backgroundImage: `url(${null})`}} ></div>
                                                <div className="Profile-Name">Abdelkarim ICHIA</div>
                                            </div>
                                            </div>
                                            <div className="Messenger-Profile-Widgets">
                                            <div className="Messenger-Profile-Widget">
                                                <h3 className="Messenger-Widget-Title">Lieu de résidence</h3>
                                                <p>Casablanca</p>
                                            </div>
                                            <div className="Messenger-Profile-Widget">
                                                <h3 className="Messenger-Widget-Title">Bio</h3>
                                                <p>Full Stack Developer</p>
                                            </div>
                                            <div className="Messenger-Profile-Widget">
                                                <h3 className="Messenger-Widget-Title">Offres</h3>
                                                <div className="Messenger-Offers">
                                                <div className="Messenger-Offer">
                                                    <div className="Messenger-Offer-Media">
                                                    </div>
                                                    <div className="Messenger-Offer-Content">
                                                    <div className="offer-title">
                                                        <div className="offer-logo">
                                                        <img src="assets/images/majorel.png" title="Nom du projet" alt=""/>
                                                        </div>
                                                        <h3><a href="#!" data-toggle="modal" data-target="#performancesModalCenter">Nom du projet</a></h3>
                                                        <span>Secteur d’activité</span>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="Messenger-Offer">
                                                    <div className="Messenger-Offer-Media">
                                                    </div>
                                                    <div className="Messenger-Offer-Content">
                                                    <div className="offer-title">
                                                        <div className="offer-logo">
                                                        <img src="assets/images/majorel.png" title="Nom du projet" alt=""/>
                                                        </div>
                                                        <h3><a href="#!" data-toggle="modal" data-target="#performancesModalCenter">Nom du projet</a></h3>
                                                        <span>Secteur d’activité</span>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            </div>

                                        </div>
                    
                                    </div>
                                </div>
                                                    
                                <div className="tab-pane fade" id="v-youness-elbezzazi" role="tabpanel" aria-labelledby="v-youness-elbezzazi-tab">
                                    <div className="Messenger-box" rel="'+ userID+'">
                                    <div className="Messenger-head">
                                        <div className="Messenger-head-left">
                                            <div className="Messenger-head-user-thumb"></div>
                                            <div className="Messenger-head-user-info">
                                            <label>Youness EL BEZZAZI</label>
                                            <span>Active 1m ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Messenger-body msg_wrap">
                                        <div className="Messenger-messages '+ userID+'">
                                        <div className="message incoming-message">
                                            <div className="avatar-wrapper avatar-small"></div>
                                        <div className="incoming-bubbles">
                                            <div className="bubble bubble-light" data-toggle="tooltip" data-placement="right" title="Thursday 1:49AM">Hey anhat!</div>
                                        </div>
                                        </div>
                                        <div className="message outcoming-message">
                                        <div className="outcoming-bubbles">
                                            <div className="bubble bubble-dark" data-toggle="tooltip" data-placement="left" title="Thursday 1:51AM">what is going on?</div>
                                            <div className="bubble bubble-dark" data-toggle="tooltip" data-placement="left" title="Thursday 1:52AM">Hani Mhani ?</div>
                                        </div>
                                        <div className="avatar-wrapper avatar-small"></div>
                                        </div>
                                        </div>
                                        <div className="Messenger-footer"><input type="text" placeholder="Type messages here..."  data-emoji-picker="true"/>
                                        <div className="Messenger-footer-attachments">
                                        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a photo"><input type="file"/><span><i className="uil uil-image"></i></span></div>
                                        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a video"><input type="file"/><span><i className="uil uil-video"></i></span></div>
                                        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a document"><input type="file"/><span><i className="uil uil-file-alt"></i></span></div>
                                        </div>
                                        <div className="Messenger-footer-actions"><button className="button-attachments"><i className="uil uil-paperclip"></i></button><button className="button-send" data-toggle="tooltip" data-placement="top" title="Send"><i className="uil uil-message"></i></button></div></div>
                                    </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="v-othmane-marhar" role="tabpanel" aria-labelledby="v-othmane-marhar-tab">
                                    <div className="Messenger-box" rel="'+ userID+'">
                                    <div className="Messenger-head">
                                        <div className="Messenger-head-left">
                                            <div className="Messenger-head-user-thumb"></div>
                                            <div className="Messenger-head-user-info">
                                            <label>Othmane Amrhar</label>
                                            <span>Active 1m ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Messenger-body msg_wrap">
                                        <div className="Messenger-messages '+ userID+'">
                                        <div className="message incoming-message">
                                            <div className="avatar-wrapper avatar-small"></div>
                                        <div className="incoming-bubbles">
                                            <div className="bubble bubble-light" data-toggle="tooltip" data-placement="right" title="Thursday 1:49AM">Hey anhat!</div>
                                        </div>
                                        </div>
                                        <div className="message outcoming-message">
                                        <div className="outcoming-bubbles">
                                            <div className="bubble bubble-dark" data-toggle="tooltip" data-placement="left" title="Thursday 1:51AM">what is going on?</div>
                                            <div className="bubble bubble-dark" data-toggle="tooltip" data-placement="left" title="Thursday 1:52AM">Hani Mhani ?</div>
                                        </div>
                                        <div className="avatar-wrapper avatar-small"></div>
                                        </div>
                                        </div>
                                        <div className="Messenger-footer"><input type="text" placeholder="Type messages here..." data-emoji-picker="true"/>
                                        <div className="Messenger-footer-attachments">
                                        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a photo"><input type="file"/><span><i className="uil uil-image"></i></span></div>
                                        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a video"><input type="file"/><span><i className="uil uil-video"></i></span></div>
                                        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a document"><input type="file"/><span><i className="uil uil-file-alt"></i></span></div>
                                        </div>
                                        <div className="Messenger-footer-actions"><button className="button-attachments"><i className="uil uil-paperclip"></i></button><button className="button-send" data-toggle="tooltip" data-placement="top" title="Send"><i className="uil uil-message"></i></button></div></div>
                                    </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="v-mounir-yamoul" role="tabpanel" aria-labelledby="v-mounir-yamoul-tab">
                                    <div className="Messenger-box" rel="'+ userID+'">
                                    <div className="Messenger-head">
                                        <div className="Messenger-head-left">
                                            <div className="Messenger-head-user-thumb"></div>
                                            <div className="Messenger-head-user-info">
                                            <label>Mounir Yamoul</label>
                                            <span>Active 1m ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Messenger-body msg_wrap">
                                        <div className="Messenger-messages '+ userID+'">
                                        <div className="message incoming-message">
                                            <div className="avatar-wrapper avatar-small"></div>
                                        <div className="incoming-bubbles">
                                            <div className="bubble bubble-light" data-toggle="tooltip" data-placement="right" title="Thursday 1:49AM">Hey anhat!</div>
                                        </div>
                                        </div>
                                        <div className="message outcoming-message">
                                        <div className="outcoming-bubbles">
                                            <div className="bubble bubble-dark" data-toggle="tooltip" data-placement="left" title="Thursday 1:51AM">what is going on?</div>
                                            <div className="bubble bubble-dark" data-toggle="tooltip" data-placement="left" title="Thursday 1:52AM">Hani Mhani ?</div>
                                        </div>
                                        <div className="avatar-wrapper avatar-small"></div>
                                        </div>
                                        </div>
                                        <div className="Messenger-footer"><input type="text" placeholder="Type messages here..." data-emoji-picker="true"/>
                                        <div className="Messenger-footer-attachments">
                                        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a photo"><input type="file"/><span><i className="uil uil-image"></i></span></div>
                                        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a video"><input type="file"/><span><i className="uil uil-video"></i></span></div>
                                        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a document"><input type="file"/><span><i className="uil uil-file-alt"></i></span></div>
                                        </div>
                                        <div className="Messenger-footer-actions"><button className="button-attachments"><i className="uil uil-paperclip"></i></button><button className="button-send" data-toggle="tooltip" data-placement="top" title="Send"><i className="uil uil-message"></i></button></div></div>
                                    </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            
                        
                    </div>
                </div>
            </div>
        </div>          
        
    )
}
