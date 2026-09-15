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
  const [searchError, setSearchError] = useState('');
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
      setSearchError('');
      return;
    }

    let cancelled = false;
    setIsSearching(true);
    setSearchError('');
    const timeout = setTimeout(() => {
      dispatch(SearchUsersAction({ name: term }))
        .then((res) => {
          if (cancelled) {
            return;
          }
          if (res?.success === false) {
            setSearchError(res?.message || 'Impossible de rechercher les utilisateurs.');
            setSearchResults([]);
          } else {
            setSearchResults(res?.users || []);
          }
          setIsSearching(false);
        })
        .catch((error) => {
          if (cancelled) {
            return;
          }
          console.error('Messenger search failed:', error);
          setSearchResults([]);
          setSearchError('Impossible de rechercher les utilisateurs.');
          setIsSearching(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [dispatch, searchTerm, showComposer]);

  const showConversation = (id) => {
    dispatch(GetConversationAction({ receiver_id: id }, 'messages/show', 1));
  };

  const openUserConversation = async (user) => {
    const receiverId = user.id || user.user_id;
    if (!receiverId) {
      setSearchError('Utilisateur invalide.');
      return;
    }

    try {
      await dispatch(CreateConversationAction({ receiver_id: receiverId }, 'messages/create', 1));
    } catch (error) {
      // Non-blocking: first message will create the conversation when create is unavailable.
      console.warn('Create conversation failed, opening thread anyway:', error?.response?.data || error);
    }

    dispatch(GetConversationAction({ receiver_id: receiverId }, 'messages/show', 1));
    setShowComposer(false);
    setSearchTerm('');
    setSearchResults([]);
    setSearchError('');
    history.push(`/messages/${receiverId}`);
  };

  const handleSearchResultClick = (user) => {
    openUserConversation(user);
  };

  const relationshipLabel = (user) => {
    return 'Message';
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
          placeholder={showComposer ? 'Rechercher un utilisateur...' : 'Cliquez ou tapez pour chercher un utilisateur'}
          value={searchTerm}
          onFocus={() => setShowComposer(true)}
          onChange={(e) => {
            setShowComposer(true);
            setSearchTerm(e.target.value);
          }}
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
          Tape au moins 2 lettres pour chercher un utilisateur.
        </div>
      )}

      {showComposer && isSearching && (
        <div className="Messenger-EmptySearch">Recherche en cours...</div>
      )}

      {showComposer && searchError && (
        <div className="Messenger-ErrorMessage">
          <i className="uil uil-exclamation-circle"></i>
          <span>{searchError}</span>
        </div>
      )}

      {showComposer && searchResults.length > 0 && (
        <div className="Messenger-SearchResults">
          {_map(searchResults, (user) => (
            <button
              type="button"
              key={user.id}
              className={`Messenger-SearchResult Messenger-SearchResult-${user.relationship_status}`}
              onClick={() => handleSearchResultClick(user)}
            >
              <img src={user.avatar || '/assets/images/avatar.png'} alt="avatar" />
              <span className="Messenger-SearchResultName">{user.name}</span>
              <span className="Messenger-SearchResultStatus">
                {relationshipLabel(user)}
              </span>
            </button>
          ))}
        </div>
      )}

      {showComposer && !isSearching && searchTerm.trim().length >= 2 && !searchError && searchResults.length === 0 && (
        <div className="Messenger-EmptySearch">Aucun utilisateur trouvé.</div>
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

      {typeof users?.conversations === 'string' && (
        <div className="Messenger-EmptySearch text-danger">{users.conversations}</div>
      )}

      {showComposer && filteredUsers.length > 0 && (
        <div className="Messenger-ConversationsLabel">Conversations</div>
      )}

      {Array.isArray(listusers) && typeof users?.conversations !== 'string' &&
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

      {!showComposer && typeof users?.conversations !== 'string' && filteredUsers.length === 0 && (
        <div className="Messenger-EmptySearch">Aucune conversation.</div>
      )}
    </div>
  );
}
