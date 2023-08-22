import React, { useCallback, useEffect, useRef, useState }  from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { GetConversationAction } from '../../../store/actions/Messenger/MessageAction';
import BoxMessage from './BoxMessage';
import Message from './Message';


export default function Body({messages, props}) {

  const [msgs, setMsgs] = useState();
  const [loadMore, setLoadMore] = useState(true);
  const [state, setState] = useState([]);
  const observer = useRef()
  const dispatch = useDispatch();
  const params = useParams();
  // console.log('OLD_SEND_MESSAGE_SUCCESSconversatiousern', conversation.user)

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementsByClassName('messagerie__body');
    if(props?.scrollable) {   
      // list has fixed height
      list.addEventListener('scroll', (e) => {
        const el = e.target;
        if(el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });  
    } else {  
      // list has auto height  
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
          setLoadMore(true);
        }
      });
    }
  });

  useEffect(() => {
    const list = document.getElementsByClassName('messagerie__body');

    if(list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [state]);

  useEffect(() => {          
    setMsgs(messages?.messages);
  })
  let data = {
    receiver_id : params.id
  }

  const getData = (load) => {
    if (load) {
      dispatch(GetConversationAction(data, 'messages/show', 'before'));
    }
  };

  // const lastProjectElementRef = useCallback( node =>{
  //   // if (messages.loading) return
   
  //   if (observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver( msgs => {
  //     console.log(messages?.messages.length, messages.count)
  //       if (messages?.messages.length < messages.count  ){  
  //           // dispatch(GetConversationAction(data, 'messages/show', 'before'));
  //           // setIsLoading(true)
  //       }
  //   })
  //   if (node) observer.current.observe(node)
  // }, [msgs])

  useEffect(scrollToBottom, [msgs]);


return (        
    <div className="Messenger-body msg_wrap">
        <div className="Messenger-messages '+ userID+'">
          {msgs &&
            msgs.map((message, index) => (
              <div key={index}  className='messagerie__body'>
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