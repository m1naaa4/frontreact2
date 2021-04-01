import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import PusherService from '../../../../services/Pusher';
import {AddCommentAction} from "../../../../store/actions/User/Comment/AddCommentAction";
import {GetCommentAction} from "../../../../store/actions/User/Comment/GetCommentAction";


export default function AddComment({post}) {

    const [body, setBody] = useState();
    const refcomment = useRef(null)

    const comment = useSelector(state => state.addComment);
    const project = useSelector(state => state.getproject);
    const userProfile = useSelector(state => state.userProfile.userProfile.user);
    const comments = useSelector(state => state.getComments);

    const [avatar, setAvatar] = useState();
    const [user_profile_id, setUserProfileId] = useState();
    const infoprofile = useSelector(state => state.infoProfile);

    useEffect(() => {          
        if (infoprofile.infoprofile.avatar) {             
            setAvatar(infoprofile.infoprofile.avatar)            
            setUserProfileId(infoprofile.infoprofile.profile_id)            
        }     
    })    
    
    const data = {
        provider_id : post.id,
        action      : "add",
        provider    : "post",
        body        : body,
    }

    const dataget = {
        action           : 'get',
        provider         : 'post',
        provider_id      : post.id,
    }

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();
        refcomment.current.value = ''
        dispatch(AddCommentAction(data, '', 'add'));       
    }

    useEffect(() => {
        //dispatch(GetCommentAction(dataget));
        const pusher = new PusherService();    
        var channel = pusher.config.subscribe('project_comment_' + user_profile_id);        
        channel.bind('NewComment', function(res) {    
            let j = res.id;
            let feed = res[j]
        
            dispatch({type:'ADD_TO_COLLECTION_COMMENT_POST_SUCCESS', feed});        
        });
    
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(GetCommentAction(data));
    // }, [dispatch])

    return (
            <>
            <form className="Comment-Writing" onSubmit={ handleSubmitValue}>
                <div className="Comment-Col-2">
                    <Link className="Comment-User-Thumb" to={"/profile/"+ comment.profile_id} >
                        <img src={avatar} alt="avatar" />
                    </Link>
                </div>
                <div className="Comment-Col-10">
                    <div className="Comment-Area">
                        <div className="Comment-Input">
                        <input type="text" name="body" onChange={e => setBody(e.target.value)} ref={refcomment} placeholder="Write your comment"/>
                        </div>
                    </div>
                </div>
          </form>

    </>
    )
}