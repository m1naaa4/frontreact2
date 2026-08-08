import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SideLeftBar from './SideLeftBar';
import Body from './MessengerWraps/Body';
import Header from './MessengerWraps/Header';
import SideRightBar from './SideRightBar';
import PusherConsole from '../../services/PusherConsole';
import { GetMessagesListAction } from '../../store/actions/Messenger/MessageAction';
import './messenger.css';

export default function MainMessengerView() {
  const params = useParams();
  const dispatch = useDispatch();
  const pusherRef = useRef(null);
  const channelRef = useRef(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      return undefined;
    }

    // Initialize Pusher connection
    pusherRef.current = new PusherConsole();
    channelRef.current = pusherRef.current.subscribe(`${userId}-messages`);

    if (!channelRef.current) {
      console.warn('Could not subscribe to WebSocket channel');
      return undefined;
    }

    // Handle incoming messages
    channelRef.current.bind('message.created', function (data) {
      console.log('New message received via WebSocket:', data);
      dispatch({ type: 'SEND_MESSAGE_SUCCESS_PUSHER', res: data });
      dispatch(GetMessagesListAction('messages/getConversations', '', 1));
    });

    // Handle deleted messages
    channelRef.current.bind('message.deleted', function (data) {
      console.log('Message deleted via WebSocket:', data);
      dispatch({ type: 'DELETE_MESSAGE_SUCCESS_PUSHER', res: data });
      dispatch(GetMessagesListAction('messages/getConversations', '', 1));
    });

    // Handle seen messages
    channelRef.current.bind('message.seen', function (data) {
      console.log('Messages marked as seen via WebSocket:', data);
      dispatch(GetMessagesListAction('messages/getConversations', '', 1));
    });

    // Cleanup on unmount
    return () => {
      if (channelRef.current) {
        channelRef.current.unbind('message.created');
        channelRef.current.unbind('message.deleted');
        channelRef.current.unbind('message.seen');
        pusherRef.current?.unsubscribe(`${userId}-messages`);
      }
    };
  }, [dispatch]);

  return (
    <div className="Messenger-Wrapper">
      <div className="Messenger-LeftPanel">
        <div className="Messenger-LeftPanel-Header">
          <h2>Messages</h2>
        </div>
        <div className="Messenger-LeftPanel-List">
          <SideLeftBar />
        </div>
      </div>

      <div className="Messenger-MainPanel">
        {params.id ? (
          <div className="Messenger-Conversation">
            <Header />
            <Body />
          </div>
        ) : (
          <div className="Messenger-EmptyState">
            <div className="Messenger-EmptyState-Illustration">
              <div className="Messenger-EmptyState-Bubble"><i className="uil uil-comment-alt-message"></i></div>
            </div>
            <h3>Sélectionnez une conversation</h3>
            <p>Choisissez un message dans la liste pour lire la conversation.</p>
          </div>
        )}
      </div>

      {params.id && (
        <div className="Messenger-RightPanel">
          <SideRightBar />
        </div>
      )}
    </div>
  );
}
