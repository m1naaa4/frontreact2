import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  CreateConversationAction,
  GetMessagesListAction,
  GetConversationAction,
  SearchUsersAction,
} from '../../store/actions/Messenger/MessageAction';
import _map from 'lodash/map';

export default function SideLeftBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(state => state.conversations);
  const [listusers, setListusers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showComposer, setShowComposer] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const params = useParams();

  // Clear error when component mounts
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  useEffect(() => {
    const conversations = users?.conversations || {};
    setListusers(Object.values(conversations));
  }, [users]);

  useEffect(() => {
    dispatch(GetMessagesListAction('messages/getConversations', '', 1));
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(GetConversationAction({ receiver_id: params.id }, 'messages/show', 1));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (!showComposer) {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.trim();
    if (term.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(() => {
      dispatch(SearchUsersAction({ name: term }))
        .then((res) => {
          setSearchResults(res?.users || []);
          setIsSearching(false);
        })
        .catch(() => {
          setSearchResults([]);
          setIsSearching(false);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [dispatch, searchTerm, showComposer]);

  const showConversation = (id) => {
    dispatch(GetConversationAction({ receiver_id: id }, 'messages/show', 1));
  };

  const openUserConversation = async (user) => {
    await dispatch(CreateConversationAction({ receiver_id: user.id }, 'messages/create', 1));
    dispatch(GetConversationAction({ receiver_id: user.id }, 'messages/show', 1));
    setShowComposer(false);
    setSearchTerm('');
    setSearchResults([]);
    history.push(`/messages/${user.id}`);
  };

  const filteredUsers = listusers.filter((user) => {
    const matchesUnread = unreadOnly ? Number(user.unread) > 0 : true;
    return matchesUnread;
  });

  return (
    <div className="Msgs-List nav nav-pillss" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <div className="Messenger-ListActions">
        <input
          type="search"
          className="Messenger-Search"
          placeholder={showComposer ? 'Rechercher un ami par nom...' : 'Cliquez sur + pour chercher un ami'}
          value={searchTerm}
          disabled={!showComposer}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="Messenger-NewChat"
          onClick={() => setShowComposer(prev => !prev)}
          title="Nouvelle conversation"
        >
          +
        </button>
        <button
          type="button"
          className={`Messenger-FilterUnread ${unreadOnly ? 'is-active' : ''}`}
          onClick={() => setUnreadOnly(prev => !prev)}
          title="Afficher seulement les messages non lus"
        >
          Non lues
        </button>
      </div>

      {showComposer && (
        <div className="Messenger-ComposerHint">
          Tape au moins 2 lettres pour chercher un ami.
        </div>
      )}

      {showComposer && isSearching && (
        <div className="Messenger-EmptySearch">Recherche en cours...</div>
      )}

      {showComposer && searchResults.length > 0 && (
        <div className="Messenger-SearchResults">
          {_map(searchResults, (user) => (
            <button
              type="button"
              key={user.id}
              className="Messenger-SearchResult"
              onClick={() => openUserConversation(user)}
            >
              <img src={user.avatar || '/assets/images/avatar.png'} alt="avatar" />
              <span>{user.name}</span>
            </button>
          ))}
        </div>
      )}

      {!showComposer && users?.loading && listusers.length === 0 && (
        <div className="Messenger-EmptySearch">Chargement...</div>
      )}

      {users?.error && (
        <div className="Messenger-ErrorMessage">
          <i className="uil uil-exclamation-circle"></i>
          <span>{users.error}</span>
          <button type="button" onClick={() => dispatch({ type: 'CLEAR_MESSENGER_ERROR' })}>
            <i className="uil uil-times"></i>
          </button>
        </div>
      )}

      {!showComposer && typeof users?.conversations === 'string' && (
        <div className="Messenger-EmptySearch text-danger">{users.conversations}</div>
      )}

      {!showComposer && Array.isArray(listusers) && typeof users?.conversations !== 'string' &&
        _map(filteredUsers, (user) => (
          <Link
            to={`/messages/${user.user_id}`}
            key={user.user_id}
            className="Msgs-Item New-Msg nav-link"
            onClick={() => showConversation(user.user_id)}
            role="tab"
          >
            <div className="Msgs-Image">
              <img src={user.avatar || '/assets/images/avatar.png'} alt="avatar" />
            </div>
            <div className="Msgs-Content">
              <div className="Msgs-User">{user.name}</div>
              <div className="Msgs-Text">{user.content}</div>
              <div className="Msgs-Meta">
                <span className="Msgs-Date">{user.created_at?.for_humans || ''}</span>
                {Number(user.unread) > 0 && <span className="Msgs-N">{user.unread}</span>}
              </div>
            </div>
          </Link>
        ))
      }

      {!showComposer && !users?.loading && typeof users?.conversations !== 'string' && filteredUsers.length === 0 && (
        <div className="Messenger-EmptySearch">Aucune conversation.</div>
      )}
    </div>
  );
}
