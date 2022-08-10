import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { GetCommentAction } from '../../../../store/actions/Comment/CommentAction';
import AvatarTooltip from '../../../../utils/AvatarTooltip';
import ReplyComment from './ReplyComment';


export default function ShowComment({ post }) {

  const dispatch = useDispatch();
  const comments = useSelector(state => state.getComments);
  const project = useSelector(state => state.getproject);

  const refAvatar = useRef(null);

  const dataget = {
    action: 'get',
    provider: 'post',
    provider_id: post.id,
  }

  const [replies, SetReplies] = useState(false);
  const [replyBox, SetReplyBox] = useState(false);

  const showReplies = e => {

    console.log('replies', e)
    SetReplies(e)
    SetReplyBox(!replyBox)
  }

  // console.log('commentsssssssssssssssssssssssssssssssssssss', post.comments)

  const showReplyBox = (value) => {
    SetReplyBox(value)
  }

  useEffect(() => {
    // if (post.commentCount > 0) {
    // dispatch(GetCommentAction(dataget));
    // }   
  }, [])

  return (

    <>
      <div className="User-Comments"  >
        {post.comments && post.comments.map((comment, index) =>
          <div key={index}>
            {post.id === comment.commentable_id &&
              <div className="User-Comment" key={index} >
                <div className="Comment-Col-2">
                  <Link ref={refAvatar} className="Comment-User-Thumb" to={"/profile/" + comment.profile_id}>
                    {comment.avatar ?
                      <img src={comment.avatar} alt="avatar" />
                      : <img src="/assets/images/avatar.png" alt="avatar" />}
                    <AvatarTooltip data={comment} myRef={refAvatar} />
                  </Link>
                  {/* <ul className="comment-reactions-list">
                  <li className="comment-reaction"><i className="dadupa-icon icon-clap"></i></li>
                  <label className="count-reactions">{comment.likeCount}</label>
                </ul> */}
                </div>
                <div className="Comment-Col-10">
                  <div className="Comment-User">
                    <div className="Comment-Content">
                      <div className="Comment-User-Name">
                        <Link className="Comment-User-Profile" to={"/profile/" + comment.profile_id}  >{comment.user_name}</Link>
                        <span className="Comment-Date">{comment.created_at}</span>
                      </div>
                      <div className="Comment-Text">
                        <span>{comment.body} </span>
                      </div>
                    </div>
                  </div>

                  <div className="comment-actions multi-options">
                    {/* { comment.replies.data.length > 0 && ( 
                      <div className="comment-replies-count" onClick={e => showReplies(comment.id)}>
                        <button className="comment-replies-button" type="button" name="button"><i className="uil uil-comment-notes"></i>
                         <span>{comment.replies.data.length} </span><span> Replies</span>
                        </button>
                      </div>
                    )} */}
                    <div className="comment-replies-count">
                    </div>
                    <ul className="comment-actions-list">
                      {/* <li className="comment-action"><button className="like-action">Like</button></li> */}
                      <li className="comment-action replay-action" onClick={e => showReplyBox(comment.id)}>Reply</li>
                    </ul>
                  </div>

                </div>
                {/*               
              {replies == comment.id && 
              <div className="Comment-Replies">
                { comment.replies.data &&  comment.replies.data.map((com, index) =>
                <div className="Comment-Reply" key={index} >
                  <div className="User-Comment">
                    <div className="Comment-Col-2">
                      <div className="Comment-User-Thumb">
                        <img src={com.avatar} alt="avatar" />
                      </div>
                      <ul className="comment-reactions-list">
                        <li className="comment-reaction"><i className="dadupa-icon icon-clap"></i></li>
                        <label className="count-reactions">12</label>
                      </ul>
                    </div>
                    <div className="Comment-Col-10">
                      <div className="Comment-User">
                        <div className="Comment-Content">
                          <div className="Comment-User-Name">
                            <a className="Comment-User-Profile" href="#">{com.user_name}</a>
                            <span className="Comment-Date">{com.created_at}</span>
                          </div>
                          <div className="Comment-Text">
                            <span>{com.body} </span>
                          </div>
                        </div>
                      </div>
                      <div className="comment-actions">
                        <ul className="comment-actions-list">
                          <li className="comment-action"><button className="like-action">Like</button></li>
                          <li className="comment-action replay-action">Reply</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
              }
              */}
                {replyBox === comment.id &&
                  <ReplyComment comment={comment} post={post} />
                }

              </div>
            }
          </div>
        )

        }

      </div>
    </>


  )
}