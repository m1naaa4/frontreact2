import React, { useRef, useState } from 'react'
import { useDispatch } from "react-redux";
import { SendMessageAction, GetMessagesListAction } from '../../../store/actions/Messenger/MessageAction';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import useOutsideClick from '../../../helpers/useOutsideClick';
import { useParams } from 'react-router';

export default function BoxMessage() {
  const params = useParams();
  const ref = useRef();
  const refmessage = useRef(null);
  const hiddenImageInput = useRef(null);
  const hiddenVideoInput = useRef(null);
  const hiddenFileInput = useRef(null);
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const dispatch = useDispatch();

  const buildPayload = () => {
    if (!attachment) {
      return {
        action: "store",
        content: text,
        receiver_id: params.id
      };
    }

    const formData = new FormData();
    formData.append('action', 'store');
    formData.append('content', text);
    formData.append('receiver_id', params.id);
    formData.append('attachment', attachment);
    return formData;
  };

  const sendMessage = () => {
    if ((text.trim() !== '' || attachment) && params.id) {
      dispatch(SendMessageAction(buildPayload(), 'messages/store', '')).then(() => {
        dispatch(GetMessagesListAction('messages/getConversations', '', 1));
      });
      setText('');
      setAttachment(null);
      if (hiddenImageInput.current) hiddenImageInput.current.value = '';
      if (hiddenVideoInput.current) hiddenVideoInput.current.value = '';
      if (hiddenFileInput.current) hiddenFileInput.current.value = '';
      if (refmessage.current) refmessage.current.value = '';
    }
  };

  const handleSubmitValue = async (value, key) => {
    if (key === 13 && value !== '') {
      sendMessage();
    }
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(true);
  }

  const addEmoji = e => {
    let emoji = e.native;
    setText(text + emoji);
  };

  const handleChange = e => {
    setText(e.target.value);
    refmessage.current.focus();
  };

  const selectAttachment = (event) => {
    setAttachment(event.target.files?.[0] || null);
  };

  useOutsideClick(ref, () => {
    SetEmojiPicker(false);
    refmessage.current.focus();
  });

  return (
    <div>
      <div id="EmojiPicker" className="Messenger-footer">
        <input
          autoFocus
          type="text"
          name="text"
          onKeyDown={(e) => handleSubmitValue(e.target.value, e.keyCode)}
          value={text}
          onChange={handleChange}
          ref={refmessage}
          placeholder="Type messages here..."
          data-emoji-picker="true"
        />

        <div style={{ position: 'absolute', bottom: '10px', zIndex: 1000, left: '10px', textDecoration: 'none' }}>
          <i onClick={triggerPicker} className="uil uil-smile"></i>
          {emojiPickerState &&
            <div ref={ref}>
              <Picker
                enableFrequentEmojiSort={true}
                emoji=''
                style={{ position: 'absolute', bottom: '40px', left: '20px' }}
                onSelect={addEmoji}
              />
            </div>
          }
        </div>

        <div className="Messenger-footer-attachments">
          <div className="Messenger-attachment-item" onClick={() => hiddenImageInput.current.click()}>
            <input ref={hiddenImageInput} type="file" accept="image/jpeg, image/png, image/gif, image/webp" onChange={selectAttachment} />
            <span><i className="uil uil-image"></i></span>
          </div>
          <div className="Messenger-attachment-item" onClick={() => hiddenVideoInput.current.click()}>
            <input ref={hiddenVideoInput} type="file" accept="video/x-mpeg2, video/x-msvideo, video/quicktime, video/mp4" onChange={selectAttachment} />
            <span><i className="uil uil-video"></i></span>
          </div>
          <div className="Messenger-attachment-item" onClick={() => hiddenFileInput.current.click()}>
            <input ref={hiddenFileInput} type="file" onChange={selectAttachment} />
            <span><i className="uil uil-file-alt"></i></span>
          </div>
        </div>

        {attachment && (
          <div className="Messenger-AttachmentPreview">
            <span>{attachment.name}</span>
            <button type="button" onClick={() => setAttachment(null)}>x</button>
          </div>
        )}

        <div className="Messenger-footer-actions">
          <button className="button-attachments"><i className="uil uil-paperclip"></i></button>
          <button className="button-send" type="button" onClick={sendMessage}>
            <i className="uil uil-message"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
