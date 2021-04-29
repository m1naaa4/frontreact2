import React, {useRef, useState }  from 'react'
import {useDispatch, useSelector} from "react-redux";
import { SendMessageAction } from '../../../store/actions/Messenger/MessageAction';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import useOutsideClick from '../../../helpers/useOutsideClick';
import { useParams } from 'react-router';
import PusherService from '../../../services/Pusher';


export default function BoxMessage() {

  const params = useParams();

  const ref = useRef();

  const refmessage = useRef(null);
  const hiddenImageInput = useRef(null);
  const hiddenVideoInput = useRef(null);
  const hiddenFileInput = useRef(null);
  const [text, setText] = useState('');
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProfile?.userProfile);

  const data = {
    action      : "store",
    content     : text,
    receiver_id : params.id
  }
  const handleSubmitValue = (e) => {
    e.preventDefault();
    refmessage.current.value = '';
    refmessage.current.focus();
    setText('')
    dispatch(SendMessageAction(data, 'messages/store', ''));

    // const msgData = {
    //   channel : 'message_' + params.id,
    //   event   : 'message',
    //   type    : 'SEND_MESSAGE_SUCCESS',
    // };
    // dispatch(PusherAction(msgData, params.id));

    const notifData = {
      channel : 'notification_' + params.id,
      event   : 'notifpost',
      type    : 'ADD_TO_COLLECTION_NOTIFICATION_SUCCESS',
    };
    // dispatch(PusherAction(notifData)); 
  }

  const pusher = new PusherService();
  const onTyping = () =>{
    pusher.echo.private("Message.User." + params.id).whisper('typing',{
      user:userProfile?.name
    });
  };

  const handleImageClick = e => {
    hiddenImageInput.current.click();
  };

  const handleVideoClick = e => {
    hiddenVideoInput.current.click();
  };

  const handleFileClick = e => {
    hiddenFileInput.current.click();
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(true);
  }

  const addEmoji = e => {
    let emoji = e.native;
    setText(text + emoji)
  };
  const handleChange = e => {
    setText( e.target.value);
    refmessage.current.focus();
  }
  
  useOutsideClick(ref, () => {
    SetEmojiPicker(false);
    refmessage.current.focus();
    console.log(refmessage)
  });
  return (
    <form onSubmit={ handleSubmitValue}>
      <div id="EmojiPicker" className="Messenger-footer">
          <input autoFocus onKeyDown={onTyping} type="text" value={text} name="text" onChange={handleChange} ref={refmessage} placeholder="Type messages here..."  data-emoji-picker="true"/>
          
          <div  style={{position: 'absolute', bottom: '10px', zIndex: 1000, left: '10px', textDecoration: 'none'}} >
          <i  onClick={triggerPicker}   className="uil uil-smile"></i>
          {emojiPickerState &&
          <div ref={ref}>
            <Picker   enableFrequentEmojiSort={true} emoji='' style={{ position: 'absolute',  bottom: '40px', left: '20px' }} onSelect={addEmoji} />
          </div>
          }
          </div>
          
          
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