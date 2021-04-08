import React  from 'react'
import {useDispatch, useSelector} from "react-redux";


export default function Body({filterInput, setFilterInput, props}) {


    


    return (
        
    <div className="Messenger-body msg_wrap">
        <div className="Messenger-messages '+ userID+'">
        <div className="message incoming-message">
            <div className="avatar-wrapper avatar-small"><img src="/assets/images/profiles/Abdelkarim-ICHIA.jpg" alt="avatar"/></div>
          <div className="incoming-bubbles">
            <div className="bubble bubble-light message-seen"><div className="message-text">Hello</div><span className="message-status"><i className="uil uil-eye"></i> 1:49AM</span></div>
            <div className="bubble bubble-light message-seen"><div className="message-text">Hello Abbass</div><span className="message-status"><i className="uil uil-eye"></i> 1:49AM</span></div>
            <div className="bubble bubble-light message-seen"><div className="message-text">How are you ?</div><span className="message-status"><i className="uil uil-eye"></i> 1:49AM</span></div>
          </div>
        </div>
        <div className="message outcoming-message">
          <div className="outcoming-bubbles">
            <div className="bubble bubble-dark message-seen"><span className="message-status">1:51AM <i className="uil uil-eye"></i></span><div className="message-text">Hello Boss</div></div>
            <div className="bubble bubble-dark message-seen"><span className="message-status">1:52AM <i className="uil uil-eye"></i></span><div className="message-text">Wach hani ?</div></div>
          </div>
          <div className="avatar-wrapper avatar-small"></div>
        </div>
        <div className="messages-date"><label className="messages-date-label">Saturday</label></div>
        <div className="message incoming-message">
            <div className="avatar-wrapper avatar-small"><img src="/assets/images/profiles/Abdelkarim-ICHIA.jpg" alt="avatar"/></div>
          <div className="incoming-bubbles">
            <div className="bubble bubble-light message-seen"><div className="message-text">Mehdi is the best</div><span className="message-status"><i className="uil uil-eye"></i> 1:49AM</span></div>
          </div>
        </div>
        <div className="message outcoming-message">
          <div className="outcoming-bubbles">
            <div className="bubble bubble-dark message-seen"><span className="message-status">1:51AM <i className="uil uil-eye"></i></span><div className="message-text">No dadupa is the best</div></div>
            <div className="bubble bubble-dark message-seen"><span className="message-status">1:51AM <i className="uil uil-eye"></i></span><div className="message-text">Dadupa is the best</div></div>
            <div className="bubble bubble-dark"><span className="message-status">1:52AM <i className="uil uil-eye-slash"></i></span><div className="message-text">Dadupa is the best</div></div>
          </div>
          <div className="avatar-wrapper avatar-small"></div>
        </div>
        </div>
        <div id="EmojiPicker" className="Messenger-footer"><input type="text" placeholder="Type messages here..."  data-emoji-picker="true"/>
        <div className="Messenger-footer-attachments">
        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a photo"><input type="file"/><span><i className="uil uil-image"></i></span></div>
        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a video"><input type="file"/><span><i className="uil uil-video"></i></span></div>
        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a document"><input type="file"/><span><i className="uil uil-file-alt"></i></span></div>
        </div>
        <div className="Messenger-footer-actions"><button className="button-attachments"><i className="uil uil-paperclip"></i></button><button className="button-send" data-toggle="tooltip" data-placement="top" title="Send"><i className="uil uil-message"></i></button></div></div>
    </div>
      
    )
}