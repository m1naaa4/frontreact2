import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import YouTube from 'react-youtube'
import Player from 'video-react/lib/components/Player'
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';





export default function FavoriteGrid({favorite}) { 
    
    const dispatch = useDispatch();
    const [classe, setClasse] = useState(true);
    const opts = {
      height: '300',
      width: '100%'
    };

    const addTofavorite = (id, provider) => {
      setClasse(!classe)
      let data = {
          'url' : 'favorite/addToFavorite',
          'provider_id' : id,
          'provider'  : provider,
      }
      dispatch(AddFavoriteAction(data))
    }

    return (
          <div className="grid-item offres" style={{width:'370px'}}>
              <div className="offer-box">
                <div className="offer-header">
                  <div className="offer-title">
                    <h3> {favorite.provider && <a href="single-offer.html">{favorite.name}</a>}</h3>
                    <span>Secteur d’activité</span>
                  </div>
                  <div className="offer-logo">
                    <button className={`${classe ? 'near-deadline' : ''} offer-bookmark`} onClick={e => addTofavorite(favorite.id, favorite.provider)} type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i className="uil uil-bookmark"></i></button>
                    <img src={favorite.logo_link} title="Nom du projet" alt=""/>
                  </div>
                </div>
                {favorite.body && 
                  <div className="PostBody"><div className="PostBody-Text">{favorite.body}</div></div>
                }
                <div className="offer-media">
                
                {
                  favorite.media_link? (favorite.is_video ? (
                      <Player width="100%" height="100%"
                          playsInline
                          poster="/assets/poster.png"
                          src={favorite.media_link}
                      />
                      ) : (favorite.type === 'youtube' ?
                      (<YouTube videoId={favorite.media_link} opts={opts} />):(<img width="100%" height="300" src={favorite.media_link} alt="Project"/>))):''
                }
                </div>
                <div className="offer-meta">
                  <ul className="meta-items">
                    <li className="meta-item">
                      <div className="meta-icon">
                        <img src="assets/images/icons/marker.svg" alt=""/>
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
            </div> 
 
    )
}
