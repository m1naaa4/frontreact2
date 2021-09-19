import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { FriendsAction, RemoveFriendAction, SendRequestFriendAction } from '../../../../store/actions/Friend/FriendsAction';
import { useDispatch, useSelector } from 'react-redux';
import DropType from '../../../../utils/DropType';
import typeusers from "../../../../data/typeusers"

export default function SuggestionGrid({suggestions, filterInput, setFilterInput }) {
    const dispatch = useDispatch();
    const params = useParams();

    const { search, type, orderName } = filterInput;
    const [order, setOrder] =   useState(true);

    const count = useSelector(state => state.userProfile.countsuggestions);

    const orderfun = () => {
      setOrder(!order)
      order  ? filterInput.orderName = 'Desc' : filterInput.orderName = 'Asc';

      let data = {
        'url'   : 'friend/getFriends',
        'user_profile_id' : params.id,
        'search'  : filterInput.search,
        'type'  : filterInput.type,
        'sort' : filterInput.orderName,
      }
      const timeoutId = setTimeout(() => dispatch(FriendsAction(data)), 1000);
      return () => clearTimeout(timeoutId);
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
            {/* <div className="Network-Header">
                <div className="Network-HeaderLeft">
                <h2 className="Network-HeaderTitle"><span>{count}</span> Suggestions</h2>
                </div>
                
            </div> */}
            
            {/* <div className="Network-Filter Filter-Row">
                <form className="Filter-Form" action="#" method="post">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="display-flex">
                            <div className="input-row input-select input-small">
                                <DropType datas={typeusers} value={type} field='type' onChange={setFilterInput}/>
                            </div>
                            <div className="input-row">
                            <input type="text" name="search" defaultValue={search} placeholder="Rechercher un Contact" onChange={setFilterInput} required/>
                            </div>
                            <div className="input-row">
                            <button type="button" onClick={orderfun} className="OrderAlph">Ordre Alphabétique {orderName}</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>
            </div> */}
            <div className="Networks">
            { suggestions &&
                suggestions?.map((suggestion, index) => (
                <div className="FriendBox-Item" key={index}>
                    <div className="FriendBox">
                        <button type="button" onClick={() => {addFriend(suggestion.id)}} className="FriendBox-Accept"><i className="uil uil-user-plus"></i></button>
                        
                      <Link to={`/profile/${suggestion.profile.id}`}>
                        <div className="FriendThumb"><img src={suggestion.profile.avatar_link} alt="avatar"/></div>
                        <div className="FriendInfos">
                          <h3> {suggestion.profile.username}</h3>
                          <span>{suggestion.profile.job}</span>
                          <span>Funder - Agriculture</span>
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