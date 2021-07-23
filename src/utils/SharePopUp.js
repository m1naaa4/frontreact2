import React from "react";
import { useTranslation } from 'react-i18next';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
  } from "react-share";

import Modal from 'react-bootstrap/Modal'

function SharePopUp (props){
    const { t } = useTranslation();
        
    return (
        <Modal show={props.open} contentClassName='ModalShare-Content' animation={true}>
                <Modal.Header className="ModalShare-Header" closeButton>
                    <Modal.Title className="ModalShare-Title" id="exampleModalLongTitle">{t('share')}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="ModalShare-Body">
                <ul className="Share-Items">
                        <li className="Share-Item">
                            <LinkedinShareButton url={props.url} className="Share-Link Share-Linkedin" >
                                <i className="uil uil-linkedin-alt"></i>
                            </LinkedinShareButton>
                        </li>  
                        <li className="Share-Item">
                            <FacebookShareButton url={props.url} className="Share-Link Share-Facebook" >
                                <i className="uil uil-facebook-f"></i>
                            </FacebookShareButton>
                        </li>  
                        <li className="Share-Item">
                            <TwitterShareButton url={props.url} className="Share-Link Share-Twitter" >
                                <i className="uil uil-twitter"></i>
                            </TwitterShareButton>    
                        </li>  
                        {/* <li className="Share-Item">
                            <InstapaperShareButton url={props.url} className="Share-Link Share-Instagram" >
                                <i className="uil uil-instagram"></i>
                            </InstapaperShareButton>
                        </li>   */}
                        {/* <li className="Share-Item"><a className="Share-Link Share-Profile" data-toggle="tooltip" data-placement="bottom" title="Share on My profile"><i className="uil uil-user"></i></a></li> */}
                    </ul>

                    <div className="ModalShare-CopyLink">
                        <h5>{t('or_copy_link')}</h5>
                        <form data-copy='true'>
                            <input type="text" value={props.url} data-click-select-all />
                            <button type="submit" name="button"><i className="uil uil-copy"></i></button>
                        </form>
                    </div>
                </Modal.Body>            
        </Modal>
    );
}

export default SharePopUp;
