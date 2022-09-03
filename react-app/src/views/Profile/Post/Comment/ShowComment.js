import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import useOutsideClick from '../../../../helpers/useOutsideClick';
import { GetCommentAction } from '../../../../store/actions/Comment/CommentAction';
import AvatarTooltip from '../../../../utils/AvatarTooltip';
import ReplyComment from './ReplyComment';
import { Modal } from 'react-bootstrap';
import ReportModal from '../../../Admin/Report/ReportModal';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogContentText } from '@material-ui/core';
import Button from '@mui/material/Button';


export default function ShowComment({ post }) {

  const dispatch = useDispatch();
  const comments = useSelector(state => state.getComments);
  const project = useSelector(state => state.getproject);
  const user = useSelector(state => state.userProfile.userProfile);
  let [currentCommentid,setCurrentcommentid] = useState();
  let [curentcommentuser,setcurentcommentuser] = useState();
  const [options_List, SetOptions_List] = useState(false);
  const [user_id, setUserId] = useState();
  const refAvatar = useRef(null);
  const [display,setDisplay] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateText,setUpdateText] = useState('');

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

  useEffect(()=>{
    setUserId(user?.id); 
  },[])

  useEffect(() => {
    // if (post.commentCount > 0) {
    // dispatch(GetCommentAction(dataget));
    // }   
    console.log(post.comments);
  }, [])

  const showOptions = (id,user) =>{
    setCurrentcommentid(id);
    setcurentcommentuser(user);
    SetOptions_List(!options_List);

  }

  const dataComment = {
    provider_id     : currentCommentid,
    provider    : "comment",
    user_id     : curentcommentuser,
}

  const supprimeComment = async (id) =>{
        await axios.post(`${process.env.REACT_APP_API_URL}/comment/delete`,dataComment)
        .then(res => console.log(res))
        .catch(err=> console.log(err));
  }

  const editComment = async (id) =>{
    console.log("edit");
    setOpen(true);
}

  const reportComment =(id) =>{
    setShow(true);
  }
  const handleClose = () => setShow(false);

  const HandleCloseDialog =()=>{
    setOpen(false);
  }

  const dataEdit = {
    provider_id: currentCommentid,
    body: updateText,
   
  }

  const HandleEdit = async ()=>{
    
    await axios.post(`${process.env.REACT_APP_API_URL}/comment/update`,dataEdit)
    .then(res => console.log("data changed successfuly"))
    .catch(err=>console.log(err));


    setOpen(false);
  }

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
                    <AvatarTooltip data={comment} myRef={refAvatar} styles={{marginTop:"67px",marginRight:"69px"}} />
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
                        <span className="Comment-Date">{comment.created_at} &nbsp; 
                         <button style={{background:"transparent",border:"none"}} onClick={()=>showOptions(comment.id,comment.user_id)}>
                              <i className="uil uil-ellipsis-h"></i>
                          </button>
                          {      
                              (options_List && currentCommentid === comment.id) && (
                              <ul className="PostOptions-List PostOptions-ListShow"  >
                                {user_id === comment.user_id && (
                                <> 
                                    <li className="PostDelete">
                                      <button onClick={e => supprimeComment(comment.id)}><i className="uil uil-trash-alt"></i> Supprimer</button>
                                    </li>
                                    <li className="PostDelete">
                                      <button onClick={e => editComment(comment.id)}><i className="uil uil-edit-alt"></i> Edit</button>
                                    </li>
                                    <Dialog
                                            open={open}
                                            onClose={HandleCloseDialog}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            >
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    {/* <span style={{fontWeight:"bold",top:"50px"}}>Request Sent...Other person needs to accept your invite!</span> */}
                                                           <textarea type="text" name="body" className="WritePost-TextArea js-elasticArea" placeholder="Edit Comment" onChange={(e)=> setUpdateText(e.target.value)} style={{width:"300px",borderRadius:"40px",border:"none",padding:"15px",backgroundColor:"#F8FBFC",border:"3px solid #00CC66",fontFamily:"Montserrat sans-serif",fontSize:"15px"}}>{comment.body}</textarea>
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={HandleCloseDialog} style={{backgroundColor:"#00CC66",borderRadius:"30px"}}  autoFocus>
                                                    <span style={{fontWeight:"bold",color:"White",fontSize:"14px"}}>Cancel</span>
                                                </Button>
                                                <Button onClick={HandleEdit} style={{backgroundColor:"#00CC66",marginLeft:"15px",marginRight:"15px",borderRadius:"30px"}} autoFocus>
                                                    <span style={{fontWeight:"bold",color:"White",fontSize:"14px"}}>Edit</span>
                                                </Button>
                                                </DialogActions>
                                    </Dialog>
                                </>
                                 
                                  )
                                }
                                {user_id !== comment.user_id &&
                                  <li className="PostFavorite">
                                    <button onClick={e => reportComment(comment.id)}><i className="uil uil-ban"></i> Report</button>
                                  </li>
                                }
                                <Modal show={show} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                  <ReportModal providerObject={comment} provider='comment' showReport={show} handleCloseReport={handleClose}/>
                                </Modal>
                                {/* <Modal show={show} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                  <ReportModal providerObject={post} provider='comment' showReport={show} handleCloseReport={handleClose}/>
                                </Modal>
                                 */}
                              </ul>
                            )
                          }
                        </span>
                       
                         
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