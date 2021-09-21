import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SendRequestFriendAction } from '../../../store/actions/Friend/FriendsAction';




const  SuggestionList = ({suggestion}) => {

    const [show, setShow] = useState(true);
    const dispatch = useDispatch();
  
    const addFriend = (id) =>{
        let data ={
            'friend_id' : id,
            'url' : 'friend/sendRequest',
        }
        dispatch(SendRequestFriendAction(data)); 
    }

    return (
        <>
            {show && <div className="Contact">
                <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                <div className="Contact-Thumb"> <Link to={`/profile/${suggestion.profile.id}`}><img src={suggestion.profile.avatar_link}  alt=""/></Link></div>
                <div className="Contact-Infos">
                    <Link to={`/profile/${suggestion.profile.id}`}><h4>{suggestion.name}</h4></Link>
                </div>
                <div className="Add-Contact">
                    <button type="button" name="button" onClick={() => {addFriend(suggestion.id); setShow(false)}}><i className="uil uil-user-plus"></i></button>
                </div>
            </div>}
        </>
    )

}
export default SuggestionList;