import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FriendsAction, MyFriendsAction } from "../../../store/actions/Friend/FriendsAction";
import FriendGrid from "./FriendGrid";
import { useParams } from 'react-router'


export default function({props}){

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        let data = {
        'url' : 'friend/getFriends',
        'user_profile_id' : params.id
        }
        dispatch(FriendsAction(data));
    },[]);

    const friends = useSelector(state => state.userProfile.friends);
    const count = useSelector(state => state.userProfile.count);

    useEffect(()=>{
        let data = {
          'url' : 'friend/getmyfriends',
          }
        dispatch(MyFriendsAction(data));
      },[])

    return(
        <>
                <div className="col-md-6">
                    <div className="Center-Side">
                        <div className="Network-Header">
                            <div className="Network-HeaderLeft">
                            <h2 className="Network-HeaderTitle"><span>{count}</span> Contacts</h2>
                            </div>
                            <div className="Network-HeaderRight">
                            <a className="Network-HeaderLink" href="#">Voir les invitations</a>
                            <a className="Network-HeaderLink" href="#">Voir les suggestions</a>
                            </div>
                        </div>
                        
                        <div className="Network-Filter Filter-Row">
                            <form className="Filter-Form" action="#" method="post">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="display-flex">
                        <div className="input-row input-select input-small">
                        <select className="project-state" name="user-type" required >
                            <option selected disabled>Type</option>
                            <option value="Un porteur de projet">Porteur</option>
                            <option value="Un bailleur de fonds">Investisseur</option>
                            <option value="Un accompagnateur">Mentor</option>
                        </select>
                        </div>
                        <div className="input-row">
                        <input type="text" name="jj" value="" placeholder="Rechercher un Contact" required/>
                        </div>
                        <div className="input-row">
                        <button type="button" className="OrderAlph">Ordre Alphabétique</button>
                        </div>
                    </div>
                    </div>
                </div>
                </form>
                        </div>
            
                        <div className="Networks">

                            { friends &&
                                friends?.map((friend, index) => (
                                <FriendGrid friend={friend} key={index}/>
                                ))
                            }
                        
                        </div>
                    </div>
                </div>
        </>
    )
}