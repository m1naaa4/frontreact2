import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ShowComment from "./ShowComment";
import PusherService from '../../services/Pusher';
import { AddCommentAction } from '../../store/actions/Comment/CommentAction';
import { GetCommentAction } from '../../store/actions/Comment/CommentAction';


export default function AddComment(props) {

    const [body, setBody] = useState();
    const refcomment = useRef(null)

    const comment = useSelector(state => state.addComment);
    const project = useSelector(state => state.getproject);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const comments = useSelector(state => state.getComments);
    //console.log("profileeeeeeeeeeeeeeeeeee", comments)

    const data = {
        provider_id   : project.getproject.projectid,
        action      : "add",
        provider        : "project",
        body        : body,
    }

    const dataget = {
        action           : 'get',
        provider         : 'project',
        provider_id      : project.getproject.projectid,
    }

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();
        refcomment.current.value = ''
        dispatch(AddCommentAction(data, props, 'add'));
        
        // dispatch( GetCommentAction(dataget));
       
    }

    useEffect(() => {
        dispatch(GetCommentAction(dataget));
        const pusher = new PusherService();
        
        var channel = pusher.config.subscribe('project_comment_' + project.getproject.projectid);
        
        channel.bind('NewComment', function(res) {    
            let j = res.id;
            let feed = res[j]
        
            dispatch({type:'ADD_TO_COLLECTION_COMMENT_SUCCESS', feed});
            
        });
    
    }, [dispatch])

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
                                   onChange={e => setBody(e.target.value)} ref={refcomment}  placeholder="Write your comment"/>
                        </div>
                    </div>
                </div>
            </form>

            <div className="User-Comments">

                {/*!--#### COMMENT 1 ### --*/}
                <div className="User-Comment">
                {comments && comments.comments.map((comment, index) => 
                    <ShowComment comment={comment} key={comment.id}/>
                     )
                }
                
                </div>

               </div>
        </div>
    </div>
    )
}