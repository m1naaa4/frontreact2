import React, { useRef, useState } from 'react'
import { useDispatch } from "react-redux";
import { SendMessageAction, GetConversationAction } from '../../../store/actions/Messenger/MessageAction';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import useOutsideClick from '../../../helpers/useOutsideClick';
import { useParams } from 'react-router';

export default function BoxMessage() {
  const params = useParams();
  const ref = useRef();
  const refmessage = useRef(null);
  const hiddenAttachmentInput = useRef(null);
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
    formData.append('attachments[]', attachment);
    formData.append('attachment_type', attachment.type || 'image');
    return formData;
  };

  const sendMessage = async () => {
    if ((text.trim() !== '' || attachment) && params.id) {
      try {
        await dispatch(SendMessageAction(buildPayload(), 'messages/store', ''));
        await dispatch(GetConversationAction({ receiver_id: params.id }, 'messages/show', 1));
      } finally {
        setText('');
        setAttachment(null);
        if (hiddenAttachmentInput.current) hiddenAttachmentInput.current.value = '';
        if (refmessage.current) refmessage.current.value = '';
      }
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

  const attachmentPreviewUrl = attachment ? URL.createObjectURL(attachment) : null;
  const isImageAttachment = attachment?.type?.startsWith('image/');

  useOutsideClick(ref, () => {
    SetEmojiPicker(false);
    refmessage.current.focus();
  });

  return (
    <div>
      <div id="EmojiPicker" className="Messenger-footer">
        <button type="button" className="Messenger-EmojiButton" onClick={triggerPicker} aria-label="Emoji">
          <i className="uil uil-smile"></i>
        </button>
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
        <div className="Messenger-footer-actions">
          <div className="Messenger-footer-attachments">
            <div className="Messenger-attachment-item" onClick={() => hiddenAttachmentInput.current.click()}>
              <input
                ref={hiddenAttachmentInput}
                type="file"
                accept="image/jpeg, image/png, image/gif, image/webp"
                onChange={selectAttachment}
              />
              <span><i className="uil uil-image"></i></span>
            </div>
            {attachment && (
              <div className="Messenger-AttachmentPreview">
                {isImageAttachment && attachmentPreviewUrl && (
                  <img src={attachmentPreviewUrl} alt={attachment.name} className="Messenger-AttachmentThumb" />
                )}
                <span>{attachment.name}</span>
                <button type="button" onClick={() => setAttachment(null)}>x</button>
              </div>
            )}
          </div>
          <button className="button-send" type="button" onClick={sendMessage}>
            <i className="uil uil-message"></i>
          </button>
        </div>
        {emojiPickerState &&
          <div ref={ref} className="Messenger-EmojiPickerWrap">
            <Picker
              enableFrequentEmojiSort={true}
              emoji=''
              onSelect={addEmoji}
            />
          </div>
        }
      </div>
    </div>
  );
}
