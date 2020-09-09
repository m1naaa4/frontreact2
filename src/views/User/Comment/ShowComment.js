import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {GetCommentAction} from "../../../store/actions/User/Comment/GetCommentAction";


export default function ShowComment(project) {

    let id = 0;
    if (project){
        id = project.project.project.id
    }else{
        id = 0
    }
    console.log("projectkkkkk", project.project.project.id)

    const data = {
        action           : "get",
        commentable_id   : 1449330443,
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetCommentAction(data));
    }, [dispatch])

    const comments = useSelector(state => state.getComments);
    console.log("getcomments", comments)

    return (
        <>
            <div className="Comment-Col-2">
                <div className="Comment-User-Thumb">
                    <img src="assets/images/abdelkarim-profile.jpg" alt=""/>
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
                            <a className="Comment-User-Profile" href="#">Abdelkrim
                                Ichi</a>
                            <span className="Comment-Date">07/04/2020</span>
                        </div>
                        <div className="Comment-Text">
                                <span>
                                    {/*{comments.comment.body}*/}
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
        </>

    )
}