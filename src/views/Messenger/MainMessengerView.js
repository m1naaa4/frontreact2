import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { useParams } from 'react-router';
import SearchBar from './SearchBar';
import SideListBar from './SideListBar';
import MessengerContent from './MessengerContent';




export default function MainMessengerView(props) { 
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        // dispatch( ProfileAction(params.id));    
    });


    return (
        <div className="Page-Profile">  
            <div className="Messenger-Wrapper">
                <div className="container-fluid">
                    <div className="row MessengerDesktop">
                        <div className="col-md-4 col-lg-3">
                            <div className="row">
                                <div className="Messenger-List">
                                    <SearchBar/>
                                    <SideListBar/>
                                    

                        {/* <SideLeftProfileView />
                        <PostView  {...props}/>
                        <SideRightProfileView/> */}
                                </div>
                            </div>
                        </div>
                        <MessengerContent/>
                    </div>
                </div>
            </div>
        </div>          
        
    )
}
