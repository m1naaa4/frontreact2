import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LikeAction } from '../../../../store/actions/Like/LikeAction';
import AddComment from '../Comment/AddComment';
import ShowComment from '../Comment/ShowComment';
import PostHeader from './PostHeader';
import './sub.css'

export default function HeaderSub({post}) {

  const infoprofile = useSelector(state => state.infoProfile.infoprofile);
  const user = useSelector(state => state.userProfile.userProfile);
  const [avatar, setAvatar] = useState();
    

  useEffect(()=>{
    if (user?.id === post?.user_id) {
      setAvatar(user?.profile.avatar_link)
    }else{
      setAvatar(post.avatar)
    }
  },[user]);

    return (
      <div className="PostHeader">
          <Link className="PostUser-Thumb" to={"/profile/"+ post.profile_id} >
            <img src={avatar} alt="avatar" />
          </Link>
          <Link className="PostUser-Details" to={"/profile/"+ post.profile_id}>
            <div className="PostUser-Name">{post.creator_name}</div>
            <div className="PostUser-Time">{post.created_at.date}</div>
          </Link>
          <div className="PostOptions">
            <button type="button" className="PostOptions-BTN"><i className="uil uil-ellipsis-h"></i></button>
            <ul className="PostOptions-List">
                <li className="PostFavorite"><button><i className="uil uil-favorite"></i> Favori</button></li>
                <li className="PostKey"><button><i className="uil uil-key-skeleton"></i> Historique clé</button></li>
                <li className="PostDelete"><button><i className="uil uil-trash-alt"></i> Supprimer</button></li>
            </ul>
          </div>
    </div>
    )
}

