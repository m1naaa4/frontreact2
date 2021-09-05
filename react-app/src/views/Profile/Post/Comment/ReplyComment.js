import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
// import PusherService from '../../../../services/Pusher';
import { AddCommentAction } from '../../../../store/actions/Comment/CommentAction';


export default function ReplyComment({comment, post}) {

    const [body, setBody] = useState();
    const refcomment = useRef(null)

    const project = useSelector(state => state.getproject);

    const [avatar, setAvatar] = useState();
    const [profile_id, setProfileId] = useState();
    const [user_visiter_avatar, setUserVisiterAvatar] = useState();
    const infoprofile = useSelector(state => state.infoProfile);
    const user = useSelector(state => state.userProfile.userProfile);

    useEffect(() => {    
        setUserVisiterAvatar(user?.profile?.avatar_link);       
        if (infoprofile.infoprofile.avatar) {             
            setAvatar(infoprofile.infoprofile.avatar)            
            setProfileId(infoprofile.infoprofile.id)           
        }     
    })    
    
    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(GetCommentAction(dataget));
        // const pusher = new PusherService();    
        // var channel = pusher.config.subscribe('project_comment_' + project.getproject.projectid);        
        // channel.bind('NewComment', function(res) {    
        //     let j = res.id;
        //     let feed = res[j]
        
        //     dispatch({type:'ADD_TO_COLLECTION_COMMENT_POST_SUCCESS', feed});        
        // });
    
    }, [dispatch])
console.log(body)
    const data = {
        provider_id     : post.id,
        action          : 'reply',
        provider        : 'post',
        body            : body,
        commentable_id  : comment.id,
    }
        
    const submitReply = (e) => {
        e.preventDefault();
        refcomment.current.value = '';
        dispatch(AddCommentAction(data, '', 'reply'));
    }

    return (
        <form style={{width: "100%"}} onSubmit={submitReply}>
            <div className="Comment-Reply Writing-Box">
            <div className="Comment-Writing">
                <div className="Comment-Col-2">
                <Link to={"/profile/"+ profile_id} className="Comment-User-Thumb">
                    
                    {user_visiter_avatar ? 
                        <img src={user_visiter_avatar} alt="avatar"/>    
                    : <img src="/assets/images/avatar.png" alt="avatar" />}
                </Link>
                </div>
                <div className="Comment-Col-10">
                    <div className="Comment-Area">
                        <div className="Comment-Input">
                        <input type="text" name="body" 
                        onChange={e => setBody(e.target.value)} ref={refcomment}
                            placeholder="Write your comment"/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </form>               
    )
}