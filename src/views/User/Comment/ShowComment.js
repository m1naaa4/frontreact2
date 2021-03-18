import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ProjectSkeleton from '../../../skeleton/ProjectSkeleton';
import {GetCommentAction} from "../../../store/actions/User/Comment/GetCommentAction";
import ReplyComment from './ReplyComment';


export default function ShowComment() {

    
    const dispatch = useDispatch();
    const comments = useSelector(state => state.getComments);
    const project = useSelector(state => state.getproject);

    const data = {
        action           : 'get',
        provider         : 'project',
        provider_id      : project.getproject.projectid,
    }

    useEffect(() => {
        dispatch(GetCommentAction(data));
    }, [dispatch])
    console.log("getcomments", comments)

    return (
        <>
        {
            comments.loading === true  || comments === 0  ? (
                <ProjectSkeleton/>
            ) : comments.success === false ? (
                <div data-testid="error-message">ERROR</div>
            ) : (
                () => {
                    if  (comments.loading === false ) {

                        return (
                            
                            comments.comments.map((comment, index) => {
                                // console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",comments.comments)
                                    return (
                                        <>                                            
                                            <div className="Comment-Col-2">
                                                <div className="Comment-User-Thumb">
                                                    <img src={comment.avatar} alt=""/>
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
                                                            <a className="Comment-User-Profile" href="#">{comment.user_name}</a>
                                                            <span className="Comment-Date">{comment.created_at} </span>
                                                        </div>
                                                        <div className="Comment-Text">
                                                                <span>
                                                                {comment.body}
                                                                    
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="comment-actions">
                                                    <ul className="comment-actions-list">
                                                        <li className="comment-action">
                                                            <button className="like-action">Like</button>
                                                        </li>
                                                        <li className="comment-action replay-action">Reply</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <ReplyComment comment={comment} />
                                        </>
                                    )
  
                            
                            
                                })
                        )
                    }


                }
            )
                ()
        }
        </>

    )
}