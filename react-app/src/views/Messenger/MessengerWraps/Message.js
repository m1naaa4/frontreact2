import React, { useState }  from 'react'
import {useSelector} from "react-redux";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';


export default function Message({message}) {
  const me = useSelector(state => state.userProfile.userProfile.id);
  const [showtime, setShowtime] = useState(false);
  let eye = message.read_at ? 'uil uil-eye' : 'uil uil-eye-slash';
  let classe = message.read_at ? 'message-seen' : '';

  const calendarStrings = {
    lastDay : '[Yesterday at] LT',
    sameDay : 'LT',
    lastWeek : '[last] dddd [at] LT',
    sameElse : 'L'
};
  return (
    <>
        {message && 
          (
            <>
            {message.sender_id !== me ?
              (
                <div className="message incoming-message">
                  <Link className="avatar-wrapper avatar-small" to={"/profile/"+ message.sender.profile_id} >
                    <img  src={message.sender.profile.avatar_link} alt="avatar"/>
                  </Link>
                  <div className="incoming-bubbles">
                    <div className='message-seen bubble bubble-light'><div className="message-text">{message.content}</div><span className="message-status"><i className='uil uil-eye'></i>
                      {message.created_at} </span></div>
                  </div>
                </div>
              ):
              (
                <div className="message outcoming-message">
                  <div className="outcoming-bubbles">
                    <div className={`${classe} bubble bubble-dark`}><span className="message-status">{message.created_at} 
                    <i className={eye}></i>
                    </span><div className="message-text">{message.content}</div></div>
                  </div>
                  <div className="avatar-wrapper avatar-small"></div>
                </div>
              )
            }
            {
              <div className="messages-date"><label className="messages-date-label">
                <Moment calendar={calendarStrings}>
                {message.created_at}
                </Moment>
                {/* <Moment start fromNowDuring='1'>{message.created_at}</Moment>   */}
                </label></div>
            }
                
            </>
          )
        }    
    </>
    )
}