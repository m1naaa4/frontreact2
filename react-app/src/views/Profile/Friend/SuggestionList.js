import React from 'react'
import { useDispatch } from 'react-redux';
import { SendRequestFriendAction } from '../../../store/actions/Friend/FriendsAction';




const  SuggestionList = ({suggestion}) => {

    const dispatch = useDispatch();
  
    const addFriend = (id) =>{
        let data ={
            'friend_id' : id,
            'url' : 'friend/sendRequest',
        }
        dispatch(SendRequestFriendAction(data)); 
    }

    return (
            <div className="Contact">
                <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                <div className="Contact-Thumb"><img src={suggestion.profile.avatar_link}  alt=""/></div>
                <div className="Contact-Infos">
                    <h4>{suggestion.name}</h4>
                </div>
                <div className="Add-Contact">
                    <button type="button" name="button" onClick={() => addFriend(suggestion.id)}><i className="uil uil-user-plus"></i></button>
                </div>
            </div>
    )

}
export default SuggestionList;