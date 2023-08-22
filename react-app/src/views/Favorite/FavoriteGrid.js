import React, { useEffect, useState, useRef } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';
import { countryName } from '../../helpers/Helpres'
import { Text } from "../../containers/Language";
import AvatarTooltip from '../../utils/AvatarTooltip';
import DialogWarning from '../../utils/DialogWarning';
import $ from "jquery";
import ReactPlayer from 'react-player';
import sectors from '../../data/sectorsCreate';
import { useTranslation } from 'react-i18next';


export default function FavoriteGrid({favorite}) { 
    
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false);
    const [classe, setClasse] = useState(true);
    const titleDialog = "Confirm To Remove From Favorite";
    const ContentDialog = "are you sure you want to remove this post from favorite?";
    const user = useSelector(state => state.userProfile.userProfile);
    const [sector, setSector] = useState();
    const ref = useRef();
    const [t] = useTranslation();

    const HandleConfirmation = (id, provider) => {
      setClasse(!classe)
      let data = {
          'url' : 'favorite/addToFavorite',
          'provider_id' : id,
          'provider'  : provider,
      }
      dispatch(AddFavoriteAction(data));
      setOpen(false);
    }

    const HandleClose = ()=>{
      setOpen(false);
    };
    
    const HandleClickOpen = () =>{
      setOpen(true);
    };

    const getExtension = (file) => {
      if (/^(https?:\/\/)?((www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/.test(file)) {
        return 'youtube';
      } else if (/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/.test(file)) {
        return 'vimeo';
      } else {
        return file.split('.').pop().toLowerCase();
      }
    };

    useEffect(() => {
      sectors.map((key) => {
        if (key[0] === favorite.sector) {
          setSector(t(key[1]))
        }
      });
    }, [])

    return (
          <div className="grid-item offres" style={{width:'370px'}}>
              <div className="offer-box">
                <div className="offer-header">
                  <div className="offer-title">
                  {(favorite.logo_link) ? <img style={{width:"51px"}} src={favorite.logo_link} title="Nom du projet" alt=""/> :
                        <img src='/assets/images/porject-logo.png' title="Nom du projet" alt=""/>}
                    <h3><span style={{fontSize:"12px"}}> {favorite.provider && <NavLink to={`/project/show/${favorite.id}`}>{favorite.name}</NavLink>}</span></h3>
                    <div className='footer-title'>
              <span className='mr-5'>{t(`${sector}`)} </span>
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
                    {/* <button className={`${classe ? 'near-deadline' : ''} offer-bookmark`} onClick={e => addTofavorite(favorite.id, favorite.provider)} type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i className="uil uil-bookmark"></i></button> */}
                    <button className={`${classe ? 'near-deadline' : ''} offer-bookmark`} onClick={HandleClickOpen} type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i className="uil uil-bookmark"></i></button>
                    <DialogWarning 
                        title={titleDialog} 
                        ContentText={ContentDialog} 
                        open={open} 
                        HandleConfirmation={(e)=>HandleConfirmation(favorite.id,favorite.provider)}
                        HandleClose={HandleClose}
                    />

                  </div>
                </div>
                {favorite.body && 
                  <div className="PostBody"><div className="PostBody-Text">{favorite.body}</div></div>
                }
                <div className="offer-media">
                  {(function() {
                    let link = $.type(favorite.media_link) !== "string" ? $.parseJSON(favorite.media_link) : favorite.media_link;
                    link = $.isArray(link) ? link[0] : link;
                    if (getExtension(link) == 'youtube') {
                        return <ReactPlayer width='340' url={link} controls={true} />
                    }else{
                        if (getExtension(link) == 'vimeo') {
                            return <ReactPlayer url={link} controls={true} />
                        }else{
                            if(getExtension(link) == 'mp4' || getExtension(link) == ('x-mpeg2') ||
                            getExtension(link) == ('x-msvideo') || getExtension(link) == ('quicktime')){
                                return <ReactPlayer width={340} url={link} controls={true} />
                            } else if (/\.(doc|docx|xls|xlsx|ppt|pptx|csv|pdf)$/i.test(link)) {
                                return <div className="Doc-Wrap">
                                    <a href="#!">
                                        <div className="Doc-Icon" height='300'><span className="Doc-Type">file</span><i className="uil uil-file-alt"></i></div>
                                    </a>
                                </div>
                            }
                            else{
                                return <img width="100%" height="300" src={link} alt="Project"/>
                            }
                        }
                    }
                })()}
                </div>
                <div className="offer-meta">
                  <ul className="meta-items">
                    <li className="meta-item">
                      <div className="meta-icon">
                        <img src="assets/images/icons/marker.svg" alt=""/>
                      </div>
                      <div className="meta-details">
                <span className="meta-title"><Text tid="targetAreas" /></span>
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
