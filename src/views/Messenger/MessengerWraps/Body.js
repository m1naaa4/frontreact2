import React, { useEffect, useRef, useState }  from 'react'
import BoxMessage from './BoxMessage';
import Message from './Message';


export default function Body({conversation}) {


  const [messages, setMessages] = useState();
  const [sender, setSender] = useState();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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
          <div ref={messagesEndRef} />
        </div>
        <BoxMessage sender={sender}/>
    </div>
      
    )
}