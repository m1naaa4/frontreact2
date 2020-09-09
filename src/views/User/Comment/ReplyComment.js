import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {AddCommentAction} from "../../../store/actions/User/Comment/AddCommentAction";


export default function ReplyComment(comment) {

    console.log("comment", comment)

    const [body, setBody] = useState();
    //
    // const data = {
    //     idproject   : comment.project.project.id,
    //     action      : "add",
    //     model        : "project",
    //     body        : body,
    // }
    //
    // const dispatch = useDispatch();
    //
    // const handleSubmitValue = (e) => {
    //     e.preventDefault();
    //     dispatch(AddCommentAction(data));
    // }

    return (
            // <form className="Comment-Reply Writing-Box" onSubmit={ handleSubmitValue}>
            <form className="Comment-Reply Writing-Box" >
                    <div className="Comment-Writing">
                        <div className="Comment-Col-2">
                            <div className="Comment-User-Thumb">
                                <img src="assets/images/abbass-iya.jpg"/>
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
                </form>
    )
}