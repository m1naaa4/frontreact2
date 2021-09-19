import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { AcceptFriendAction, FriendsAction, RejectFriendAction } from '../../../../store/actions/Friend/FriendsAction';
import { useDispatch, useSelector } from 'react-redux';
import DropType from '../../../../utils/DropType';
import typeusers from "../../../../data/typeusers"

export default function InvitationGrid({invitations, filterInput, setFilterInput }) {
    const dispatch = useDispatch();
    const params = useParams();
    const [show, setShow] = useState(true);

    const { search, type, orderName } = filterInput;
    const [order, setOrder] =   useState(true);

    const count = useSelector(state => state.userProfile.countinvitations);

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

    const acceptFriend = (id) =>{
      let data ={
          'request_id' : id,
          'url' : 'friend/friendAccept',
      }
      dispatch(AcceptFriendAction(data)); 
    }
    const rejectFriend = (id) =>{
        let data ={
            'request_id' : id,
            'url' : 'friend/friendReject',
        }
        dispatch(RejectFriendAction(data)); 
    }

    return (
        <>
            <div className="Network-Header">
                <div className="Network-HeaderLeft">
                <h2 className="Network-HeaderTitle"><span>{count}</span> Invitations</h2>
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
            { invitations &&
                invitations?.map((invitation, index) => (
                <>
                {show &&
                <div className="FriendBox-Item" key={index}>
                    <div className="FriendBox">

                        <div className="Add-Contact Invitation-Options">
                          <button type="button" onClick={() => {acceptFriend(invitation.id)}} className="FriendBox-Accept"><i className="uil uil-check"></i></button> 
                          <button type="button" onClick={() => {rejectFriend(invitation.id)}} className="FriendBox-Delete"><i className="uil uil-times"></i></button> 
                        </div>
                      <Link to={`/profile/${invitation.profile.id}`}>
                        <div className="FriendThumb"><img src={invitation.profile.avatar_link} alt="avatar"/></div>
                        <div className="FriendInfos">
                          <h3> {invitation.profile.username}</h3>
                          <span>{invitation.profile.job}</span>
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