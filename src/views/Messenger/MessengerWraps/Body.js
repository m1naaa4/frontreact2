import React, { useEffect, useState }  from 'react'
import BoxMessage from './BoxMessage';
import Message from './Message';


export default function Body({conversation}) {


  const [messages, setMessages] = useState();
  const [sender, setSender] = useState();

  useEffect(() => {          
    if (conversation.messages !== undefined) {  
      setMessages(conversation.messages.messages);
      setSender(conversation.messages.user);
    }
},[conversation])


return (        
    <div className="Messenger-body msg_wrap">
        <div className="Messenger-messages '+ userID+'">
          {messages &&
            messages.map((message, index) => (
              <div key={index}>
                <Message message={message} sender={sender}/>
              </div>
            ))}

        </div>
        <BoxMessage sender={sender}/>
    </div>
      
    )
}