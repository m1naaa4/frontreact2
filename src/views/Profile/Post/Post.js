import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Player} from "video-react";
import { NavLink } from 'react-router-dom';
import PostHeader from './PostWraps/PostHeader';
import PostBody from './PostWraps/PostBody';

export default function Post(props) {

  const [isLoading, setIsLoading] = useState(false);

  const infoprofile = useSelector(state => state.infoProfile);

  const dispatch = useDispatch();
    const observer = useRef()

    const projects =  useSelector(state => state.projects.projects);

    const hasMore = useSelector(state => state.projects.hasMore);
    const current = useSelector(state => state.projects.current);
    const loading = useSelector(state => state.projects.loading);
    const lastProjectElementRef = useCallback( node =>{
        if (projects.loading) return
       
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries =>{
            console.log('entriessssss',entries)
            if (entries[0].isIntersecting && hasMore  ){  
                //dispatch(loadProjectAction( filterInput, props, current+1));
                setIsLoading(true)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        if(!isLoading){
            //dispatch(loadProjectAction( filterInput, props, 1));
        }
    }, [dispatch]);
    
    return (
      
    <div class="Posts-List">
      {
            infoprofile.infoprofile !== "" && infoprofile.infoprofile !== 'loading' ?
      <div class="PostWrap">
        <PostHeader/>
        
        <div class="PostFooter">
          <div class="reactions-wrap">
            <div class="reactions-box">
              <div class="row">
                <div class="col-6 col-md-4 col-lg-6">
                  <div class="reaction likes"><i class="dadupa-icon icon-clap"></i><span>145</span></div>
                  <div class="reaction views"><i class="uil uil-eye"></i> <span>1500</span></div>
                </div>
                <div class="col-6 col-md-8 col-lg-6 text-right">
                  <div class="reaction comments"><span>1.9K Comments</span></div>
                  <div class="reaction shares"><span>380 Shares</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="reactions-buttons">
            <button class="reaction-button reaction-like" type="button" name="button">
              <img src="assets/images/icons/dadupa-clap-green.svg" alt=""/>
              Aimer
            </button>
            <button class="reaction-button reaction-comment" type="button" name="button">
              <img src="assets/images/icons/dadupa-comment.svg" alt=""/>
              Commenter
            </button>
            <button class="reaction-button" type="button" name="button" data-toggle="modal" data-target="#SharingModal">
              <img src="assets/images/icons/dadupa-share.svg" alt=""/>
              Partager
            </button>
          </div>
          <div id="Comments-Wrap" class="Comments-Wrap">
            <div class="Comments-Box">
              <div class="Comment-Writing">
                <div class="Comment-Col-2">
                  <div class="Comment-User-Thumb">
                    <img src="assets/images/abbass-iya.jpg"/>
                  </div>
                </div>
                <div class="Comment-Col-10">
                  <div class="Comment-Area">
                    <div class="Comment-Input">
                      <input type="text" name="" value="" placeholder="Write your comment"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="User-Comments">
    
                {/* <!-- #### COMMENT 1 ### --> */}
                <div class="User-Comment">
                  <div class="Comment-Col-2">
                    <div class="Comment-User-Thumb">
                      <img src="assets/images/abdelkarim-profile.jpg" alt=""/>
                    </div>
                    <ul class="comment-reactions-list">
                      <li class="comment-reaction"><i class="dadupa-icon icon-clap"></i></li>
                      <label class="count-reactions">120</label>
                    </ul>
                  </div>
                  <div class="Comment-Col-10">
                    <div class="Comment-User">
                      <div class="Comment-Content">
                        <div class="Comment-User-Name">
                          <a class="Comment-User-Profile" href="#">Abdelkrim Ichi</a>
                          <span class="Comment-Date">07/04/2020</span>
                        </div>
                        <div class="Comment-Text">
                          <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus ultrices in iaculis nunc</span>
                        </div>
                      </div>
                    </div>
                    <div class="comment-actions">
                      <ul class="comment-actions-list">
                        <li class="comment-action">
                          <button class="like-action">Like</button>
                        </li>
                        <li class="comment-action replay-action">Reply</li>
                      </ul>
                    </div>
                  </div>
                  <div class="Comment-Reply Writing-Box">
                    <div class="Comment-Writing">
                      <div class="Comment-Col-2">
                        <div class="Comment-User-Thumb">
                          <img src="assets/images/abbass-iya.jpg"/>
                        </div>
                      </div>
                      <div class="Comment-Col-10">
                        <div class="Comment-Area">
                          <div class="Comment-Input">
                            <input type="text" name="" value="" placeholder="Write your comment"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    
                {/* <!-- #### COMMENT 2 ### --> */}
                <div class="User-Comment">
    
                  {/* <!-- ### COMMENTE THUMB ### --> */}
                  <div class="Comment-Col-2">
                    <div class="Comment-User-Thumb">
                      <img src="assets/images/elbezzaz-profile.jpg" alt=""/>
                    </div>
                    <ul class="comment-reactions-list">
                      <li class="comment-reaction"><i class="dadupa-icon icon-clap"></i></li>
                      <label class="count-reactions">28</label>
                    </ul>
                  </div>
    
    
                  <div class="Comment-Col-10">
                    {/* <!-- ### COMMENTE CONTENT ### --> */}
                    <div class="Comment-User">
                      <div class="Comment-Content">
                        <div class="Comment-User-Name">
                          <a class="Comment-User-Profile" href="#">Youness EL BEZZAZI</a>
                          <span class="Comment-Date">07/04/2020</span>
                        </div>
                        <div class="Comment-Text">
                          <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus</span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- ### COMMENTE ACTIONS ### --> */}
                    <div class="comment-actions multi-options">
                      <div class="comment-replies-count">
                        <button class="comment-replies-button" type="button" name="button"><i
                          class="uil uil-comment-notes"></i> <span>16</span><span> Replies</span></button>
                      </div>
                      <ul class="comment-actions-list">
                        <li class="comment-action">
                          <button class="like-action">Like</button>
                        </li>
                        <li class="comment-action replay-action">Reply</li>
                      </ul>
                    </div>
    
                  </div>
    
                  {/* <!-- ### COMMENTER REPLIES ### --> */}
                  <div class="Comment-Replies">
                    <div class="Comment-Reply">
                      <div class="User-Comment">
                        <div class="Comment-Col-2">
                          <div class="Comment-User-Thumb">
                            <img src="assets/images/abbass-iya.jpg"/>
                          </div>
                          <ul class="comment-reactions-list">
                            <li class="comment-reaction"><i class="dadupa-icon icon-clap"></i></li>
                            <label class="count-reactions">12</label>
                          </ul>
                        </div>
                        <div class="Comment-Col-10">
                          <div class="Comment-User">
                            <div class="Comment-Content">
                              <div class="Comment-User-Name">
                                <a class="Comment-User-Profile" href="#">Abbass IYA</a>
                                <span class="Comment-Date">07/04/2020</span>
                              </div>
                              <div class="Comment-Text">
                                <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae</span>
                              </div>
                            </div>
                          </div>
                          <div class="comment-actions">
                            <ul class="comment-actions-list">
                              <li class="comment-action">
                                <button class="like-action">Like</button>
                              </li>
                              <li class="comment-action replay-action">Reply</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="Writing-Reply">
                    <div class="Comment-Writing">
                      <div class="Comment-Col-2">
                        <div class="Comment-User-Thumb">
                          <img src="assets/images/abbass-iya.jpg"/>
                        </div>
                      </div>
                      <div class="Comment-Col-10">
                        <div class="Comment-Area">
                          <div class="Comment-Input">
                            <input type="text" name="" value="" placeholder="Write a reply..."/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    
                {/* <!-- #### COMMENT 3 ### --> */}
                <div class="User-Comment">
                  <div class="Comment-Col-2">
                    <div class="Comment-User-Thumb">
                      <img src="assets/images/othmane-profile.jpg" alt=""/>
                    </div>
                    <ul class="comment-reactions-list">
                      <li class="comment-reaction"><i class="dadupa-icon icon-clap"></i></li>
                      <label class="count-reactions">2</label>
                    </ul>
                    ''
                  </div>
                  <div class="Comment-Col-10">
                    <div class="Comment-User">
                      <div class="Comment-Content">
                        <div class="Comment-User-Name">
                          <a class="Comment-User-Profile" href="#">Othmane Amrhar</a>
                          <span class="Comment-Date">07/04/2020</span>
                        </div>
                        <div class="Comment-Text">
                          <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio</span>
                        </div>
                      </div>
                    </div>
                    <div class="comment-actions">
                      <ul class="comment-actions-list">
                        <ul class="comment-replies-count">
                          {/* <!-- <i class="uil uil-comment-notes"></i> <span>16</span><label> Replies</label> --> */}
                        </ul>
                        <li class="comment-action">
                          <button class="like-action">Like</button>
                        </li>
                        <li class="comment-action">Reply</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    
        :
            infoprofile.success === false ?
            infoprofile.message: <span/>
      }
    </div>

    )

}