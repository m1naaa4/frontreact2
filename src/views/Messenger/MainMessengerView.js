import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import SearchBar from './SearchBar';
import SideListBar from './SideListBar';
import MessengerContent from './MessengerContent';




export default function MainMessengerView(props) { 
    const dispatch = useDispatch();
    const params = useParams();
    const [show, setShow] = useState(true);

    const conversation = useSelector(state => state.messages);
    const showContent = () =>{
        setShow(conversation)
    }
    //const showContent = () => setShow(true);


    return (
        <div className="Page-Profile">  
            <div className="Messenger-Wrapper">
                <div className="container-fluid">
                    <div className="row MessengerDesktop">
                        <div className="col-md-4 col-lg-3">
                            <div className="row">
                                <div className="Messenger-List">
                                    <SearchBar/>
                                    <div onClick={showContent}>
                                        <SideListBar/>
                                    </div >
                                            {/* <SideLeftProfileView />
                                            <PostView  {...props}/>
                                            <SideRightProfileView/> */}
                                </div>
                            </div>
                        </div>
                        {show &&
                            <MessengerContent/>
                        }
                        
                    </div>
                </div>
            </div>
        </div>          
        
    )
}
