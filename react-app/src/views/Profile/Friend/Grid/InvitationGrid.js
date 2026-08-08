import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { AcceptFriendAction, FriendsAction, RejectFriendAction } from '../../../../store/actions/Friend/FriendsAction';
import { useDispatch, useSelector } from 'react-redux';
import DropType from '../../../../utils/DropType';
import typeusers from "../../../../data/typeusersCreate"
import sectors from '../../../../data/sectors';
import { useTranslation } from 'react-i18next';

export default function InvitationGrid({invitations, filterInput, setFilterInput }) {
    const dispatch = useDispatch();
    const params = useParams();
    const [gridId, setGridId] = useState();

    const { search, type, orderName } = filterInput;
    const [order, setOrder] =   useState(true);
    const [t] = useTranslation();


    const show = (e) => {
      setGridId(e);
  };

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

    const acceptFriend = async (invitation) => {
      const requestId = invitation.request_id || invitation.id;
      const friendId = invitation.user_id || null;
      const res = await dispatch(AcceptFriendAction({
          request_id: requestId,
          friend_id: friendId,
          url: 'friend/friendAccept',
      }));
      if (res?.success !== false) {
        show(requestId);
      }
    };
    const rejectFriend = async (invitation) => {
        const requestId = invitation.request_id || invitation.id;
        const friendId = invitation.user_id || null;
        const res = await dispatch(RejectFriendAction({
            request_id: requestId,
            friend_id: friendId,
            url: 'friend/friendReject',
        }));
        if (res?.success !== false) {
          show(requestId);
        }
    };

    return (
        <>
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
                invitations?.map((invitation, index) => {
                const invitationKey = invitation.request_id || invitation.id;
                return (
                <React.Fragment key={invitationKey || index}>
                {gridId !== invitationKey &&
                <div className="FriendBox-Item">
                    <div className="FriendBox">

                        <div className="Add-Contact Invitation-Options">
                          <button type="button" onClick={() => acceptFriend(invitation)} className="FriendBox-Accept"><i className="uil uil-check"></i></button> 
                          <button type="button" onClick={() => rejectFriend(invitation)} className="FriendBox-Delete"><i className="uil uil-times"></i></button> 
                        </div>
                      <Link to={`/profile/${invitation.profile.id}`}>
                        <div className="FriendThumb"><img src={invitation.profile.avatar_link} alt="avatar"/></div>
                        <div className="FriendInfos">
                          <h3> {invitation.profile.username}</h3>
                          <span>{invitation.profile.job}</span>
                          <span>
                            { typeusers.map((key) => 
                                {if (key[0] === invitation.type) {
                                    return key[1]
                                }}
                            )} 
                            - {
                             sectors.map((key) => 
                             // console.log(key[0], project?.project?.sector)
                               {if ( invitation.sector.includes(key[0])) {
                                 return t(`${key[1]}`)
                               }}
                             )
                           }
                            </span>
                        </div>
                      </Link>
                    </div>
                </div>
                }
                </React.Fragment>
              )})
            }
            </div>        
        </>
    )
}
