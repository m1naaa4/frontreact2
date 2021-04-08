import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import SearchBar from './SearchBar';
import SideLeftBar from './SideLeftBar';
import Body from './MessengerWraps/Body';
import Header from './MessengerWraps/Header';
import SideRightBar from './SideRightBar';




export default function MainMessengerView(props) { 
   
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
                                        <SideLeftBar/>
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

                                        <SideRightBar conversation={conversation} />
                                        
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
