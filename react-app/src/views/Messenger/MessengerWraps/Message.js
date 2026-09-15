import React  from 'react'
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DeleteMessageAction } from '../../../store/actions/Messenger/MessageAction';

export default function Message({message}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.userProfile?.userProfile);
  // Do not let an incomplete legacy message record break the entire
  // conversation. The caller also filters these records, this is a final
  // defensive guard for direct use of this component.
  if (!message || typeof message !== 'object') {
    return null;
  }
  // The local storage value is the id sent to the messenger API. Prefer it
  // over profile ids (which can be UUIDs) when deciding which side owns a
  // message.
  const currentUserId = Number(localStorage.getItem('user_id') || currentUser?.id || currentUser?.user_id);
  const isMine = Number(message.sender_id) === currentUserId
    || String(message.sender_id) === String(currentUser?.id || currentUser?.user_id || '');
  let eye = message.read_at ? 'uil uil-eye' : 'uil uil-eye-slash';
  let classe = message.read_at ? 'message-seen' : '';

  const downloadUrl = message.attachment_url
    ? `${message.attachment_url}${message.attachment_url.includes('?') ? '&' : '?'}user_id=${currentUserId}`
    : '';

  const timeLabel = message.created_at ? moment(message.created_at).format('HH:mm') : '';

  const renderMessageContent = () => (
    <>
      {message.content && <div className="message-text">{message.content}</div>}
      {message.attachment_type === 'image' && (
        <a href={downloadUrl} target="_blank" rel="noreferrer">
          <img className="Messenger-ImagePreview" src={downloadUrl} alt={message.attachment_name || 'image'} />
        </a>
      )}
      {message.attachment_type === 'file' && (
        <a className="Messenger-FileDownload" href={downloadUrl} download={message.attachment_name}>
          <i className="uil uil-file-alt"></i>
          <span>{message.attachment_name || 'Télécharger le fichier'}</span>
        </a>
      )}
    </>
  );

  const deleteMessage = () => {
    if (window.confirm('Supprimer ce message ?')) {
      dispatch(DeleteMessageAction(message.id));
    }
  };

  return (
    <>
        {message && 
          (
            <>
            {!isMine ?
              (
                <div className="message incoming-message">
                  <Link className="avatar-wrapper avatar-small message-avatar" to={"/profile/"+ (message.sender?.profile_id || '')} >
                    <img src={message.sender?.profile?.avatar_link || '/assets/images/avatar.png'} alt="avatar"/>
                  </Link>
                  <div className="incoming-bubbles">
                    <div className='message-seen bubble bubble-light'>
                      {renderMessageContent()}
                    </div>
                    <div className="message-meta message-meta-incoming">
                      <span className="message-time"><i className='uil uil-eye'></i> {timeLabel}</span>
                    </div>
                  </div>
                </div>
              ):
              (
                <div className="message outcoming-message">
                  <div className="outcoming-bubbles">
                    <div className={`${classe} bubble bubble-dark`}>
                      <div className="message-meta message-meta-outgoing">
                        <span className="message-time">{timeLabel}</span>
                        <i className={eye}></i>
                      </div>
                      {renderMessageContent()}
                      <button className="Messenger-DeleteMessage" type="button" onClick={deleteMessage} aria-label="Supprimer ce message" title="Supprimer ce message">
                        <i className="uil uil-trash-alt"></i>
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
            </>
          )
        }    
    </>
  );
}
