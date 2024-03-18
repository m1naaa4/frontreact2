import React, {  useState } from 'react'
import { Link } from 'react-router-dom';
import { SendRequestFriendAction } from '../../../../store/actions/Friend/FriendsAction';
import { useDispatch } from 'react-redux';
import typeusers from "../../../../data/typeusers"
import sectors from '../../../../data/sectors';
import { useTranslation } from 'react-i18next';

export default function SuggestionGrid({suggestions}) {
    const dispatch = useDispatch();

    const [gridId, setGridId] = useState();
    const [t] = useTranslation();

    const show = (e) => {
      setGridId(e);
    };

    const addFriend = (id) =>{
      let data ={
          'friend_id' : id,
          'url' : 'friend/sendRequest',
      }
      dispatch(SendRequestFriendAction(data));
    }
    return (
        <>
            <div className="Networks">
            { suggestions &&
                suggestions?.map((suggestion, index) => (
                gridId !== suggestion.id && <div className="FriendBox-Item" key={index}>
                    <div className="FriendBox">
                        <button type="button" onClick={() => {addFriend(suggestion.id); show(suggestion.id)}} className="FriendBox-Accept"><i className="uil uil-user-plus"></i></button>
                        
                      <Link to={`/profile/${suggestion.profile.id}`}>
                        <div className="FriendThumb"><img src={suggestion.profile.avatar_link} alt="avatar"/></div>
                        <div className="FriendInfos">
                          <h3> {suggestion.profile.username}</h3>
                          <span>{suggestion.profile.job}</span>
                          <span>
                          { typeusers.map((key) => 
                                {if (key[0] === suggestion.type) {
                                    return key[1]
                                }}
                            )}
                           - {
                             sectors.map((key) => 
                             // console.log(key[0], project?.project?.sector)
                               {if ( suggestion.sector.includes(key[0])) {
                                 return t(`${key[1]}`)
                               }}
                             )
                           }
                           </span>
                        </div>
                      </Link>
                    </div>
                </div>
              ))
              
            }
            </div>        
        </>
    )
}