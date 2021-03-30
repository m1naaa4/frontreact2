import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';




export default function PostFooter({ post }) {

    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const infoprofile = useSelector(state => state.infoProfile);
    
    
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
              <div className="reaction likes"><i className="dadupa-icon icon-clap"></i><span>145</span></div>
              <div className="reaction views"><i className="uil uil-eye"></i> <span>1500</span></div>
            </div>
            <div className="col-6 col-md-8 col-lg-6 text-right">
              <div className="reaction comments"><span>1.9K Comments</span></div>
              <div className="reaction shares"><span>380 Shares</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="reactions-buttons">
        <button className="reaction-button reaction-like" type="button" name="button">
          <img src="assets/images/icons/dadupa-clap-green.svg" alt=""/>
          Aimer
        </button>
        <button className="reaction-button reaction-comment" type="button" name="button">
          <img src="assets/images/icons/dadupa-comment.svg" alt=""/>
          Commenter
        </button>
        <button className="reaction-button" type="button" name="button" data-toggle="modal" data-target="#SharingModal">
          <img src="assets/images/icons/dadupa-share.svg" alt=""/>
          Partager
        </button>
      </div>
      <div id="Comments-Wrap" className="Comments-Wrap">
        <div className="Comments-Box">
          <div className="Comment-Writing">
            <div className="Comment-Col-2">
              <div className="Comment-User-Thumb">
                <img src={avatar} alt="avatar" />
              </div>
            </div>
            <div className="Comment-Col-10">
              <div className="Comment-Area">
                <div className="Comment-Input">
                  <input type="text" name="comment" value="" placeholder="Write your comment"/>
                </div>
              </div>
            </div>
          </div>
          <div className="User-Comments">

            {/* <!-- #### COMMENT 1 ### --> */}
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

            {/* <!-- #### COMMENT 2 ### --> */}
            <div className="User-Comment">

              {/* <!-- ### COMMENTE THUMB ### --> */}
              <div className="Comment-Col-2">
                <div className="Comment-User-Thumb">
                  <img src="assets/images/elbezzaz-profile.jpg" alt=""/>
                </div>
                <ul className="comment-reactions-list">
                  <li className="comment-reaction"><i className="dadupa-icon icon-clap"></i></li>
                  <label className="count-reactions">28</label>
                </ul>
              </div>


              <div className="Comment-Col-10">
                {/* <!-- ### COMMENTE CONTENT ### --> */}
                <div className="Comment-User">
                  <div className="Comment-Content">
                    <div className="Comment-User-Name">
                      <a className="Comment-User-Profile" href="#">Youness EL BEZZAZI</a>
                      <span className="Comment-Date">07/04/2020</span>
                    </div>
                    <div className="Comment-Text">
                      <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus</span>
                    </div>
                  </div>
                </div>
                {/* <!-- ### COMMENTE ACTIONS ### --> */}
                <div className="comment-actions multi-options">
                  <div className="comment-replies-count">
                    <button className="comment-replies-button" type="button" name="button"><i
                      className="uil uil-comment-notes"></i> <span>16</span><span> Replies</span></button>
                  </div>
                  <ul className="comment-actions-list">
                    <li className="comment-action">
                      <button className="like-action">Like</button>
                    </li>
                    <li className="comment-action replay-action">Reply</li>
                  </ul>
                </div>

              </div>

              {/* <!-- ### COMMENTER REPLIES ### --> */}
              <div className="Comment-Replies">
                <div className="Comment-Reply">
                  <div className="User-Comment">
                    <div className="Comment-Col-2">
                      <div className="Comment-User-Thumb">
                        <img src="assets/images/abbass-iya.jpg"/>
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
                            <a className="Comment-User-Profile" href="#">Abbass IYA</a>
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
                      <img src={avatar} alt="avatar"/>
                    </div>
                  </div>
                  <div className="Comment-Col-10">
                    <div className="Comment-Area">
                      <div className="Comment-Input">
                        <input type="text" name="" value="" placeholder="Write a reply..."/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- #### COMMENT 3 ### --> */}
            <div className="User-Comment">
              <div className="Comment-Col-2">
                <div className="Comment-User-Thumb">
                  <img src="assets/images/othmane-profile.jpg" alt=""/>
                </div>
                <ul className="comment-reactions-list">
                  <li className="comment-reaction"><i className="dadupa-icon icon-clap"></i></li>
                  <label className="count-reactions">2</label>
                </ul>
                ''
              </div>
              <div className="Comment-Col-10">
                <div className="Comment-User">
                  <div className="Comment-Content">
                    <div className="Comment-User-Name">
                      <a className="Comment-User-Profile" href="#">Othmane Amrhar</a>
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
                      {/* <!-- <i className="uil uil-comment-notes"></i> <span>16</span><label> Replies</label> --> */}
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
    </div>

    )
}
