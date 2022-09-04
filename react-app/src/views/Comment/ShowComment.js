import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { useHistory} from 'react-router-dom';
// import PusherService from '../../services/Pusher';
import { AddCommentAction } from '../../store/actions/Comment/CommentAction';
import {GetCommentAction} from "../../store/actions/Comment/CommentAction";
import parse from 'html-react-parser';
import { LikeAction } from '../../store/actions/Like/LikeAction';
import { useTranslation } from 'react-i18next';

export default function ShowComment(comment, props) {

    const [t, i18n] = useTranslation();
    const dispatch = useDispatch();
    const project = useSelector(state => state.getproject);
    const [replies, SetReplies] = useState(false);
    const [replyBox, SetReplyBox] = useState(false);
    const [body, setBody] = useState();
    const [to, setTo] = useState();
    const refcomment = useRef(null);
    const history  = useHistory();
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [initial, setInitial] = useState(true);

    const userProfile = useSelector(state => state.userProfile.userProfile); 
    //console.log("getcomments", comment.comment.replies.data)

    const dataget = {
        action           : 'get',
        provider         : 'project',
        provider_id      : project.getproject.projectid,
    }

    const showReplies = e =>  {
        SetReplies(!replies)
        SetReplyBox(!replyBox)
        
    }


    const gotToProfile = () => {
        history.push('/profile/'+ comment.comment.profile_id);
      };

      useEffect(() => {
        if (initial) {
            setLike(comment.comment?.is_liked);
            setLikeCount(comment.comment.likeCount);
            // console.log(like)
            // setCountcomment(fullproject?.countcomment);
        }

        // if(counter.notification){
        //     console.log(counter?.notification)
        //     setLikeCount(counter?.notification)
        // }
        
        // if(counter?.countercomment){
        //     console.log(counter?.notification)
        //     setCountcomment(counter?.countercomment)
        // }


    })

    const data = {
        provider_id     : project.getproject.projectid,
        action          : 'reply',
        provider        : 'project',
        body            : body,
        to              : to,
        idprofile       : comment.comment.profile_id,
        commentable_id  : comment.comment.id,
    }
   
        
    const submitReply = (e) => {
        e.preventDefault();
        refcomment.current.value = '';
        dispatch(AddCommentAction(data, props, 'comment/reply'));

        // setTimeout(() => {
        //     //SetReplies(replies)
        //     SetReplyBox(!replyBox)
        //     dispatch( GetCommentAction(dataget));
        //   }, 2000)
    }

    const likeAAction = () => {
        setLike(!like);
        setInitial(false)
        const dataa = {
            action: "like",
            provider_id: comment.comment.id,
            provider: "comment",
            type    : like?'dislike':'like',
        }
        // like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
        
        console.log(like)
        dispatch(LikeAction(dataa, 'like/like', props));        
    }

    const showReplyBox =  async (value, e) => {
        SetReplyBox(!replyBox);
        setTo('@'+value +' ');
        
    }
    return (
        
                <>                                            
                    <div className="Comment-Col-2">
                        <div className="Comment-User-Thumb">
                            {comment.comment.avatar ? 
                                <img onClick={gotToProfile} src={comment.comment.avatar} alt="avatar" />    
                            : <img onClick={gotToProfile} src="/assets/images/avatar.png" alt="avatar" />}
                        </div>
                        <ul className="comment-reactions-list">
                            <li className="comment-reaction"><img
                                src="assets/images/icons/dadupa-like.svg" alt=""/></li>
                            {/* <label className="count-reactions">{likeCount}</label> */}
                        </ul>
                    </div>
                    <div className="Comment-Col-10">
                        <div className="Comment-User">
                            <div className="Comment-Content">
                                <div className="Comment-User-Name">
                                    <a className="Comment-User-Profile" onClick={gotToProfile} href="#">{comment.comment.user_name}</a>
                                    <span className="Comment-Date">{comment.comment.created_at_human} </span>
                                </div>
                                <div className="Comment-Text">
                                        {/* <span dangerouslySetInnerHTML={{__html: comment.comment.body}}/> */}
                                        <span>
                                            {parse(comment.comment.body)}
                                        </span>
                                        
                                       
                                </div>
                            </div>
                        </div>
                        <div className="comment-actions">
                            
                            <div className="comment-actions multi-options">
                            {/* { comment.comment.replies.data.length > 0 && ( 
                                     <div className="comment-replies-count" onClick={showReplies}>
                                         <button className="comment-replies-button" type="button" name="button">
                                        <i className="uil uil-comment-notes"></i> 
                                        <span>{comment.comment.replies.data.length}</span>
                                        <span> Replies</span>
                                        </button>
                                    </div>
                                )} */}
                                    
                            </div>

                            <ul className="comment-actions-list">
                                <li className="comment-action">
                                    <button className={like ? 'like-action post-liked' : 'like-action'} 
                                            onClick={likeAAction} toggle="#password-field" type="button" name="button">
                                                {like?"Dislikee":"Like"}
                                            </button>
                                </li>
                                <li className="comment-action replay-action" onClick={(e) => showReplyBox(comment.comment.user_name, e.keyCode)}>Reply</li>
                            </ul>
                        </div>
                    </div>

                    {replies && <div className="Comment-Replies Toggle-Replies" style={{width: "100%"}}>
                        { comment.comment.replies.data &&  comment.comment.replies.data.map((com, index) =>
                            <div className="Comment-Reply" key={com.id}>
                                <div className="User-Comment">
                                    <div className="Comment-Col-2">
                                        <div className="Comment-User-Thumb">
                                        <img src={com.avatar} alt="avatar" />
                                        </div>
                                    </div>
                                    <div className="Comment-Col-10">
                                        <div className="Comment-User">
                                        <div className="Comment-Content">
                                            <div className="Comment-User-Name">
                                            <a className="Comment-User-Profile" href="#">{com.user_name}</a>
                                            <span className="Comment-Date">{com.created_at_human}</span>
                                            </div>
                                            <div className="Comment-Text">
                                                <span>{com.body}</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="comment-actions">
                                        <ul className="comment-actions-list">
                                            {/* <li className="comment-action"><button className="like-action">Like</button></li> */}
                                            {/* <li className="comment-action replay-action">Reply</li> */}
                                        </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )}
                </div>}

                {replyBox && <form style={{width: "100%"}} onSubmit={submitReply}>
                    <div className="Comment-Reply Writing-Box">
                            <div className="Comment-Writing">
                            <div className="Comment-Col-2">
                                <div className="Comment-User-Thumb">
                                    <img src={userProfile?.profile?.avatar_link} alt={userProfile.name}/>
                                </div>
                            </div>
                            <div className="Comment-Col-10">
                                <div className="Comment-Area">
                                    <div className="Comment-Input">
                                        <span onClick={gotToProfile} style={{color: 'blue', textDecoration: 'underline'}}>{to}</span>
                                        <input type="text" name="body" defaultValue={body}
                                            onChange={e => setBody(e.target.value)} ref={refcomment}
                                            placeholder={t('write_comment')}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                 </div></form>
                 }
                </>
                                    

    )
}