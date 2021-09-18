import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ShowComment from "./ShowComment";
import PusherService from '../../services/Pusher';
import { AddCommentAction } from '../../store/actions/Comment/CommentAction';
import { GetCommentAction } from '../../store/actions/Comment/CommentAction';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';



export default function AddComment(props) {

    const [body, setBody] = useState();
    const refcomment = useRef(null);
    const [t, i18n] = useTranslation();
    const history  = useHistory();
    const params = useParams();
    const pusher = new PusherService();

    // const comment = useSelector(state => state.addComment);
    const project = useSelector(state => state.getproject);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const comments = useSelector(state => state.getComments);

    

    const dataget = {
        action           : 'get',
        provider         : 'project',
        provider_id      : project.getproject.projectid,
    }

    const gotToProfile = () => {
        history.push('/profile/'+ userProfile.profile.id);
      };

    const dispatch = useDispatch();

     

    const onTyping = () =>{
        pusher.echo.private("project_comment").whisper('typing',{
        user:userProfile?.name
        });
    };

    useEffect(() => {
        dispatch(GetCommentAction(dataget));
        // const pusher = new PusherService();        
        // var channel = pusher.config.subscribe('project_comment_' + project.getproject.projectid);        
        // channel.bind('NewComment', function(res) {    
        //     let j = res.id;
        //     let feed = res[j]       
        //     dispatch({type:'ADD_TO_COLLECTION_COMMENT_SUCCESS', feed});            
        // });
    
    }, [dispatch])

    const handleSubmitValue =  async (value, key) => {
        
        if (key === 13 && value !== '') {
            const data = {
                provider_id     : project.getproject.projectid,
                action          : "add",
                provider        : "project",
                body            : value,
            }
            refcomment.current.value = ''
        dispatch(AddCommentAction(data, props, 'add'));
        }
    }

   

    return (
            <div id="Comments-Wrap" className="Comments-Wrap">
        <div className="Comments-Header">
            <div className="Comments-Title">
                <h3>{t('comments')}</h3>
            </div>
            {/* <div className="Comments-Filter">
                <div className="comment-select">
                    <select className="comments-filter-select" name="">
                        <option value="1" defaultValue="1">Newest</option>
                        <option value="2">Newest</option>
                        <option value="3">Newest</option>
                    </select>
                </div>
            </div> */}
        </div>
        <div className="Comments-Box">

            <div className="Comment-Writing" >
                <div className="Comment-Col-2">
                    <div onClick={gotToProfile} className="Comment-User-Thumb">
                        <img  src={userProfile?.profile?.avatar_link} alt={userProfile?.name} />
                    </div>
                </div>
                <div className="Comment-Col-10">
                    <div className="Comment-Area">
                        <div className="Comment-Input">
                            <input type="text" name="body" onKeyUp={onTyping}
                                   onKeyDown={(e) => handleSubmitValue(e.target.value, e.keyCode) } ref={refcomment}  placeholder="Write your comment"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="User-Comments">

                {/*!--#### COMMENT 1 ### --*/}
                <div className="User-Comment">
                {comments && comments?.comments.map((comment, index) => 
                    <ShowComment comment={comment} key={comment.id}/>
                     )
                }
                
                </div>

               </div>
        </div>
    </div>
    )
}