import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { AddCommentAction } from '../../../../store/actions/Comment/CommentAction';
// import {PusherAction} from "../../../../store/actions/Generale/PusherAction";


export default function AddComment({post}) {

    const dispatch = useDispatch();
    const [body, setBody] = useState();
    const refcomment = useRef(null);
    // const params = useParams();

    const comment = useSelector(state => state.getComments);

    const [avatar, setAvatar] = useState();
    // const [user_profile_id, setUserProfileId] = useState();
    const [user_id, setUserId] = useState();
    const [user_visiter_avatar, setUserVisiterAvatar] = useState();
    const infoprofile = useSelector(state => state.infoProfile);
    const user = useSelector(state => state?.userProfile?.userProfile);

    useEffect(() => {
        setUserVisiterAvatar(user?.profile?.avatar_link);
        if (infoprofile.infoprofile.avatar) {             
            setAvatar(infoprofile.infoprofile.avatar);
            // setUserProfileId(infoprofile.infoprofile.id);           
            setUserId(infoprofile.infoprofile.user_id);  
        }     
    },[infoprofile.infoprofile.avatar, infoprofile.infoprofile.id, infoprofile.infoprofile.user_id])    
    
    const data = {
        provider_id : post.id,
        action      : "add",
        provider    : "post",
        user_to     : user_id,
        body        : body,
    }

    const handleSubmitValue = (e) => {
        e.preventDefault();
        refcomment.current.value = '';
        dispatch(AddCommentAction(data, '', 'comment/add')); 
    }

    useEffect(()=>{
        if (user?.id === infoprofile.infoprofile.user_id) {
            setUserVisiterAvatar(user?.profile?.avatar_link)
        }
    },[user])


    return (
            <>
            <form className="Comment-Writing" onSubmit={ handleSubmitValue}>
                <div className="Comment-Col-2">
                    <Link className="Comment-User-Thumb" to={"/profile/"+ comment.profile_id} >
                        {/* <img src={user_visiter_avatar} alt="avatar" /> */}
                        {user_visiter_avatar ? 
                                <img src={user_visiter_avatar} alt="avatar" />    
                            : <img src="/assets/images/avatar.png" alt="avatar" />}
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