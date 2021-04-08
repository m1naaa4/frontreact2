import React, { useEffect, useRef, useState }  from 'react'
import {useDispatch, useSelector} from "react-redux";
import { GetMessagesListAction } from '../../store/actions/Messenger/MessageAction';
import { GetConversationAction } from '../../store/actions/Messenger/MessageAction';


export default function SideListBar({filterInput, setFilterInput, props}) {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    
    const observer = useRef();
    const users = useSelector(state => state.conversations);
    const [listusers, setListusers] = useState();
    

    useEffect(() => {          
        if (users.conversations !== undefined && users.conversations !== 'loading') {  
            setListusers(users.conversations);
            let data = {
                receiver_id : users.conversations[0].id
            }
            dispatch(GetConversationAction(data, 'messages/show', 1));         
        }
    },[users])
    
    useEffect(() => {
        if(!isLoading){
            dispatch(GetMessagesListAction('conversations/getConversations', '', 1));
        }
    }, []);

    const showConversation =(id) =>{
        let data = {
            receiver_id : id
        }
        dispatch(GetConversationAction(data, 'messages/show', 1));
      }

    return (
        <div className="Msgs-List nav nav-pillss" style={{backgroundColor:'#f2fff8'}} id="v-pills-tab" role="tablist" aria-orientation="vertical">
        {listusers &&
            listusers.map((user, index) => (
                <a key={index} className="Msgs-Item New-Msg nav-link" onClick={e=> showConversation(user.id)}  id="v-abdelkarim-ichia-tab" data-toggle="pill" href={null} role="tab" aria-controls="v-abdelkarim-ichia" aria-selected="true">
                    <div className="Msgs-Image"><img src={user.avatar} alt="avatar"/></div>
                    <div className="Msgs-Content">
                        <div className="Msgs-User">{user.name}</div>
                        <div className="Msgs-Text">{user.content}</div>
                    <div className="Friend-Active"></div>
                    <span className="Msgs-N">{user.unread}</span>
                    </div>
                </a>)
            )
        }

        </div>
    )
}