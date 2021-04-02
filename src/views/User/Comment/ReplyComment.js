import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ProjectSkeleton from '../../../skeleton/ProjectSkeleton';
import {AddCommentAction} from "../../../store/actions/User/Comment/AddCommentAction";


export default function ReplyComment(comment) {

    

    const [body, setBody] = useState();

    const project = useSelector(state => state.getproject);
    const userProfile = useSelector(state => state.userProfile.userProfile);

    console.log("commenhhhhhhhhhhhhhhhhhhhhhhhhhhhhht", comment)
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
    )
}