import React, { useRef, useState }  from 'react'
import {useDispatch, useSelector} from "react-redux";
import { SendMessageAction } from '../../../store/actions/Messenger/MessageAction';
import {PusherAction} from "../../../store/actions/Generale/PusherAction";


export default function BoxMessage({sender}) {

  const [body, setBody] = useState();
  const refcomment = useRef(null);
  const hiddenImageInput = useRef(null);
  const hiddenVideoInput = useRef(null);
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();

  const data = {
    action      : "store",
    content     : body,
    receiver_id : sender ? sender.id : ''
  }
  const handleSubmitValue = (e) => {
    e.preventDefault();
    refcomment.current.value = '';
    dispatch(SendMessageAction(data, 'messages/store', ''));

    const msgData = {
      channel : 'message_' + sender.id,
      event   : 'message',
      type    : 'SEND_MESSAGE_SUCCESS',
    };
    dispatch(PusherAction(msgData));

    const notifData = {
      channel : 'notification_' + sender.id,
      event   : 'notifpost',
      type    : 'ADD_TO_COLLECTION_NOTIFICATION_SUCCESS',
    };
    dispatch(PusherAction(notifData)); 
  }

  const handleImageClick = e => {
    hiddenImageInput.current.click();
  };

  const handleVideoClick = e => {
    hiddenVideoInput.current.click();
  };

  const handleFileClick = e => {
    hiddenFileInput.current.click();
  };
  
  return (
    <form onSubmit={ handleSubmitValue}>
      <div id="EmojiPicker" className="Messenger-footer">
          <input type="text" name="body" onChange={e => setBody(e.target.value)} ref={refcomment} placeholder="Type messages here..."  data-emoji-picker="true"/>
          <div className="Messenger-footer-attachments">
            <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a photo" onClick={handleImageClick} ><input ref={hiddenImageInput} type="file" accept="image/jpeg, image/x-png"/><span><i className="uil uil-image"></i></span></div>
            <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a video" onClick={handleVideoClick}><input ref={hiddenVideoInput} type="file" accept="video/x-mpeg2, video/x-msvideo, video/quicktime, video/mp4"/><span><i className="uil uil-video"></i></span></div>
            <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a document" onClick={handleFileClick}><input ref={hiddenFileInput} type="file"/><span><i className="uil uil-file-alt"></i></span></div>
        </div>
        <div className="Messenger-footer-actions">
          <button className="button-attachments"><i className="uil uil-paperclip"></i></button>
          <button className="button-send" data-toggle="tooltip" data-placement="top" title="Send"><i className="uil uil-message"></i></button>
        </div>
      </div>  
    </form>
    )
}