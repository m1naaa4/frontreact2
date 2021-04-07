import React, { useEffect, useRef, useState }  from 'react'
import {useDispatch, useSelector} from "react-redux";
import { GetMessagesListAction } from '../../store/actions/Messenger/MessageAction';


export default function SideListBar({filterInput, setFilterInput, props}) {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [listusers, setListusers] = useState();
    const observer = useRef();
    const users = useSelector(state => state.conversations);
    

    useEffect(() => {          
        if (users.conversations !== undefined && users.conversations !== 'loading') {  
            
            setListusers(users.conversations);console.log('listtttttttttttttttttttttttttsssssss', listusers)
        }       
    })
    // console.log('listtttttttttttttttttttttttttsssssss', listusers)
    useEffect(() => {
        if(!isLoading){
            dispatch(GetMessagesListAction('messages/getMessages', '', 1));
        }
    }, []);


    return (
        <div className="Msgs-List nav nav-pills" style={{backgroundColor:'#f2fff8'}} id="v-pills-tab" role="tablist" aria-orientation="vertical">
        {/* { listusers.map((user, index) => (
            <a className="Msgs-Item New-Msg nav-link active" id="v-abdelkarim-ichia-tab" data-toggle="pill" href="#v-abdelkarim-ichia" role="tab" aria-controls="v-abdelkarim-ichia" aria-selected="true">
                <div className="Msgs-Image"><img src="/assets/images/abbass-iya.jpg" alt="avatar"/></div>
                <div className="Msgs-Content">
                    <div className="Msgs-User">Abdelkarim ICHIA</div>
                    <div className="Msgs-Text">Message text goes here...</div>
                <div className="Friend-Active"></div>
                <span className="Msgs-N">10</span>
                </div>
            </a>)
        )
            } */}

        </div>
    )
}