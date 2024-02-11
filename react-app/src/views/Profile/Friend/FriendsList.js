import React, { useEffect, useRef, useState } from "react";
import FriendGrid from "./Grid/FriendGrid";
import { Tab, Tabs } from "react-bootstrap";
import {  MyFriendsAction } from "../../../store/actions/Friend/FriendsAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import InvitationGrid from "./Grid/InvitationGrid";
import SuggestionGrid from "./Grid/SuggestionGrid";
import { useForm } from "react-hooks-helper";


export default function FriendsList({props}){

    const firstUpdate = useRef(true);
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const [key, setKey] = useState();
    const myfriends = useSelector(state => state.userProfile.myfriends);
    const invitations = useSelector(state => state.userProfile.invitations);
    const suggestions = useSelector(state => state.userProfile.suggestions);
    const user = useSelector(state => state.userProfile.userProfile);
    const count_freinds = myfriends?.length ? myfriends?.length : 0;
    const count_invitations = invitations?.length ? invitations?.length : 0;

    const defaultData = {search  : '', type    : null, orderName : 'Desc'};
    const [filterInput, setFilterInput] = useForm(defaultData);

    const data = { filterInput, setFilterInput, props };
    console.log(filterInput);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        let data = {
            'url'   : 'friend/getmyfriends',
            'user_profile_id' : params.id,
            'search'  : filterInput.search,
            'type'  : filterInput.type,
            'sort' : filterInput.orderName,
        }
        dispatch(MyFriendsAction(data));
    },[filterInput]);

    useEffect(() => {
        if (history.location.pathname === '/profile/'+user?.profile?.id+'/friends') {
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
                <div className="col-md-9">
                    <div className="Center-Side friends-section">

                        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => tabs(k)} className="mb-3">
                            <Tab eventKey="friends" title={'Friends ('+count_freinds+')'}>
                                <FriendGrid friends={myfriends} {...data}/>
                            </Tab>
                            {params.id === user?.profile?.id &&
                            <Tab eventKey="invitations" title={'Invitations ('+count_invitations+')'} >
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