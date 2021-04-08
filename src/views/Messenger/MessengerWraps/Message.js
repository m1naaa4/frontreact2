import React  from 'react'
import {useDispatch, useSelector} from "react-redux";


export default function Message({message}) {

return (
    <>
        {message && 
          (
            <>
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
            </>
          )
        }    
    </>
    )
}