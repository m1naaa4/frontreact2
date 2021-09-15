import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { MyFriendsAction, RemoveFriendAction, SendRequestFriendAction } from '../../../store/actions/Friend/FriendsAction';
import { useDispatch, useSelector } from 'react-redux';

export default function FriendGrid({friend}) {
    const user = useSelector(state => state.userProfile.userProfile);
    const dispatch = useDispatch();
    const params = useParams();
    const [exist, setExist] = useState(false);

    const myfriends = useSelector(state => state.userProfile.myfriends);

    console.log('myfriends', myfriends)
    
    
    useEffect(()=>{
      if (myfriends) {
          const ids = myfriends.map(function(item, i){
          return item.id;
        })
        setExist(ids.includes(friend.id))

        console.log('ttttttttttttttt', exist, friend.id, ids)
      }
    })

    

    const removeFriend = (id) =>{
      let data ={
          'request_id' : id,
          'url' : 'friend/friendRemove',
      }
      dispatch(RemoveFriendAction(data)); 
    }

    const addFriend = (id) =>{
      let data ={
          'friend_id' : id,
          'url' : 'friend/sendRequest',
      }
      dispatch(SendRequestFriendAction(data)); 
  }
    return (
        <>           
            <div className="FriendBox-Item">
                <div className="FriendBox">
                  {params.id === user?.profile?.id &&
                    <button type="button" onClick={() => {removeFriend(friend.id)}} className="FriendBox-Delete"><i className="uil uil-trash-alt"></i></button>
                  }
                  {!exist && (user?.profile?.id !== friend.profile.id && params.id === user?.profile?.id ? 
                    <button type="button" onClick={() => {addFriend(friend.id)}} className="FriendBox-Delete"><i className="uil uil-user-plus"></i></button>
                    : <button type="button" onClick={() => {removeFriend(friend.id)}} className="FriendBox-Delete"><i className="uil uil-trash-alt"></i></button>)
                  }
                  <Link to={`/profile/${friend.profile.id}`}>
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