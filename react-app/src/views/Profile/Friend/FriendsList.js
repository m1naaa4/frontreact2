import React, { useEffect, useState } from "react";
import FriendGrid from "./Grid/FriendGrid";
import { Tab, Tabs } from "react-bootstrap";
import { FriendsAction, MyFriendsAction } from "../../../store/actions/Friend/FriendsAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useForm } from "react-hooks-helper";
import Invitations from "./Invitations";
import InvitationGrid from "./Grid/InvitationGrid";
import SuggestionGrid from "./Grid/SuggestionGrid";


export default function({filterInput, setFilterInput, props}){

    const dispatch = useDispatch();
    const params = useParams();
    const [key, setKey] = useState('friends');
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


    return(
        <>
                <div className="col-md-6">
                    <div className="Center-Side">

                        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                            <Tab eventKey="friends" title="Friends">
                                <FriendGrid friends={friends} {...data}/>
                            </Tab>
                            {params.id === user?.profile?.id &&
                            <Tab eventKey="profile" title="Invitations">
                                <InvitationGrid invitations={invitations} {...data}/>
                            </Tab>}
                            {params.id === user?.profile?.id &&
                            <Tab eventKey="contact" title="Suggestions">
                                <SuggestionGrid suggestions={suggestions} {...data}/>
                            </Tab>}

                        </Tabs>
                    </div>
                </div>
        </>
    )
}