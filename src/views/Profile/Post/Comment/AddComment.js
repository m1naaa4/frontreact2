import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { AddCommentAction } from '../../../../store/actions/Comment/CommentAction';
import {PusherAction} from "../../../../store/actions/Generale/PusherAction";


export default function AddComment({post}) {

    const [body, setBody] = useState();
    const refcomment = useRef(null);
    const params = useParams();

    const comment = useSelector(state => state.addComment);

    const [avatar, setAvatar] = useState();
    const [user_profile_id, setUserProfileId] = useState();
    const [user_id, setUserId] = useState();
    const [user_visiter_avatar, setUserVisiterAvatar] = useState();
    const infoprofile = useSelector(state => state.infoProfile);
    const user = useSelector(state => state.userProfile.userProfile);

    useEffect(() => {          
        if (infoprofile.infoprofile.avatar) {             
            setAvatar(infoprofile.infoprofile.avatar);           
            setUserProfileId(infoprofile.infoprofile.id);           
            setUserId(infoprofile.infoprofile.user_id);  
            // setUserVisiterAvatar(user.profile.avatar_link);
        }     
    })    
    
    const data = {
        provider_id : post.id,
        action      : "add",
        provider    : "post",
        user_to     : user_id,
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
        refcomment.current.value = '';
        dispatch(AddCommentAction(data, '', 'add')); 
        
    }

    useEffect(() => {
        //dispatch(GetCommentAction(dataget));
        const commentData = {
            channel : 'post_comment_' + post.id,
            event   : 'NewComment',
            type    : 'ADD_TO_COLLECTION_COMMENT_POST_SUCCESS',
        };
        // dispatch(PusherAction(commentData));
    
    }, [dispatch]) 

    useEffect(() => { 
        console.log(user_id)
        const notifData = {
            channel : 'notification_' + user_id,
            event   : 'notifpost',
            type    : 'ADD_TO_COLLECTION_NOTIFICATION_SUCCESS',
        };
        dispatch(PusherAction(notifData));

        const notifDataa = {
            channel : 'notification_' + user_id,
            event   : 'notifpost',
            type    : 'GET_ADDED_NOTIFICATION_SUCCESS',
        };
        dispatch(PusherAction(notifDataa));
        
    }, [dispatch])


    return (
            <>
            <form className="Comment-Writing" onSubmit={ handleSubmitValue}>
                <div className="Comment-Col-2">
                    <Link className="Comment-User-Thumb" to={"/profile/"+ comment.profile_id} >
                        <img src={user_visiter_avatar} alt="avatar" />
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