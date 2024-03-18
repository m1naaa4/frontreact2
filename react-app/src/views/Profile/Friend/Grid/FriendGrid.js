import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { FriendsAction, RemoveFriendAction, SendRequestFriendAction } from '../../../../store/actions/Friend/FriendsAction';
import { useDispatch, useSelector } from 'react-redux';
import DropType from '../../../../utils/DropType';
import typeusers from "../../../../data/typeusersCreate"
import sectors from '../../../../data/sectors';
import useOutsideClick from '../../../../helpers/useOutsideClick';
import { useTranslation } from 'react-i18next';


export default function FriendGrid({friends, filterInput, setFilterInput }) {
    const user = useSelector(state => state.userProfile.userProfile);
    const dispatch = useDispatch();
    const params = useParams();
    const ref = useRef();
    const [gridId, setGridId] = useState();
    const [typeuser, setTypeuser] = useState();
    const [t] = useTranslation();
    const ordersList = {
      'recent' : 'DESC',
      'first_name' : 'First Name',
      'last_name' : 'Last Name',
    };

    const { search, type} = filterInput;
    const [orderValue, setOrderValue] =   useState('recent');
    const [ids, setIds] =  useState();
    const [order, setOrder] =  useState();

    const myfriends = useSelector(state => state.userProfile.myfriends);
    const count = useSelector(state => state.userProfile.count);
    const [showOrder, setShowOrder] = useState(false);
    useOutsideClick(ref, () => {
      setShowOrder(false)
    });

    const orderfun = () => {
      setOrder(!order)
      order  ? filterInput.orderName = 'Desc' : filterInput.orderName = 'Asc';

      let data = {
        'url'   : 'friend/getFriends',
        'user_profile_id' : params.id,
        'search'  : filterInput.search,
        'type'  : filterInput.type??'all',
        'sort' : filterInput.orderName,
      }
      const timeoutId = setTimeout(() => dispatch(FriendsAction(data)), 1000);
      return () => clearTimeout(timeoutId);
    }
    
    let friendsIds = [];
    useEffect(()=>{
      setShowOrder(false)
    },[orderValue])

    useEffect(()=>{
      if (myfriends) {
          let friendsIds = myfriends.map(function(item, i){
          return item.id;
        })
        setIds(friendsIds)
      }
    },[count])

    useEffect(() => {
      typeusers.map((key) => 
          // console.log(key[0], key[1], type)
          {if (key[0] === type) {
              setTypeuser(key[1])
          }}
      );
    })

    const show = (e) => {
      setGridId(e);
  };

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
            {/* <div className="Network-Header">
                <div className="Network-HeaderLeft">
                <h2 className="Network-HeaderTitle"><span>{count}</span> Friends</h2>
                </div>
                
            </div> */}
            
            <div className="Network-Filter Filter-Row">
                <form className="Filter-Form" action="#" method="post">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="display-flex">
                            {/* <div className="input-row lh40">
                              <span style={{fontSize: "12px"}}>Sort by: </span> 
                              <button onClick={e => setShowOrder(true)}  className="btn-custom-order btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                  {ordersList[orderValue]}
                              </button>
                              {showOrder && 
                                <div className="dropdown-menu dropdown-menu-right show" ref={ref} x-placement="bottom-end" style={{position: "absolute"}}>
                                    {Object.keys(ordersList).map((name, index) => (
                                       <div className="dropdown-item" key={index} onClick={e => setOrderValue(name)}>{ordersList[name]}</div>
                                    ))}                 
                               </div>
                              } 
                            </div> */}
                            <div className="input-row input-select input-small">
                                <DropType datas={typeusers} value={type} field='type' onChange={setFilterInput}/>
                            </div>
                            <div className="input-row">
                              <input type="text" name="search" defaultValue={search} placeholder="Rechercher un Contact" onChange={setFilterInput} required/>
                            </div>
                            {/* <div className="input-row">
                            <button type="button" onClick={orderfun} className="OrderAlph">Sort by {orderName}</button>
                            </div> */}
                        </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="Networks">
            { friends &&
                friends?.map((friend, index) => (
                gridId !== friend.id  && 
                  <div className="FriendBox-Item" key={index}>
                    <div className="FriendBox" style={{height: '186.7px'}}>
                      {params.id === user?.profile?.id ?
                        <button type="button" onClick={() => {removeFriend(friend.id); show(friend.id)}} className="FriendBox-Delete"><i className="uil uil-trash-alt"></i></button>
                        : params.id !== user?.profile?.id && !friendsIds.includes(friend.id) && user?.profile?.id !== friend.profile.id ?
                        <button type="button" onClick={() => {addFriend(friend.id); show(friend.id)}} className="FriendBox-Accept"><i className="uil uil-user-plus"></i></button>
                        : <button type="button" onClick={() => {removeFriend(friend.id); show(friend.id)}} className="FriendBox-Delete"><i className="uil uil-trash-alt"></i></button>
                      
                      }
                      <Link to={`/profile/${friend.profile.id}`}>
                        <div className="FriendThumb"><img src={friend.profile.avatar_link} alt="avatar"/></div>
                        <div className="FriendInfos">
                          <h3> {friend.profile.username}</h3>
                          <span>{friend.profile.job}</span>
                          {friend.common_friends_count && <span> {friend.common_friends_count} in commons</span>}
                          <span>{ typeusers.map((key) => 
                                {if (key[0] === friend.type) {
                                    return key[1]
                                }}
                            )}
                            - {
                             sectors.map((key) => 
                               {if ( friend.sector.includes(key[0])) {
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