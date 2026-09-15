import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DeleteConversationAction } from '../../../store/actions/Messenger/MessageAction';

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: receiverId } = useParams();
  const activeUser = useSelector(state => state.messages.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const initials = activeUser?.name
    ? activeUser.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()
    : 'RA';

  const deleteConversation = async () => {
    if (!receiverId || !window.confirm('Supprimer cette conversation et tous ses messages ?')) {
      return;
    }

    setDeleting(true);
    try {
      const res = await dispatch(DeleteConversationAction(receiverId));
      if (res?.success === true) {
        history.push('/messages');
      }
    } finally {
      setDeleting(false);
      setMenuOpen(false);
    }
  };

  return (
    <div className="Messenger-Header">
      <div className="Messenger-Header-Left">
        <button
          className="Messenger-BackButton"
          type="button"
          // Leaving a thread should always return to the message list. Using
          // browser history here can send a search-opened conversation to an
          // unrelated or stale route, which looks like a blank/crashed page.
          onClick={() => history.push('/messages')}
          title="Retour"
        >
          <i className="uil uil-angle-left-b"></i>
        </button>
        <div className="Messenger-Avatar">
          <span>{initials}</span>
        </div>
        <div className="Messenger-Header-Infos">
          <h4>{activeUser?.name || 'Conversation'}</h4>
          <span>{activeUser ? 'En ligne' : 'Sélectionnez une conversation'}</span>
        </div>
      </div>

      <div className="Messenger-Header-Actions" ref={menuRef}>
        <button
          type="button"
          className="Messenger-MenuButton"
          title="Options de la conversation"
          aria-label="Options de la conversation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}
        >
          <i className="uil uil-ellipsis-v"></i>
        </button>
        {menuOpen && (
          <div className="Messenger-ConversationMenu">
            <button type="button" onClick={deleteConversation} disabled={deleting}>
              <i className="uil uil-trash-alt"></i>
              {deleting ? 'Suppression...' : 'Supprimer la conversation'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
