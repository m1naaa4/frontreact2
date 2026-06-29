import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LanguageSelectorView from '../../views/Fields/Language/LanguageSelectorView';

export default function SidebarNav() {
  const { t } = useTranslation();
  const userProfile = useSelector(state => state.userProfile.userProfile);
  const [isCompact, setIsCompact] = useState(() => {
    const storedValue = localStorage.getItem('sidebar-collapsed');
    if (storedValue !== null) {
      return storedValue === 'true';
    }

    if (typeof window !== 'undefined') {
      return window.innerWidth < 992;
    }

    return false;
  });

  const avatar = userProfile?.profile?.avatar_link || '/assets/images/avatar.png';
  const name = userProfile?.name || 'Utilisateur';
  const email = userProfile?.email || '';
  const role = userProfile?.type || 'Admin';
  const profileId = userProfile?.profile_id || '';

  useEffect(() => {
    const updateSidebarMode = () => {
      if (window.innerWidth < 992) {
        setIsCompact(true);
        return;
      }

      const storedValue = localStorage.getItem('sidebar-collapsed');
      if (storedValue === null) {
        setIsCompact(false);
      }
    };

    updateSidebarMode();
    window.addEventListener('resize', updateSidebarMode);

    return () => window.removeEventListener('resize', updateSidebarMode);
  }, []);

  const toggleSidebar = () => {
    setIsCompact(previousValue => {
      const nextValue = !previousValue;
      localStorage.setItem('sidebar-collapsed', String(nextValue));
      return nextValue;
    });
  };

  return (
    <aside className={`Sidebar-Nav ${isCompact ? 'Sidebar-Nav-Compact' : ''}`}>
      <div className="Sidebar-Nav-Inner">
        <div className="Sidebar-Brand">
          <img src="/assets/images/dadupa-brand-text.svg" alt="Dadupa" className="Sidebar-Logo" />
        </div>

        <div className="User-Profile">
          <div className="User-Image">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="User-Details">
            <label className="User-Name">{name}</label>
            <div className="User-Email">{email}</div>
            <div className="User-Role">Connecté / {role}</div>
          </div>
        </div>

        <nav className="Sidebar-Menu">
          <ul className="Sidebar-Nav-Items">
            <li className="Nav-Item">
              <NavLink exact to="/project/lists" className="Nav-Link" activeClassName="Active-Nav">
                <i className="uil uil-home-alt"></i>
                <span>{t('home') || 'Accueil'}</span>
              </NavLink>
            </li>
            <li className="Nav-Item">
              <NavLink exact to={profileId ? `/profile/${profileId}/meoffre` : '/profile'} className="Nav-Link" activeClassName="Active-Nav">
                <i className="uil uil-layer-group"></i>
                <span>{t('my_offre') || 'Mes offres'}</span>
              </NavLink>
            </li>
            <li className="Nav-Item">
              <NavLink exact to="/favorite" className="Nav-Link" activeClassName="Active-Nav">
                <i className="uil uil-star"></i>
                <span>{t('favorite') || 'Favoris'}</span>
              </NavLink>
            </li>
            <li className="Nav-Item">
              <NavLink exact to="/admin" className="Nav-Link" activeClassName="Active-Nav">
                <i className="uil uil-chart"></i>
                <span>{t('dashboard') || 'Tableau de bord'}</span>
              </NavLink>
            </li>
            <li className="Nav-Item">
              <NavLink exact to={profileId ? `/profile/${profileId}` : '/profile'} className="Nav-Link" activeClassName="Active-Nav">
                <i className="uil uil-user"></i>
                <span>{t('see_profile') || 'Profil'}</span>
              </NavLink>
            </li>
            <li className="Nav-Item">
              <NavLink exact to={profileId ? `/user/${profileId}/settings` : '/user'} className="Nav-Link" activeClassName="Active-Nav">
                <i className="uil uil-setting"></i>
                <span>{t('setting') || 'Paramètres'}</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="Sidebar-Footer">
          <div className="Sidebar-Language">
            <div className="Sidebar-Language-Title">
              <i className="uil uil-globe"></i>
              <span>LANGUE</span>
            </div>
            <LanguageSelectorView />
          </div>

          <button
            type="button"
            className="Sidebar-Collapse-Button"
            onClick={toggleSidebar}
            aria-label={isCompact ? 'Ouvrir la sidebar' : 'Réduire la sidebar'}
          >
            <i className={`uil ${isCompact ? 'uil-angle-right-b' : 'uil-angle-left-b'}`}></i>
          </button>
        </div>
      </div>
    </aside>
  );
}
