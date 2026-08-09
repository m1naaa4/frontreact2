import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function getMonthKey(dateValue) {
  if (!dateValue) return null;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function formatPercent(value) {
  const rounded = Math.round(value);
  return `${rounded > 0 ? '+' : ''}${rounded}%`;
}

export default function MainView() {
  const { t } = useTranslation();
  const userProfile = useSelector(state => state.userProfile.userProfile);
  const favorites = useSelector(state => state.userProfile.favorites) || [];
  const notifications = useSelector(state => state.getnotifications.notifications) || [];
  const projects = useSelector(state => state.projects.projects) || [];
  const currentMonth = useMemo(() => new Date(), []);

  const stats = useMemo(() => {
    const visibleProjects = Array.isArray(projects) ? projects : [];
    const totalViews = visibleProjects.reduce((sum, project) => sum + Number(project?.visit || project?.views || 0), 0);
    const recentProjects = [...visibleProjects]
      .filter(project => project?.visit !== undefined || project?.views !== undefined)
      .sort((left, right) => Number(right?.visit || right?.views || 0) - Number(left?.visit || left?.views || 0))
      .slice(0, 4);

    const currentMonthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const previousMonthKey = `${previousMonth.getFullYear()}-${String(previousMonth.getMonth() + 1).padStart(2, '0')}`;

    const currentMonthViews = visibleProjects.reduce((sum, project) => {
      return getMonthKey(project?.created_at || project?.updated_at) === currentMonthKey ? sum + Number(project?.visit || project?.views || 0) : sum;
    }, 0);

    const previousMonthViews = visibleProjects.reduce((sum, project) => {
      return getMonthKey(project?.created_at || project?.updated_at) === previousMonthKey ? sum + Number(project?.visit || project?.views || 0) : sum;
    }, 0);

    const viewsDelta = previousMonthViews > 0 ? ((currentMonthViews - previousMonthViews) / previousMonthViews) * 100 : (currentMonthViews > 0 ? 100 : 0);

    return {
      totalViews,
      recentProjects,
      currentMonthViews,
      previousMonthViews,
      viewsDelta,
      favoriteCount: favorites.length,
      notificationCount: notifications.length,
      activityCount: visibleProjects.length,
    };
  }, [projects, favorites.length, notifications.length, currentMonth]);

  const maxViews = Math.max(...stats.recentProjects.map(project => Number(project?.visit || project?.views || 0)), 1);
  const comparisonFallback = stats.previousMonthViews > 0 ? formatPercent(stats.viewsDelta) : 'Pas assez de données';

  return (
    <div className="Page-Wrapper Profile Dashboard-Page">
      <div className="container">
        <div className="Dashboard-Hero Dashboard-Hero-Simple">
          <div>
            <p className="Dashboard-Kicker">{t('dashboard') || 'Dashboard'}</p>
            <h2 className="Dashboard-Title">Vue d’ensemble</h2>
            <p className="Dashboard-Subtitle">Analyse rapide des performances sans infos personnelles superflues.</p>
          </div>
          <NavLink to={userProfile?.profile_id ? `/profile/${userProfile.profile_id}` : '/profile'} className="Dashboard-Back-Link">
            <i className="uil uil-user"></i>
            Retour au profil
          </NavLink>
        </div>

        <div className="Dashboard-Stats-Grid Dashboard-Stats-Grid-Compact">
          <div className="Dashboard-Stat-Card"><div className="Dashboard-Stat-Icon"><i className="uil uil-eye"></i></div><div><div className="Dashboard-Stat-Value">{stats.totalViews}</div><div className="Dashboard-Stat-Label">Vues totales</div></div></div>
          <div className="Dashboard-Stat-Card"><div className="Dashboard-Stat-Icon"><i className="uil uil-heart"></i></div><div><div className="Dashboard-Stat-Value">{stats.favoriteCount}</div><div className="Dashboard-Stat-Label">Favoris</div></div></div>
          <div className="Dashboard-Stat-Card"><div className="Dashboard-Stat-Icon"><i className="uil uil-bell"></i></div><div><div className="Dashboard-Stat-Value">{stats.notificationCount}</div><div className="Dashboard-Stat-Label">Notifications</div></div></div>
          <div className="Dashboard-Stat-Card"><div className="Dashboard-Stat-Icon"><i className="uil uil-chart-line"></i></div><div><div className="Dashboard-Stat-Value">{comparisonFallback}</div><div className="Dashboard-Stat-Label">Vs mois précédent</div></div></div>
        </div>

        <div className="Dashboard-Content-Grid Dashboard-Content-Grid-Compact">
          <div className="Dashboard-Panel">
            <div className="Dashboard-Panel-Header"><h3>Statistiques</h3><span>{stats.activityCount} projets</span></div>
            <div className="Dashboard-Metric"><div className="Dashboard-Metric-Label">Vues ce mois</div><div className="Dashboard-Metric-Value">{stats.currentMonthViews}</div></div>
            <div className="Dashboard-Metric"><div className="Dashboard-Metric-Label">Vues mois précédent</div><div className="Dashboard-Metric-Value">{stats.previousMonthViews}</div></div>
            <div className="Dashboard-Metric"><div className="Dashboard-Metric-Label">Comparaison</div><div className="Dashboard-Metric-Value">{comparisonFallback}</div></div>
          </div>

          <div className="Dashboard-Panel">
            <div className="Dashboard-Panel-Header"><h3>Vues par projet</h3><span>Top 4</span></div>
            <div className="Dashboard-Project-List">
              {stats.recentProjects.length > 0 ? stats.recentProjects.map(project => {
                const views = Number(project?.visit || project?.views || 0);
                const width = Math.max((views / maxViews) * 100, 8);
                return (
                  <div className="Dashboard-Project-Row" key={project?.id || project?.slug || project?.name}>
                    <div className="Dashboard-Project-Row-Top">
                      <span className="Dashboard-Project-Name">{project?.name || project?.title || 'Projet'}</span>
                      <span className="Dashboard-Project-Views">{views}</span>
                    </div>
                    <div className="Dashboard-Progress"><div className="Dashboard-Progress-Bar" style={{ width: `${width}%` }} /></div>
                  </div>
                );
              }) : <div className="Dashboard-Empty-State">Aucune donnée de projet disponible pour le moment.</div>}
            </div>
          </div>
        </div>

        <div className="Dashboard-Content-Grid Dashboard-Content-Grid-Compact Dashboard-Content-Grid-Second">
          <div className="Dashboard-Panel Dashboard-Activity-Panel">
            <div className="Dashboard-Panel-Header"><h3>Activités récentes</h3><span>Derniers ajouts</span></div>
            <div className="Dashboard-Activity-List">
              {stats.recentProjects.slice(0, 3).map(project => (
                <div className="Dashboard-Activity-Item" key={`activity-${project?.id || project?.name}`}>
                  <i className="uil uil-file-alt"></i>
                  <div>
                    <div className="Dashboard-Activity-Title">{project?.name || project?.title || 'Projet'} publié</div>
                    <div className="Dashboard-Activity-Subtitle">{Number(project?.visit || project?.views || 0)} vues totales</div>
                  </div>
                </div>
              ))}
              {favorites.slice(0, 2).map(favorite => (
                <div className="Dashboard-Activity-Item" key={`favorite-${favorite?.id}`}>
                  <i className="uil uil-heart"></i>
                  <div>
                    <div className="Dashboard-Activity-Title">{favorite?.name || favorite?.title || 'Favori ajouté'}</div>
                    <div className="Dashboard-Activity-Subtitle">Ajouté à vos favoris</div>
                  </div>
                </div>
              ))}
              {notifications.slice(0, 2).map(notification => (
                <div className="Dashboard-Activity-Item" key={`notification-${notification?.id}`}>
                  <i className="uil uil-bell"></i>
                  <div>
                    <div className="Dashboard-Activity-Title">{notification?.description || 'Notification'}</div>
                    <div className="Dashboard-Activity-Subtitle">{notification?.created_at?.for_humans || 'Récente'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="Dashboard-Panel">
            <div className="Dashboard-Panel-Header"><h3>Résumé</h3><span>Lecture rapide</span></div>
            <div className="Dashboard-Summary-Stack">
              <div className="Dashboard-Summary-Item">
                <span>Total vues</span>
                <strong>{stats.totalViews}</strong>
              </div>
              <div className="Dashboard-Summary-Item">
                <span>Favoris</span>
                <strong>{stats.favoriteCount}</strong>
              </div>
              <div className="Dashboard-Summary-Item">
                <span>Notifications</span>
                <strong>{stats.notificationCount}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
