import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { GetCommentAction } from '../../../../store/actions/User/Comment/GetCommentAction';
import AddComment from '../Comment/AddComment';
import ShowComment from '../Comment/ShowComment';




export default function PostFooter({ post }) {

    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const infoprofile = useSelector(state => state.infoProfile);  

    const [comments, SetComments] = useState(false);
    const [commentBox, SetCommentBox] = useState(false);

    const showComments = e =>  {
      SetComments(!comments)
      SetCommentBox(!commentBox)      
  }

  const dataget = {
    action           : 'get',
    provider         : 'post',
    provider_id      : post.id,
  }

  const commentss = useSelector(state => state.getComments);

    const showReplyBox = e => {
      SetCommentBox(!commentBox)
  }
    
    useEffect(() => {          
        if (infoprofile.infoprofile.avatar) {             
            setAvatar(infoprofile.infoprofile.avatar)            
            setName(infoprofile.infoprofile.name)            
            setDate(infoprofile.infoprofile.created_at)            
        }     
    })

    return (
        
      
      <div className="PostFooter">

      <div className="reactions-wrap">
        <div className="reactions-box">
          <div className="row">
            <div className="col-6 col-md-4 col-lg-6">
              <div className="reaction likes"><i className="dadupa-icon icon-clap"></i><span>{post.likeCount}</span></div>
              <div className="reaction views"><i className="uil uil-eye"></i> <span>1500</span></div>
            </div>
            <div className="col-6 col-md-8 col-lg-6 text-right">
              <div className="reaction comments" onClick={showComments}><span>{post.commentCount} Comments</span></div>
              <div className="reaction shares"><span>380 Shares</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="reactions-buttons">
        <button className="reaction-button reaction-like" type="button" name="button">
          <img src="/assets/images/icons/dadupa-clap-green.svg" alt="like"/>
          Aimer
        </button>
        <button className="reaction-button reaction-comment" onClick={showComments} type="button" name="button">
          <img src="/assets/images/icons/dadupa-comment.svg" alt="comment"/>
          Commenter
        </button>
        <button className="reaction-button" type="button" name="button" data-toggle="modal" data-target="#SharingModal">
          <img src="/assets/images/icons/dadupa-share.svg" alt="share"/>
          Partager
        </button>
      </div>
      <div id="Comments-Wrap" className="Comments-Wrap">
        <div className="Comments-Box">
          

          {comments &&
              <AddComment post={post} />               
          }
          {commentBox &&            
              <ShowComment  post={post} />                                       
          }
          
          
        </div>
      </div>
       
    </div>

    )
}
