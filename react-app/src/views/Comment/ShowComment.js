import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { useHistory} from 'react-router-dom';
import { AddCommentAction } from '../../store/actions/Comment/CommentAction';
import parse from 'html-react-parser';
import { LikeAction } from '../../store/actions/Like/LikeAction';
import { useTranslation } from 'react-i18next';

export default function ShowComment({comment, providerType}) {

    const [t] = useTranslation();
    const dispatch = useDispatch();
    const [replies, SetReplies] = useState(false);
    const [replyBox, SetReplyBox] = useState(false);
    const [body, setBody] = useState();
    const [to, setTo] = useState();
    const [profileId, setProfileId] = useState();
    const refcomment = useRef(null);
    const history  = useHistory();
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState();

    const userProfile = useSelector(state => state.userProfile.userProfile);

    const gotToProfile = () => {
        history.push('/profile/'+ comment.profile_id);
    };

    useEffect(() => {
        if (comment != 'loading' && comment) {
            setLikeCount(comment.likeCount);
            setLike(comment.is_liked);
        }
    }, [comment.likeCount]);
    
    const submitReply =  async (value, key) => {
        if (key === 13 && value !== '') {
            const data = {
                provider_id     : window.location.href.split("/").pop(),
                provider        : providerType,
                body            : '<a href='+`${process.env.REACT_APP_FRONT_URL}`+ "/profile/" + profileId + ' target="_blank">' + to + '</a>' + ' ' + body,
            }
            refcomment.current.value = ''
            dispatch(AddCommentAction(data, '/create'));
        }
    }

    const likeAction = () => {
        setLike(!like);
        const dataa = {
            action: "like",
            provider_id: comment.id,
            provider: "comment",
            type    : like ? 'dislike' : 'like',
        }

        dispatch(LikeAction(dataa, '/like'));        
    }

    useEffect(() => {
        window.pusher.pusher.subscribe(`new-like`).bind('like', function (data) {
            if (comment.id == data.provider_id) {
                if (data.value == 1) {
                    setLikeCount((prevCount) => prevCount + 1);
                } else if (data.value == 0) {
                    setLikeCount((prevCount) => prevCount > 0 ? prevCount -1 : 0);  
                }
            }
        });
    }, [comment.id]);

    const showReplyBox =  async (value, e) => {
        SetReplyBox(!replyBox);
        setTo('@'+value.username +' ');
        setProfileId(value.profile_id);
        
    }
    return (
        
                <>                                            
                    <div className="Comment-Col-2">
                        <div className="Comment-User-Thumb">
                            {comment.creator.avatar ? 
                                <img onClick={gotToProfile} src={comment.creator.avatar} alt="avatar" />    
                            : <img onClick={gotToProfile} src="/assets/images/avatar.png" alt="avatar" />}
                        </div>
                        <ul className="comment-reactions-list">
                            <li className="comment-reaction"><img
                                src="/assets/images/icons/dadupa-like.svg" alt=""/></li>
                            <label className="count-reactions">{likeCount}</label>
                        </ul>
                    </div>
                    <div className="Comment-Col-10">
                        <div className="Comment-User">
                            <div className="Comment-Content">
                                <div className="Comment-User-Name">
                                    <a className="Comment-User-Profile" onClick={gotToProfile} href="#">{comment.creator.username}</a>
                                    <span className="Comment-Date">{comment.created_at.for_humans} </span>
                                </div>
                                <div className="Comment-Text">
                                        <span>
                                            {parse(comment.body)}
                                        </span>
                                        
                                       
                                </div>
                            </div>
                        </div>
                        <div className="comment-actions">
                            
                            <div className="comment-actions multi-options">
                                    
                            </div>

                            <ul className="comment-actions-list">
                                <li className="comment-action">
                                    <button className={like ? 'like-action post-liked' : 'like-action'} 
                                        onClick={likeAction} toggle="#password-field" type="button" name="button">
                                            {like ? t('unclap') : t('clap')}
                                    </button>
                                </li>
                                <li className="comment-action replay-action" onClick={(e) => showReplyBox(comment.creator, e.keyCode)}>{t('reply')}</li>
                            </ul>
                        </div>
                    </div>

                    {replies && <div className="Comment-Replies Toggle-Replies" style={{width: "100%"}}>
                        { comment.replies.data &&  comment.replies.data.map((com, index) =>
                            <div className="Comment-Reply" key={com.id}>
                                <div className="User-Comment">
                                    <div className="Comment-Col-2">
                                        <div className="Comment-User-Thumb">
                                        <img src={com.avatar} alt="avatar" />
                                        </div>
                                    </div>
                                    <div className="Comment-Col-10">
                                        <div className="Comment-User">
                                        <div className="Comment-Content">
                                            <div className="Comment-User-Name">
                                            <a className="Comment-User-Profile" href="#">{com.user_name}</a>
                                            <span className="Comment-Date">{com.created_at_human}</span>
                                            </div>
                                            <div className="Comment-Text">
                                                <span>{com.body}</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="comment-actions">
                                        <ul className="comment-actions-list">
                                        </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )}
                </div>}

                {replyBox && <div style={{width: "100%"}}>
                    <div className="Comment-Reply Writing-Box">
                            <div className="Comment-Writing">
                            <div className="Comment-Col-2">
                                <div className="Comment-User-Thumb">
                                    <img src={userProfile?.profile?.avatar_link} alt={userProfile.name}/>
                                </div>
                            </div>
                            <div className="Comment-Col-10">
                                <div className="Comment-Area">
                                    <div className="Comment-Input">
                                        {/* <span onClick={gotToProfile} style={{color: 'blue', textDecoration: 'underline'}}>{to}</span> */}
                                        <input type="text" name="body" defaultValue={body}
                                            onChange={e => setBody(e.target.value)} ref={refcomment}
                                            placeholder={t('write_comment')}
                                            onKeyDown={(e) => submitReply(e.target.value, e.keyCode) }
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                 </div></div>
                 }
                </>
                                    

    )
}