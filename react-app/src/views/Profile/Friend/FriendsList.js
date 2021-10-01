import React, { useEffect, useState } from "react";
import FriendGrid from "./Grid/FriendGrid";
import { Tab, Tabs } from "react-bootstrap";
import { FriendsAction, MyFriendsAction } from "../../../store/actions/Friend/FriendsAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import InvitationGrid from "./Grid/InvitationGrid";
import SuggestionGrid from "./Grid/SuggestionGrid";


export default function({filterInput, setFilterInput, props}){

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const [key, setKey] = useState();
    const friends = useSelector(state => state.userProfile.friends);
    const invitations = useSelector(state => state.userProfile.invitations);
    const suggestions = useSelector(state => state.userProfile.suggestions);
    const user = useSelector(state => state.userProfile.userProfile);

    const data = { filterInput, setFilterInput, props };
    useEffect(()=>{
        let data = {
          'url' : 'friend/getmyfriends',
          }
        dispatch(MyFriendsAction(data));
      },[])

    useEffect(() => {
        let data = {
            'url'   : 'friend/getFriends',
            'user_profile_id' : params.id,
            'search'  : filterInput.search,
            'type'  : filterInput.type,
            'sort' : filterInput.orderName,
        }
        const timeoutId = setTimeout(() => dispatch(FriendsAction(data)), 1000);
        return () => clearTimeout(timeoutId);
    },[filterInput]);

    useEffect(() => {
        if (history.location.pathname === '/profile/'+user?.profile?.id+'/friends/friends') {
            setKey('friends');
        } else if(history.location.pathname === '/profile/'+user?.profile?.id+'/friends/invitations') {
            setKey('invitations');
        }else if(history.location.pathname === '/profile/'+user?.profile?.id+'/friends/suggestions'){
            setKey('suggestions');
        }
    })

    const tabs = (key) =>{
        history.push('/profile/'+user?.profile?.id+'/friends/'+key)
        setKey(key);
    }

    return(
        <>
                <div className="col-md-6">
                    <div className="Center-Side">

                        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => tabs(k)} className="mb-3">
                            <Tab eventKey="friends" title="Friends">
                                <FriendGrid friends={friends} {...data}/>
                            </Tab>
                            {params.id === user?.profile?.id &&
                            <Tab eventKey="invitations" title="Invitations">
                                <InvitationGrid invitations={invitations} {...data}/>
                            </Tab>}
                            {params.id === user?.profile?.id &&
                            <Tab eventKey="suggestions" title="Suggestions">
                                <SuggestionGrid suggestions={suggestions} {...data}/>
                            </Tab>}

                        </Tabs>
                    </div>
                </div>
        </>
    )
}