import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ProjectSkeleton from '../../../skeleton/ProjectSkeleton';
import { AddCommentAction } from '../../../store/actions/User/Comment/AddCommentAction';
import {GetCommentAction} from "../../../store/actions/User/Comment/GetCommentAction";
import ReplyComment from './ReplyComment';


export default function ShowComment(comment, props) {

    
    const dispatch = useDispatch();
    const comments = useSelector(state => state.getComments);
    const project = useSelector(state => state.getproject);
    const [replies, SetReplies] = useState(false);
    const [replyBox, SetReplyBox] = useState(false);
    const [body, setBody] = useState();

    const userProfile = useSelector(state => state.userProfile.userProfile.user);

   
    //console.log("getcomments", comment.comment.replies.data)

    const dataget = {
        action           : 'get',
        provider         : 'project',
        provider_id      : project.getproject.projectid,
    }

    const showReplies = e =>  {
        SetReplies(!replies)
        //SetReplyBox(!replyBox)
        
    }

    const showReplyBox = e => {
        SetReplyBox(!replyBox)
    }

    const data = {
        provider_id     : project.getproject.projectid,
        action          : 'reply',
        provider        : 'project',
        body            : body,
        commentable_id  : comment.comment.id,
    }
        
    const submitReply = (e) => {
        e.preventDefault();
        dispatch(AddCommentAction(data, props, 'reply'));

        dispatch( GetCommentAction(dataget));
    }

    return (
        
                <>                                            
                    <div className="Comment-Col-2">
                        <div className="Comment-User-Thumb">
                            <img src={comment.comment.avatar} alt=""/>
                        </div>
                        <ul className="comment-reactions-list">
                            <li className="comment-reaction"><img
                                src="assets/images/icons/dadupa-like.svg" alt=""/></li>
                            <label className="count-reactions">120</label>
                        </ul>
                    </div>
                    <div className="Comment-Col-10">
                        <div className="Comment-User">
                            <div className="Comment-Content">
                                <div className="Comment-User-Name">
                                    <a className="Comment-User-Profile" href="#">{comment.comment.user_name}</a>
                                    <span className="Comment-Date">{comment.comment.created_at} </span>
                                </div>
                                <div className="Comment-Text">
                                        <span>
                                        {comment.comment.body}
                                            
                                        </span>
                                </div>
                            </div>
                        </div>
                        <div className="comment-actions">
                            
                            <div className="comment-actions multi-options">
                            { comment.comment.replies.data.length > 0 && ( 
                                     <div className="comment-replies-count" onClick={showReplies}>
                                         <button className="comment-replies-button" type="button" name="button">
                                        <i className="uil uil-comment-notes"></i> 
                                        <span>{comment.comment.replies.data.length}</span>
                                        <span> Replies</span>
                                        </button>
                                    </div>
                                )}
                                    
                            </div>

                            <ul className="comment-actions-list">
                                <li className="comment-action">
                                    <button className="like-action">Like</button>
                                </li>
                                <li className="comment-action replay-action" onClick={showReplyBox}>Reply</li>
                            </ul>
                        </div>
                    </div>

                    {replies && <div className="Comment-Replies Toggle-Replies" style={{width: "100%"}}>
                        { comment.comment.replies.data &&  comment.comment.replies.data.map((com, index) =>
                            <div className="Comment-Reply" key={com.id}>
                                <div className="User-Comment">
                                    <div className="Comment-Col-2">
                                        <div className="Comment-User-Thumb">
                                        <img src={com.avatar} />
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
                                            <li className="comment-action"><button className="like-action">Like</button></li>
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
                                    <img src={userProfile.avatar} alt={userProfile.name}/>
                                </div>
                            </div>
                            <div className="Comment-Col-10">
                                <div className="Comment-Area">
                                    <div className="Comment-Input">
                                        <input type="text" name="body"
                                            onChange={e => setBody(e.target.value)}
                                            placeholder="Write your comment"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                 </div></form>
                 }
                </>
                                    

    )
}