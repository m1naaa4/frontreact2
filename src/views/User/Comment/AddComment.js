import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AddCommentAction} from "../../../store/actions/User/Comment/AddCommentAction";
import ReplyComment from "./ReplyComment";
import ShowComment from "./ShowComment";
import {GetCommentAction} from "../../../store/actions/User/Comment/GetCommentAction";


export default function AddComment() {

    const [body, setBody] = useState();

    const comment = useSelector(state => state.addComment);
    const project = useSelector(state => state.getproject);
    const userProfile = useSelector(state => state.userProfile.userProfile.user);
    console.log("profileeeeeeeeeeeeeeeeeee", userProfile)

    const data = {
        provider_id   : project.getproject.projectid,
        action      : "add",
        provider        : "project",
        body        : body,
    }

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();
        dispatch(AddCommentAction(data));
    }

    const white = () =>{

    }

    // useEffect(() => {
    //     dispatch(GetCommentAction(data));
    // }, [dispatch])

    return (
            <div id="Comments-Wrap" className="Comments-Wrap">
        <div className="Comments-Header">
            <div className="Comments-Title">
                <h3>Comments</h3>
            </div>
            <div className="Comments-Filter">
                <div className="comment-select">
                    <select className="comments-filter-select" name="">
                        <option value="1" defaultValue="1">Newest</option>
                        <option value="2">Newest</option>
                        <option value="3">Newest</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="Comments-Box">

            <form className="Comment-Writing" onSubmit={ handleSubmitValue}>
                <div className="Comment-Col-2">
                    <div className="Comment-User-Thumb">
                        <img src={userProfile.avatar} alt={userProfile.name} />
                    </div>
                </div>
                <div className="Comment-Col-10">
                    <div className="Comment-Area">
                        <div className="Comment-Input">
                            <input type="text" name="body"
                                   onChange={e => setBody(e.target.value)}  placeholder="Write your comment"/>
                        </div>
                    </div>
                </div>
            </form>

            <div className="User-Comments">

                {/*!--#### COMMENT 1 ### --*/}
                <div className="User-Comment">
                <ShowComment />
                </div>

               </div>
        </div>
    </div>
    )
}