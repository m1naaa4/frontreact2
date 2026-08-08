import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  CreateConversationAction,
  GetMessagesListAction,
  GetConversationAction,
  SearchUsersAction,
} from '../../store/actions/Messenger/MessageAction';
import { AcceptFriendAction, SendRequestFriendAction } from '../../store/actions/Friend/FriendsAction';
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
  const [pendingUsers, setPendingUsers] = useState({});
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

  const sendFriendRequest = async (user) => {
    setPendingUsers(previous => ({ ...previous, [user.id]: true }));
    setSearchError('');

    try {
      const res = await dispatch(SendRequestFriendAction({ friend_id: user.id, url: 'friend/sendRequest' }));

      if (res?.success === false) {
        setSearchError(res?.message || 'Demande impossible pour cet utilisateur.');
        return;
      }

      setSearchResults(previous => previous.map(item => (
        Number(item.id) === Number(user.id)
          ? { ...item, relationship_status: res?.status || 'pending_sent', can_message: res?.status === 'friends' }
          : item
      )));
    } catch (error) {
      setSearchError('Demande impossible pour cet utilisateur.');
    } finally {
      setPendingUsers(previous => ({ ...previous, [user.id]: false }));
    }
  };

  const acceptFriendRequest = async (user) => {
    setPendingUsers(previous => ({ ...previous, [user.id]: true }));
    setSearchError('');

    try {
      const res = await dispatch(AcceptFriendAction({
        request_id: user.request_id || user.id,
        friend_id: user.user_id || user.id,
        url: 'friend/friendAccept'
      }));

      if (res?.success === false) {
        setSearchError(res?.message || 'Impossible d\'accepter cette demande.');
        return;
      }

      setSearchResults(previous => previous.map(item => (
        Number(item.id) === Number(user.id)
          ? { ...item, relationship_status: 'friends', can_message: true }
          : item
      )));
      await openUserConversation({ ...user, relationship_status: 'friends', can_message: true });
    } catch (error) {
      setSearchError('Impossible d\'accepter cette demande.');
    } finally {
      setPendingUsers(previous => ({ ...previous, [user.id]: false }));
    }
  };

  const handleSearchResultClick = (user) => {
    if (user.can_message || user.relationship_status === 'friends') {
      openUserConversation(user);
      return;
    }

    if (user.relationship_status === 'pending_received') {
      acceptFriendRequest(user);
      return;
    }

    sendFriendRequest(user);
  };

  const relationshipLabel = (user) => {
    if (user.can_message || user.relationship_status === 'friends') return 'Message';
    if (user.relationship_status === 'pending_sent') return 'Demande envoyée';
    if (user.relationship_status === 'pending_received') return 'À accepter';
    return 'Ajouter';
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
          placeholder={showComposer ? 'Rechercher un ami par nom...' : 'Cliquez ou tapez pour chercher un ami'}
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
          Tape au moins 2 lettres pour chercher un ami.
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
              disabled={user.relationship_status === 'pending_sent' || pendingUsers[user.id]}
            >
              <img src={user.avatar || '/assets/images/avatar.png'} alt="avatar" />
              <span className="Messenger-SearchResultName">{user.name}</span>
              <span className="Messenger-SearchResultStatus">
                {pendingUsers[user.id] ? 'Envoi...' : relationshipLabel(user)}
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

      {!showComposer && typeof users?.conversations !== 'string' && filteredUsers.length === 0 && (
        <div className="Messenger-EmptySearch">Aucune conversation.</div>
      )}
    </div>
  );
}
