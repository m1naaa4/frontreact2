import React  from 'react'
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DeleteMessageAction } from '../../../store/actions/Messenger/MessageAction';

export default function Message({message}) {
  const dispatch = useDispatch();
  const me = useSelector(state => state.userProfile.userProfile?.id);
  const currentUserId = Number(me || localStorage.getItem('user_id'));
  const isMine = Number(message.sender_id) === currentUserId;
  let eye = message.read_at ? 'uil uil-eye' : 'uil uil-eye-slash';
  let classe = message.read_at ? 'message-seen' : '';

  const calendarStrings = {
    lastDay : '[Yesterday at] LT',
    sameDay : 'LT',
    lastWeek : '[last] dddd [at] LT',
    sameElse : 'L'
  };

  const downloadUrl = message.attachment_url
    ? `${message.attachment_url}${message.attachment_url.includes('?') ? '&' : '?'}user_id=${currentUserId}`
    : '';

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
                  <Link className="avatar-wrapper avatar-small" to={"/profile/"+ (message.sender?.profile_id || '')} >
                    <img  src={message.sender?.profile?.avatar_link || '/assets/images/avatar.png'} alt="avatar"/>
                  </Link>
                  <div className="incoming-bubbles">
                    <div className='message-seen bubble bubble-light'>
                      {renderMessageContent()}
                      <span className="message-status">
                        <i className='uil uil-eye'></i> {message.created_at}
                      </span>
                    </div>
                  </div>
                </div>
              ):
              (
                <div className="message outcoming-message">
                  <div className="outcoming-bubbles">
                    <div className={`${classe} bubble bubble-dark`}>
                      <span className="message-status">
                        {message.created_at} <i className={eye}></i>
                      </span>
                      {renderMessageContent()}
                      <button className="Messenger-DeleteMessage" type="button" onClick={deleteMessage}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
            {
              <div className="messages-date">
                <label className="messages-date-label">
                  {moment(message.created_at).calendar(null, calendarStrings)}
                </label>
              </div>
            }
            </>
          )
        }    
    </>
  );
}
