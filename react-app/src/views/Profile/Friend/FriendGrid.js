import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { RemoveFriendAction } from '../../../store/actions/Friend/FriendsAction';
import { useDispatch } from 'react-redux';

export default function FriendGrid({friend}) {
    const dispatch = useDispatch();
    const params = useParams();

    const removeFriend = (id) =>{
      let data ={
          'request_id' : id,
          'url' : 'friend/friendRemove',
      }
      dispatch(RemoveFriendAction(data)); 
  }
    return (
        <>
            
                    {/* <h3><Link to={`/profile/${friend.id}/me`}>{friend.name}</Link></h3> */}
                
            <div className="FriendBox-Item">
                <div className="FriendBox">
                  <button type="button"  onClick={() => {removeFriend(friend.id)}} className="FriendBox-Delete"><i className="uil uil-trash-alt"></i></button>
                  <Link to={`/profile/${params.id}/me`}>
                    <div className="FriendThumb"><img src={friend.profile.avatar_link} alt="avatar"/></div>
                    <div className="FriendInfos">
                      <h3> {friend.profile.username}</h3>
                      <span>{friend.profile.job}</span>
                      <span>Funder - Agriculture</span>
                    </div>
                    </Link>
                </div>
            </div>
                    
        </>
    )
}