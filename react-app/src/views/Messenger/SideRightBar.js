import React from 'react'
import { useSelector } from 'react-redux'

export default function SideRightBar() {
  const activeUser = useSelector(state => state.messages.user)

  if (!activeUser) {
    return (
      <div className="Messenger-RightPanel-Inner">
        <div className="Messenger-EmptySide">
          <div className="Messenger-EmptySide-Icon">💬</div>
          <h4>Conversation</h4>
          <p>Les détails du contact s'afficheront ici.</p>
        </div>
      </div>
    )
  }

  const initials = activeUser?.name
    ? activeUser.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()
    : 'RA'

  return (
    <div className="Messenger-RightPanel-Inner">
      <div className="Messenger-Profile-Panel">
        <div className="Messenger-Profile-Avatar">
          <div className="Messenger-Profile-Avatar-Large">
            {activeUser.avatar ? (
              <img src={activeUser.avatar} alt={activeUser.name} />
            ) : (
              <span>{initials}</span>
            )}
          </div>
        </div>
        
        <div className="Messenger-Profile-Name">
          <h3>{activeUser.name || 'Utilisateur'}</h3>
          <span className="Messenger-Profile-Status">En ligne</span>
        </div>

        <div className="Messenger-Profile-Info">
          <div className="Messenger-Profile-Info-Item">
            <i className="uil uil-user"></i>
            <span>Membre depuis {activeUser.created_at ? new Date(activeUser.created_at).toLocaleDateString('fr-FR') : '...'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}