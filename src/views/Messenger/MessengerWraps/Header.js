import React, { useState }  from 'react'


export default function Header({conversation}) {

  const [show, setShow] = useState(false);
  const handleshow = () =>{
    setShow(!show);
  }

return (
    <>
        {conversation.user &&
    (<div className="Messenger-head">
        <div className="Messenger-head-left">
          <div className="Friend-Active"></div>
          <div className="Messenger-head-user-thumb"><img src={conversation.user.profile.avatar_link} alt="avatar"/></div>
          <div className="Messenger-head-user-info">
            <label>{conversation.user.name}</label>
            <span>Online</span>
          </div>
        </div>
       
          <div className="Messenger-head-right">
          <div className="Conversation-Options">
            <button onClick={handleshow} type="button" className="Conversation-BTN" ><i className="uil uil-ellipsis-h"></i></button>
          {show && (  
            <ul className="ConversationOptions-List ConversationOptions-ListShow">
              <li className="Conversation-Option"><button>Action 1</button></li>
              <li className="Conversation-Option"><button>Action 2</button></li>
              <li className="Conversation-Option"><button>Action 3</button></li>
            </ul>
             )
        }
          </div>
        </div>
       
    </div>)
        }
    
    </>
    )
}