import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ProjectSkeleton from '../../../skeleton/ProjectSkeleton';
import {GetCommentAction} from "../../../store/actions/User/Comment/GetCommentAction";
import ReplyComment from './ReplyComment';


export default function ShowComment(comment, index) {

    
    const dispatch = useDispatch();
    const comments = useSelector(state => state.getComments);
    const project = useSelector(state => state.getproject);
    const [replies, SetReplies] = useState(false);
    const [replyBox, SetReplyBox] = useState(false);

   
    console.log("getcomments", comment)

    const showReplies = e =>  {
        SetReplies(true)
        SetReplyBox(true)
        
    }

    const showReplyBox = e => {
        SetReplyBox(true)
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
                                <div className="comment-replies-count" onClick={showReplies}>
                                    <button className="comment-replies-button" type="button" name="button">
                                        <i className="uil uil-comment-notes"></i> 
                                        <span>55</span>
                                        <span> Replies</span>
                                    </button>
                                </div>
                            </div>

                            <ul className="comment-actions-list">
                                <li className="comment-action">
                                    <button className="like-action">Like</button>
                                </li>
                                <li className="comment-action replay-action">Reply</li>
                            </ul>
                        </div>
                    </div>

                    {/* <ReplyComment comment={comment} /> */}
                </>
                                    

    )
}