import React, { useEffect, useRef, useState }  from 'react'
import BoxMessage from './BoxMessage';
import Message from './Message';


export default function Body({messages}) {


  const [msgs, setMsgs] = useState();
  // console.log('OLD_SEND_MESSAGE_SUCCESSconversation', conversation.messages)
  // console.log('OLD_SEND_MESSAGE_SUCCESSconversatiousern', conversation.user)

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [msgs]);

  useEffect(() => {          
    setMsgs(messages?.messages);
})


return (        
    <div className="Messenger-body msg_wrap">
        <div className="Messenger-messages '+ userID+'">
          {msgs &&
            msgs.map((message, index) => (
              <div key={index}>
                <Message message={message}/>
              </div>
            ))
          }
          <div ref={messagesEndRef} />
        </div>
        <BoxMessage/>
    </div>
      
    )
}