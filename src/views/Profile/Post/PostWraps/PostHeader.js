import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { DeletePostAction } from '../../../../store/actions/Post/PostAction';




export default function PostHeader({ post }) {

  const dispatch = useDispatch();
  const infoprofile = useSelector(state => state.infoProfile.infoprofile);
  const user = useSelector(state => state.userProfile.userProfile);
  const [options_List, SetOptions_List] = useState(false);
  const [user_profile_id, setUserProfileId] = useState();
  const [user_id, setUserId] = useState();

  const showOptions = () =>{
    SetOptions_List(!options_List)
  }
  useEffect(() => {          
    if (infoprofile.avatar) {             
      setUserProfileId(infoprofile.user_id);  
      setUserId(user.id);  
    }     
  },[infoprofile.avatar, infoprofile.user_id, user.id])

  const data = {
      post_id     : post.id,
      provider    : "post",
      user_id     : user_profile_id,
  }

  const supprimePost =(id) =>{
    dispatch(DeletePostAction(data, '', 'delete'));
    dispatch({type:'DELETE_POST_SUCCESS', id});
    SetOptions_List(!options_List)
  }

  return (
  
        <div className="PostHeader">
          <Link className="PostUser-Thumb" to={"/profile/"+ post.profile_id} ><img src={post.avatar} alt="avatar" /></Link>
          <Link className="PostUser-Details" to={"/profile/"+ post.profile_id}>
            <div className="PostUser-Name">{post.creator_name}</div>
            <div className="PostUser-Time">{post.created_at.date}</div>
          </Link>
         
            
          <div className="PostOptions">
            <button type="button" className="PostOptions-BTN" onClick={showOptions}><i className="uil uil-ellipsis-h"></i></button>
           {      
                options_List && (
                <ul className="PostOptions-List PostOptions-ListShow"  >
                  {/* <li className="PostFavorite">
                    <button><i className="uil uil-favorite"></i> Favorite</button>
                  </li>
                  <li className="PostKey">
                    <button><i className="uil uil-key-skeleton"></i> Historique clé</button>
                  </li> */}
                  {user_id === post.user_id &&
                    <li className="PostDelete">
                      <button onClick={e => supprimePost(post.id)}><i className="uil uil-trash-alt"></i> Supprimer</button>
                    </li>
                  }
                  
                </ul>
               )
          }

          </div>
           
          
        </div>
        

    )
}
