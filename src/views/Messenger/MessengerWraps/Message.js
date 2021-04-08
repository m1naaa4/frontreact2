import React  from 'react'
import {useDispatch, useSelector} from "react-redux";
import Moment from 'react-moment';


export default function Message({message, sender}) {

  
  const me = useSelector(state => state.userProfile.userProfile.id);
  let eye = message.read_at ? 'uil uil-eye' : 'uil uil-eye-slash';
  let classe = message.read_at ? 'bubble bubble-dark message-seen' : 'bubble bubble-light';
  
  return (
    <>
        {message && 
          (
            <>
            {!message.sender_id === me ?
              (
                <div className="message incoming-message">
                  <div className="avatar-wrapper avatar-small"><img src={sender.avatar} alt="avatar"/></div>
                  <div className="incoming-bubbles">
                    <div className={classe}><div className="message-text">{message.content}</div><span className="message-status"><i className={eye}></i>
                      {message.created_at} </span></div>
                  </div>
                </div>
              ):
              (
                <div className="message outcoming-message">
                  <div className="outcoming-bubbles">
                    <div className={classe}><span className="message-status">{message.created_at} 
                    <i className={eye}></i>
                    </span><div className="message-text">{message.content}</div></div>
                  </div>
                  <div className="avatar-wrapper avatar-small"></div>
                </div>
              )
            }
                <div className="messages-date"><label className="messages-date-label">
                <Moment fromNow>{message.created_at}</Moment>  
                </label></div>
            </>
          )
        }    
    </>
    )
}