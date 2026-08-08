import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { GetConversationAction, MarkSeenAction } from '../../../store/actions/Messenger/MessageAction';
import BoxMessage from './BoxMessage';
import Message from './Message';

export default function Body() {
  const [msgs, setMsgs] = useState([]);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const messagesEndRef = useRef(null);
  const scrollRef = useRef(null);
  const stickToBottomRef = useRef(true);
  const conversation = useSelector(state => state.messages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (params.id) {
      dispatch(GetConversationAction({ receiver_id: params.id }, 'messages/show', 1));
      dispatch(MarkSeenAction({ receiver_id: params.id }));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    setMsgs(conversation?.messages || []);
    stickToBottomRef.current = true;
  }, [conversation]);

  useEffect(() => {
    if (stickToBottomRef.current && !loadingOlder) {
      scrollToBottom();
    }
  }, [msgs, loadingOlder]);

  const loadOlderMessages = async () => {
    if (!params.id || loadingOlder) {
      return;
    }

    const container = scrollRef.current;
    const before = msgs[0]?.created_at;

    if (!before) {
      return;
    }

    setLoadingOlder(true);
    stickToBottomRef.current = false;
    const previousHeight = container?.scrollHeight || 0;
    await dispatch(GetConversationAction({ receiver_id: params.id, before }, 'messages/show', 1));
    requestAnimationFrame(() => {
      if (container) {
        container.scrollTop = container.scrollHeight - previousHeight;
      }
      stickToBottomRef.current = false;
      setLoadingOlder(false);
    });
  };

  return (
    <div className="Messenger-body msg_wrap">
      <div
        className="Messenger-messages"
        ref={scrollRef}
        onScroll={(e) => {
          if (e.currentTarget.scrollTop === 0) {
            loadOlderMessages();
          }
        }}
      >
        {msgs.length === 0 && (
          <div className="Messenger-EmptyMessages">
            <div className="Messenger-EmptyMessages-Icon"><i className="uil uil-comment-alt-message"></i></div>
            <p>Aucun message dans cette conversation.</p>
            <span>Envoyez un message pour commencer.</span>
          </div>
        )}
        {msgs.map((message, index) => (
          <div key={index} className='messagerie__body'>
            <Message message={message} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <BoxMessage />
    </div>
  );
}
