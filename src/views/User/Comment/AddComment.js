import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AddCommentAction} from "../../../store/actions/User/Comment/AddCommentAction";
import ReplyComment from "./ReplyComment";
import ShowComment from "./ShowComment";
import {GetCommentAction} from "../../../store/actions/User/Comment/GetCommentAction";


export default function AddComment(project) {

    const [body, setBody] = useState();

    const data = {
        idproject   : project.project.id,
        action      : "add",
        model        : "project",
        body        : body,
    }

    const comment = useSelector(state => state.addComment);

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();
        dispatch(AddCommentAction(data));
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
                        <option value="1" selected>Newest</option>
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
                        <img src="assets/images/abbass-iya.jpg"/>
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
                <ShowComment  project={project} />

                <ReplyComment comment={comment} project={project} />
                </div>

                {/*<!-- #### COMMENT 2 ### -->*/}
                <div className="User-Comment">

                    {/*<!-- ### COMMENTE THUMB ### -->*/}
                    <div className="Comment-Col-2">
                        <div className="Comment-User-Thumb">
                            <img src="assets/images/elbezzaz-profile.jpg" alt=""/>
                        </div>
                        <ul className="comment-reactions-list">
                            <li className="comment-reaction"><img
                                src="assets/images/icons/dadupa-like.svg" alt=""/></li>
                            <label className="count-reactions">28</label>
                        </ul>
                    </div>


                    <div className="Comment-Col-10">
                        {/*<!-- ### COMMENTE CONTENT ### -->*/}
                        <div className="Comment-User">
                            <div className="Comment-Content">
                                <div className="Comment-User-Name">
                                    <a className="Comment-User-Profile" href="#">Youness EL
                                        BEZZAZI</a>
                                    <span className="Comment-Date">07/04/2020</span>
                                </div>
                                <div className="Comment-Text">
                                    <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus</span>
                                </div>
                            </div>
                        </div>
                        {/*<!-- ### COMMENTE ACTIONS ### -->*/}
                        <div className="comment-actions multi-options">
                            <div className="comment-replies-count">
                                <button className="comment-replies-button" type="button"
                                        name="button"><i className="uil uil-comment-notes"></i>
                                    <span>16</span><span> Replies</span></button>
                            </div>
                            <ul className="comment-actions-list">
                                <li className="comment-action">
                                    <button className="like-action">Like</button>
                                </li>
                                <li className="comment-action replay-action">Reply</li>
                            </ul>
                        </div>

                    </div>

                    {/*!--### COMMENTER REPLIES ### --*/}
                    <div className="Comment-Replies">
                        <div className="Comment-Reply">
                            <div className="User-Comment">
                                <div className="Comment-Col-2">
                                    <div className="Comment-User-Thumb">
                                        <img src="assets/images/abbass-iya.jpg"/>
                                    </div>
                                    <ul className="comment-reactions-list">
                                        <li className="comment-reaction"><img
                                            src="assets/images/icons/dadupa-like.svg" alt=""/>
                                        </li>
                                        <label className="count-reactions">12</label>
                                    </ul>
                                </div>
                                <div className="Comment-Col-10">
                                    <div className="Comment-User">
                                        <div className="Comment-Content">
                                            <div className="Comment-User-Name">
                                                <a className="Comment-User-Profile" href="#">Abbass
                                                    IYA</a>
                                                <span className="Comment-Date">07/04/2020</span>
                                            </div>
                                            <div className="Comment-Text">
                                                <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae</span>
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
                            </div>
                        </div>
                    </div>
                    <div className="Writing-Reply">
                        <div className="Comment-Writing">
                            <div className="Comment-Col-2">
                                <div className="Comment-User-Thumb">
                                    <img src="assets/images/abbass-iya.jpg"/>
                                </div>
                            </div>
                            <div className="Comment-Col-10">
                                <div className="Comment-Area">
                                    <div className="Comment-Input">
                                        <input type="text" name="" value=""
                                               placeholder="Write a reply..."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<!-- #### COMMENT 3 ### -->*/}
                <div className="User-Comment">
                    <div className="Comment-Col-2">
                        <div className="Comment-User-Thumb">
                            <img src="assets/images/othmane-profile.jpg" alt=""/>
                        </div>
                        <ul className="comment-reactions-list">
                            <li className="comment-reaction"><img
                                src="assets/images/icons/dadupa-like.svg" alt=""/></li>
                            <label className="count-reactions">2</label>
                        </ul>
                    </div>
                    <div className="Comment-Col-10">
                        <div className="Comment-User">
                            <div className="Comment-Content">
                                <div className="Comment-User-Name">
                                    <a className="Comment-User-Profile" href="#">Othmane
                                        Amrhar</a>
                                    <span className="Comment-Date">07/04/2020</span>
                                </div>
                                <div className="Comment-Text">
                                    <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio</span>
                                </div>
                            </div>
                        </div>
                        <div className="comment-actions">
                            <ul className="comment-actions-list">
                                <ul className="comment-replies-count">
                                    {/*<!-- <i class="uil uil-comment-notes"></i> <span>16</span><label> Replies</label> -->*/}
                                </ul>
                                <li className="comment-action">
                                    <button className="like-action">Like</button>
                                </li>
                                <li className="comment-action">Reply</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}