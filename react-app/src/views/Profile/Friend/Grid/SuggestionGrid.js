import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SendRequestFriendAction } from '../../../../store/actions/Friend/FriendsAction';
import { useDispatch } from 'react-redux';

export default function SuggestionGrid({suggestions}) {
    const dispatch = useDispatch();

    const [showG, setShowG] = useState(true);
    const [gridId, setGridId] = useState();

    const show = (e) => {
      setShowG(true); 
      setGridId(e);
  };

    const addFriend = (id) =>{
      let data ={
          'friend_id' : id,
          'url' : 'friend/sendRequest',
      }
      dispatch(SendRequestFriendAction(data));
      setShowG(false)
    }
    return (
        <>
            <div className="Networks">
            { suggestions &&
                suggestions?.map((suggestion, index) => (
                  <>
                {showG && <div className="FriendBox-Item" key={index}>
                    <div className="FriendBox">
                        <button type="button" onClick={() => {addFriend(suggestion.id); show(suggestion.id)}} className="FriendBox-Accept"><i className="uil uil-user-plus"></i></button>
                        
                      <Link to={`/profile/${suggestion.profile.id}`}>
                        <div className="FriendThumb"><img src={suggestion.profile.avatar_link} alt="avatar"/></div>
                        <div className="FriendInfos">
                          <h3> {suggestion.profile.username}</h3>
                          <span>{suggestion.profile.job}</span>
                          <span>Funder - Agriculture</span>
                        </div>
                      </Link>
                    </div>
                </div>}
                </>
              ))
              
            }
            </div>        
        </>
    )
}