import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const history = useHistory();
  const activeUser = useSelector(state => state.messages.user);

  const initials = activeUser?.name
    ? activeUser.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()
    : 'RA';

  return (
    <div className="Messenger-Header">
      <div className="Messenger-Header-Left">
        <button
          className="Messenger-BackButton"
          type="button"
          onClick={() => {
            if (history.length > 1) {
              history.goBack();
            } else {
              history.push('/messages');
            }
          }}
        >
          ←
        </button>
        <div className="Messenger-Avatar">
          <span>{initials}</span>
        </div>
        <div className="Messenger-Header-Infos">
          <h4>{activeUser?.name || 'Conversation'}</h4>
          <span>{activeUser ? 'En ligne' : 'Sélectionnez une conversation'}</span>
        </div>
      </div>

      <div className="Messenger-Header-Actions">
        <button type="button" className="Messenger-MenuButton">⋮</button>
      </div>
    </div>
  );
}
