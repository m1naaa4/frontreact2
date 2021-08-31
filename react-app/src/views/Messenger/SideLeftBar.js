import React, { useEffect, useRef, useState }  from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { GetMessagesListAction } from '../../store/actions/Messenger/MessageAction';
import { GetConversationAction } from '../../store/actions/Messenger/MessageAction';
import _map from 'lodash/map'
import { wait } from '@testing-library/dom';


export default function SideLeftBar() {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    
    const observer = useRef();
    const users = useSelector(state => state.conversations);
    const [listusers, setListusers] = useState();

    const params = useParams();
    

    useEffect(() => {          
        setListusers(users?.conversations);
    },[users])
    
    useEffect(() => {
        if(!isLoading){
            dispatch(GetMessagesListAction('messages/getConversations', '', 1));
        }
        let data = {
            receiver_id : params.id
        }
        setTimeout(() => {
            dispatch(GetConversationAction(data, 'messages/show', 1));
          }, 500)   
    }, []);

    const showConversation =(id) =>{
        let data = {
            receiver_id : id
        }
        dispatch(GetConversationAction(data, 'messages/show', 1));
      }
    //   if(listusers){
    //     console.log('listusersss', listusers)
    //     listusers.map(function(element){
    //         console.log(element);
    //     });
    //   }
    
    return (
        <div className="Msgs-List nav nav-pillss" style={{backgroundColor:'#f2fff8'}} id="v-pills-tab" role="tablist" aria-orientation="vertical">
        {listusers && 
            _map(listusers, (user, index) => (
                <Link to={`/messages/${index}`} key={index} className="Msgs-Item New-Msg nav-link" onClick={e=> showConversation(index)}  id="v-abdelkarim-ichia-tab" data-toggle="pill" href={null} role="tab" aria-controls="v-abdelkarim-ichia" aria-selected="true">
                    <div className="Msgs-Image"><img src={user.avatar} alt="avatar"/></div>
                    <div className="Msgs-Content">
                        <div className="Msgs-User">{user.name}</div>
                        <div className="Msgs-Text">{user?.messages?.[0]?.content}</div>
                    <div className="Friend-Active"></div>
                    <span className="Msgs-N">{user.unread}</span>
                    </div>
                </Link>
                )
            )
        }

        </div>
    )
}