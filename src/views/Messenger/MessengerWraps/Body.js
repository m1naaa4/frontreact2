import React, { useEffect, useState }  from 'react'
import {useDispatch, useSelector} from "react-redux";
import Message from './Message';


export default function Body({conversation}) {


  const [messages, setMessages] = useState();

  useEffect(() => {          
    if (conversation.messages !== undefined) {  
      setMessages(conversation.messages.messages)
      console.log('fffffffffffffffffffffffffff', conversation.messages)
    }
},[conversation])


    return (
        
    <div className="Messenger-body msg_wrap">
        <div className="Messenger-messages '+ userID+'">
          {messages &&
            messages.map((message, index) => (
              <div key={index}>
                <Message message={message}/>
              </div>
            ))}

        </div>
        <div id="EmojiPicker" className="Messenger-footer"><input type="text" placeholder="Type messages here..."  data-emoji-picker="true"/>
        <div className="Messenger-footer-attachments">
        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a photo"><input type="file"/><span><i className="uil uil-image"></i></span></div>
        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a video"><input type="file"/><span><i className="uil uil-video"></i></span></div>
        <div className="Messenger-attachment-item" data-toggle="tooltip" data-placement="top" title="Attach a document"><input type="file"/><span><i className="uil uil-file-alt"></i></span></div>
        </div>
        <div className="Messenger-footer-actions"><button className="button-attachments"><i className="uil uil-paperclip"></i></button><button className="button-send" data-toggle="tooltip" data-placement="top" title="Send"><i className="uil uil-message"></i></button></div></div>
    </div>
      
    )
}