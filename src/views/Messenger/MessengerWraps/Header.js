import React  from 'react'
import {useDispatch, useSelector} from "react-redux";


export default function Header({conversation}) {

    console.log('fffffffffffffffffffffffffff', conversation.messages.success)

    


return (
    <>
        {conversation.messages.success &&
    (<div className="Messenger-head">
        <div className="Messenger-head-left">
          <div className="Friend-Active"></div>
          <div className="Messenger-head-user-thumb"><img src={conversation.messages.user.avatar} alt="avatar"/></div>
          <div className="Messenger-head-user-info">
            <label>{conversation.messages.user.name}</label>
            <span>Online</span>
          </div>
        </div>
        <div className="Messenger-head-right">
          <div className="Conversation-Options">
            <button type="button" className="Conversation-BTN"><i className="uil uil-ellipsis-h"></i></button>
            <ul className="ConversationOptions-List">
              <li className="Conversation-Option"><button>Action 1</button></li>
              <li className="Conversation-Option"><button>Action 2</button></li>
              <li className="Conversation-Option"><button>Action 3</button></li>
            </ul>
          </div>
        </div>
    </div>)
        }
    
    </>
    )
}