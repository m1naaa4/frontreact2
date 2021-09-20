import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { FriendsAction, RemoveFriendAction, SendRequestFriendAction } from '../../../../store/actions/Friend/FriendsAction';
import { useDispatch, useSelector } from 'react-redux';
import DropType from '../../../../utils/DropType';
import typeusers from "../../../../data/typeusers"

export default function FriendGrid({friends, filterInput, setFilterInput }) {
    const user = useSelector(state => state.userProfile.userProfile);
    const dispatch = useDispatch();
    const params = useParams();
    const [showG, setShowG] = useState(true);
    const [gridId, setGridId] = useState();

    const { search, type, orderName } = filterInput;
    const [order, setOrder] =   useState(true);
    const [ids, setIds] =  useState();

    const myfriends = useSelector(state => state.userProfile.myfriends);
    const count = useSelector(state => state.userProfile.count);

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
    
    let friendsIds = [];
    useEffect(()=>{
      if (myfriends) {
          let friendsIds = myfriends.map(function(item, i){
          return item.id;
        })
        setIds(friendsIds)
      }
    },[count])
    console.log("ids.includes(friend.id)", ids)

    const show = (e) => {
      setShowG(true); 
      setGridId(e);
  };

    const removeFriend = (id) =>{
      let data ={
          'request_id' : id,
          'url' : 'friend/friendRemove',
      }
      dispatch(RemoveFriendAction(data));
      setShowG(false)
    }

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
            <div className="Network-Header">
                <div className="Network-HeaderLeft">
                <h2 className="Network-HeaderTitle"><span>{count}</span> Friends</h2>
                </div>
                
            </div>
            
            <div className="Network-Filter Filter-Row">
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
            </div>
            <div className="Networks">
            { friends &&
                friends?.map((friend, index) => (
                  <>
                {showG && 
                  <div className="FriendBox-Item" key={index}>
                    <div className="FriendBox">
                      {params.id === user?.profile?.id ?
                        <button type="button" onClick={() => {removeFriend(friend.id); show(friend.id)}} className="FriendBox-Delete"><i className="uil uil-trash-alt"></i></button>
                        : params.id !== user?.profile?.id && !friendsIds.includes(friend.id) && user?.profile?.id !== friend.profile.id ?
                        <button type="button" onClick={() => {addFriend(friend.id); show(friend.id)}} className="FriendBox-Accept"><i className="uil uil-user-plus"></i></button>
                        : <button type="button" onClick={() => {removeFriend(friend.id); show(friend.id)}} className="FriendBox-Delete"><i className="uil uil-trash-alt"></i></button>
                      
                      }
                      {/* {friendsIds.includes(friend.id) && params.id === user?.profile?.id ? 
                        <button type="button" onClick={() => {addFriend(friend.id)}} className="FriendBox-Accept"><i className="uil uil-user-plus"></i>11</button>
                        : <button type="button" onClick={() => {removeFriend(friend.id)}} className="FriendBox-Delete"><i className="uil uil-trash-alt"></i>22</button>
                      } */}
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
                }
                  </>
              ))
            }
            </div>        
        </>
    )
}