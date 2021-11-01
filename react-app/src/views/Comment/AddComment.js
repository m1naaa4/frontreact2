import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ShowComment from "./ShowComment";
import PusherService from '../../services/Pusher';
import { AddCommentProjectAction } from '../../store/actions/Comment/CommentAction';
import { GetCommentAction } from '../../store/actions/Comment/CommentAction';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';



export default function AddComment({providerObject, providerType}) {

    // const [body, setBody] = useState();
    const refcomment = useRef(null);
    const [t, i18n] = useTranslation();
    const history  = useHistory();
    const pusher = new PusherService();
    const dispatch = useDispatch();

    // const comment = useSelector(state => state.addComment);
    // const project = useSelector(state => state.getproject);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const comments = useSelector(state => state.getComments);

    

    const dataget = {
        action           : 'get',
        provider         : providerType,
        provider_id      : providerObject.projectid,
    }

    const gotToProfile = () => {
        history.push('/profile/'+ userProfile.profile_id);
    };

    const onTyping = () =>{
        pusher.echo.private("project_comment").whisper('typing',{
        user:userProfile?.name
        });
    };

    useEffect(() => {
        dispatch(GetCommentAction(dataget));
        // setCountcomment();
    }, [dispatch])

    const handleSubmitValue =  async (value, key) => {
        
        if (key === 13 && value !== '') {
            const data = {
                provider_id     : providerObject.projectid,
                action          : "add",
                provider        : providerType,
                body            : value,
            }
            refcomment.current.value = ''
        dispatch(AddCommentProjectAction(data, '', 'add'));
        }
    }

   

    return (
            <div id="Comments-Wrap" className="Comments-Wrap">
        
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

                <div className="User-Comment">
                {comments && comments?.comments && comments?.comments.map((comment, index) => 
                    <ShowComment comment={comment} key={comment.id}/>
                    )
                }
                
                </div>

               </div>
        </div>
    </div>
    )
}