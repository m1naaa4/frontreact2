import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { AddCommentAction } from '../../../../store/actions/User/Comment/AddCommentAction';
import {GetCommentAction} from "../../../../store/actions/User/Comment/GetCommentAction";


export default function ShowComment({post}) {

    
    const dispatch = useDispatch();
    const comments = useSelector(state => state.getComments);
    const project = useSelector(state => state.getproject);


    
    const dataget = {
        action           : 'get',
        provider         : 'post',
        provider_id      : post.id,
    }

    dispatch(GetCommentAction(dataget));

    const [replies, SetReplies] = useState(false);
    const [replyBox, SetReplyBox] = useState(false);
    const [avatar, setAvatar] = useState();

    const [body, setBody] = useState();
    const refcomment = useRef(null)

    const userProfile = useSelector(state => state.userProfile.userProfile.user);

    const infoprofile = useSelector(state => state.infoProfile);

    useEffect(() => {          
        if (infoprofile.infoprofile.avatar) {             
            setAvatar(infoprofile.infoprofile.avatar)            
        }     
    })    

   
    //console.log("getcomments", comment.comment.replies.data)

    const showReplies = e =>  {
        SetReplies(!replies)
        SetReplyBox(!replyBox)
        
    }

    const showReplyBox = e => {
        SetReplyBox(!replyBox)
    }

    // const data = {
    //     provider_id     : post.id,
    //     action          : 'reply',
    //     provider        : 'post',
    //     body            : body,
    //     commentable_id  : comment.comment.id,
    // }
        
    // const submitReply = (e) => {
    //     e.preventDefault();
    //     refcomment.current.value = '';
    //     dispatch(AddCommentAction(data, props, 'reply'));

    //     setTimeout(() => {
    //         //SetReplies(replies)
    //         SetReplyBox(!replyBox)
    //         dispatch( GetCommentAction(dataget));
    //       }, 2000)
    // }

    return (
        
        <> 
         <div className="User-Comments">

         
            <div className="User-Comment">
              <div className="Comment-Col-2">
                <div className="Comment-User-Thumb">
                  <img src="assets/images/abdelkarim-profile.jpg" alt=""/>
                </div>
                <ul className="comment-reactions-list">
                  <li className="comment-reaction"><i className="dadupa-icon icon-clap"></i></li>
                  <label className="count-reactions">120</label>
                </ul>
              </div>
              <div className="Comment-Col-10">
                <div className="Comment-User">
                  <div className="Comment-Content">
                    <div className="Comment-User-Name">
                      <a className="Comment-User-Profile" href="#">Abdelkrim Ichi</a>
                      <span className="Comment-Date">07/04/2020</span>
                    </div>
                    <div className="Comment-Text">
                      <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus ultrices in iaculis nunc</span>
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
              <div className="Comment-Reply Writing-Box">
                <div className="Comment-Writing">
                  <div className="Comment-Col-2">
                    <div className="Comment-User-Thumb">
                      <img src={avatar} alt="avatar"/>
                    </div>
                  </div>
                  <div className="Comment-Col-10">
                    <div className="Comment-Area">
                      <div className="Comment-Input">
                        <input type="text" name="" value="" placeholder="Write your comment"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                                 
                  
          </div>
        </>
                                    

    )
}