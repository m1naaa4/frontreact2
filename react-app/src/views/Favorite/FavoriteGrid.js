import React, { useEffect, useState, useRef } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube'
import Player from 'video-react/lib/components/Player'
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';
import { countryName } from '../../helpers/Helpres'
import { Text } from "../../containers/Language";
import AvatarTooltip from '../../utils/AvatarTooltip';


export default function FavoriteGrid({ favorite }) {

  const dispatch = useDispatch();
  const [classe, setClasse] = useState(true);
  const opts = {
    height: '300',
    width: '100%'
  };
  console.log("fav",favorite)

  const addTofavorite = (id, provider) => {
    setClasse(!classe)
    let data = {
      'url': 'favorite/addToFavorite',
      'provider_id': id,
      'provider': provider,
    }
    dispatch(AddFavoriteAction(data))
  }

  let history = useHistory();
  const user = useSelector(state => state.userProfile.userProfile);
  const ref = useRef();


  const goToShowproject = (id) => {
    localStorage.setItem('provider', 'project')
    localStorage.setItem('provider_name', favorite.name)
    history.push('/project/show/' + id)
  };

  return (
    <div className="grid-item offres" style={{ width: '370px' }}>
      <div className="offer-box">
        <div className="offer-header">
          <div className="offer-title">
            {(favorite.logo_link) ? <img style={{ width: "51px" }} src={favorite.logo_link} title="Nom du projet" alt="" /> :
              <img src='/assets/images/porject-logo.png' title="Nom du projet" alt="" />}
            <h3><span style={{ fontSize: "12px" }}> {favorite.provider && <a href="single-offer.html">{favorite.name}</a>}</span></h3>
            <div className='footer-title'>
              <span className='mr-5'>{favorite.sector && (favorite.sector.charAt(0).toUpperCase() + favorite.sector.slice(1))}, </span>
              {favorite.owner && favorite.owner.map((value) => {
                return <Link ref={ref} to={`/profile/${value.profile_id}`} data-toggle="tooltip" data-placement="top" title={value.profile.username}>
                  {value.profile.username.substring(0, 6)}

                  {(user?.id != favorite.owner[0].id) ? (<AvatarTooltip myRef={ref} data={value} />) : ("")}
                </Link>
              }
              )}
              <span>{favorite.visibility == 'public' ? <i className="uil uil-globe"></i> : ''}</span>
            </div>
          </div>
          <div className="offer-logo">
            <button className={`${classe ? 'near-deadline' : ''} offer-bookmark`} onClick={e => addTofavorite(favorite.id, favorite.provider)} type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i className="uil uil-bookmark"></i></button>
          </div>
        </div>
        {favorite.body &&
          <div className="PostBody"><div className="PostBody-Text">{favorite.body}</div></div>
        }
        <div className="offer-media">

          {
            favorite.media_link ? (favorite.is_video ? (
              <Player width="100%" height="100%"
                playsInline
                poster="/assets/poster.png"
                src={favorite.media_link}
              />
            ) : (favorite.type === 'youtube' ?
              (<YouTube videoId={favorite.media_link} opts={opts} />) : (<img style={{ width: "340px", height: "211px" }} src={favorite.media_link} alt="Project" />))) : ''
          }
        </div>
        <div className="offer-meta">
          <ul className="meta-items">
            <li className="meta-item">
              <div className="meta-icon">
                <img src="assets/images/icons/marker.svg" alt="" />

                      </div>
                      <div className="meta-details">
                        <span className="meta-value">{favorite.name}</span>
                      </div>
                    </li>
                    <li className="meta-item">
                      <div className="meta-icon">
                        <img src="assets/images/icons/value.svg" alt=""/>
                      </div>
                      <div className="meta-details">
                        <span className="meta-value">Type 3</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="offer-reactions">
                  <ul className="reactions-box">
                    <li className="reaction likes"><i className="dadupa-icon icon-clap"></i> <span>{favorite.likeCount}</span></li>
                    <li className="reaction views"><i className="uil uil-eye"></i> <span>1500</span></li>
                    <li className="reaction comments"><i className="uil uil-comment-dots"></i> <span>{favorite.commentCount}</span></li>
                    <li className="reaction shares" data-toggle="modal" data-target="#SharingModal"><i className="uil uil-share-alt"></i> <span>380 Shares</span></li>
                  </ul>
                </div>
              </div>
              <div className="meta-details">
                <span className="meta-title" onClick={() => goToShowproject(favorite.id)}><Text tid="targetAreas" /></span>
                <span className="meta-value">{countryName(favorite.project_area)}</span>
              </div>
            </li>
            <li className="meta-item">
              <div className="meta-icon">
                <img src="/assets/images/icons/cost.svg" alt="" />
              </div>
              <div className="meta-details">
                <span className="meta-title"><Text tid="funding" /></span>
                <span className="meta-value">${favorite.funding_search}</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="offer-reactions">
          <ul className="reactions-box">
            <li className="reaction likes"><i className="dadupa-icon icon-clap"></i> <span>{favorite.likeCount}</span></li>
            <li className="reaction views"><i className="uil uil-eye"></i> <span>1500</span></li>
            <li className="reaction comments"><i className="uil uil-comment-dots"></i> <span>{favorite.commentCount}</span></li>
            <li className="reaction shares" data-toggle="modal" data-target="#SharingModal"><i className="uil uil-share-alt"></i> <span>380 Shares</span></li>
          </ul>
        </div>
      </div>
    </div>

  )
}
