import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import FileUploadService from '../../helpers/FileUploadService';
import { ProfileAction } from '../../store/actions/Profile/UserActions';
import AddPostView from './Post/AddPostView';



export default function PostView(props) {

    return (
        
        <div className="col-md-6">
            <div className="Center-Side">

              <div className="Filter-Row">
                <form className="Filter-Form NoMargin-Top Margin-Bottom_30" action="#" method="post">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="display-flex">
                        <div className="input-row">
                          <button type="button" className="OrderAlph">Ordre Alphabétique</button>
                        </div>
                        <div className="input-row date-row">
                          <div id="reportrange">
                              <i className="uil uil-calendar-alt"></i>&nbsp;
                              <span></span> <i className="fa fa-caret-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <AddPostView  {...props}/>

              <div className="Posts-List">
                
              <div className="PostWrap">
                  <div className="PostHeader">
                    <div className="PostUser-Thumb"><img src="assets/images/abbass-iya-profile.jpg" /></div>
                    <div className="PostUser-Details">
                      <div className="PostUser-Name">Abbass IYA</div>
                      <div className="PostUser-Time">March 13 at 9:41 PM</div>
                    </div>
                    <div className="PostOptions">
                      <button type="button" className="PostOptions-BTN"><i className="uil uil-ellipsis-h"></i></button>
                      <ul className="PostOptions-List">
                        <li className="PostFavorite"><button><i className="uil uil-favorite"></i> Favori</button></li>
                        <li className="PostKey"><button><i className="uil uil-key-skeleton"></i> Historique clé</button></li>
                        <li className="PostDelete"><button><i className="uil uil-trash-alt"></i> Supprimer</button></li>
                      </ul>
                    </div>
                  </div>
                  <div className="PostBody">

                    <div className="PostBody-Text">
                      <p>Postulez au Cisco Global Problem Solver Challenge, et tentez de gagner jusqu’au Grand prix de 250 000 USD pour accélérer le développement de votre startup.</p>
                      <p>Afin d’encourager les entrepreneurs en démarrage du monde entier, Cisco met en jeu un prix de 1 000 000 USD qui permettra d'accélérer l'adoption de technologies, de produits et de services révolutionnaires qui favorisent le développement économique et/ou résolvent des problèmes sociaux ou environnementaux.</p>
                    </div>
                    <div id="multi-comment-box" className="PostBody-Media PostBody-SingleImage">
                      <a href="assets/images/dadupa-post-image.jpg" data-sub-html='<div className="fb-comments" data-href="http://sachinchoolur.github.io/lightGallery/demos/comment-box.html#lg=1&slide=0" data-width="400" data-numposts="5">

                        <div className="PostHeader">
                          <div className="PostUser-Thumb"><img src="assets/images/abbass-iya-profile.jpg" /></div>
                          <div className="PostUser-Details">
                            <div className="PostUser-Name">Abbass IYA</div>
                            <div className="PostUser-Time">March 13 at 9:41 PM</div>
                          </div>
                          <div className="PostOptions">
                            <button type="button" className="PostOptions-BTN"><i className="uil uil-ellipsis-h"></i></button>
                            <ul className="PostOptions-List">
                              <li className="PostFavorite"><button><i className="uil uil-favorite"></i> Favori</button></li>
                              <li className="PostKey"><button><i className="uil uil-key-skeleton"></i> Historique clé</button></li>
                              <li className="PostDelete"><button><i className="uil uil-trash-alt"></i> Supprimer</button></li>
                            </ul>
                          </div>
                        </div>

                        <div className="PostBody-Text">
                          <p>Postulez au Cisco Global Problem Solver Challenge, et tentez de gagner jusqu’au Grand prix de 250 000 USD pour accélérer le développement de votre startup.</p>
                          <p>Afin d’encourager les entrepreneurs en démarrage du monde entier, Cisco met en jeu un prix de 1 000 000 USD qui permettra daccélérer ladoption de technologies, de produits et de services révolutionnaires qui favorisent le développement économique et/ou résolvent des problèmes sociaux ou environnementaux.</p>
                        </div>

                        <div id="Comments-Wrap" className="Comments-Wrap">
                          <div className="Comments-Box">
                            <div className="User-Comments">

                              <!-- #### COMMENT 1 ### -->
                              <div className="User-Comment">
                                <div className="Comment-Col-2">
                                  <div className="Comment-User-Thumb">
                                    <img src="assets/images/abdelkarim-profile.jpg" alt="">
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
                                        <a className="Comment-User-Profile"href="#">Abdelkrim Ichi</a>
                                        <span className="Comment-Date">07/04/2020</span>
                                      </div>
                                      <div className="Comment-Text">
                                        <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus ultrices in iaculis nunc</span>
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
                                <div className="Comment-Reply Writing-Box">
                                  <div className="Comment-Writing">
                                    <div className="Comment-Col-2">
                                      <div className="Comment-User-Thumb">
                                        <img src="assets/images/abbass-iya.jpg" />
                                      </div>
                                    </div>
                                    <div className="Comment-Col-10">
                                      <div className="Comment-Area">
                                        <div className="Comment-Input">
                                          <input type="text" name="" value="" placeholder="Write your comment">
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- #### COMMENT 2 ### -->
                              <div className="User-Comment">

                                <!-- ### COMMENTE THUMB ### -->
                                <div className="Comment-Col-2">
                                  <div className="Comment-User-Thumb">
                                    <img src="assets/images/elbezzaz-profile.jpg" alt="">
                                  </div>
                                  <ul className="comment-reactions-list">
                                    <li className="comment-reaction"><i className="dadupa-icon icon-clap"></i></li>
                                    <label className="count-reactions">28</label>
                                  </ul>
                                </div>


                                <div className="Comment-Col-10">
                                  <!-- ### COMMENTE CONTENT ### -->
                                  <div className="Comment-User">
                                    <div className="Comment-Content">
                                      <div className="Comment-User-Name">
                                        <a className="Comment-User-Profile"href="#">Youness EL BEZZAZI</a>
                                        <span className="Comment-Date">07/04/2020</span>
                                      </div>
                                      <div className="Comment-Text">
                                        <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus</span>
                                      </div>
                                    </div>
                                  </div>
                                  <!-- ### COMMENTE ACTIONS ### -->
                                  <div className="comment-actions multi-options">
                                    <div className="comment-replies-count">
                                      <button className="comment-replies-button" type="button" name="button"><i className="uil uil-comment-notes"></i> <span>16</span><span> Replies</span></button>
                                    </div>
                                    <ul className="comment-actions-list">
                                      <li className="comment-action"><button className="like-action">Like</button></li>
                                      <li className="comment-action replay-action">Reply</li>
                                    </ul>
                                  </div>

                                </div>

                                <!-- ### COMMENTER REPLIES ### -->
                                <div className="Comment-Replies">
                                  <div className="Comment-Reply">
                                    <div className="User-Comment">
                                      <div className="Comment-Col-2">
                                        <div className="Comment-User-Thumb">
                                          <img src="assets/images/abbass-iya.jpg" />
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
                                              <a className="Comment-User-Profile"href="#">Abbass IYA</a>
                                              <span className="Comment-Date">07/04/2020</span>
                                            </div>
                                            <div className="Comment-Text">
                                              <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae</span>
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
                                </div>
                                <div className="Writing-Reply">
                                  <div className="Comment-Writing">
                                    <div className="Comment-Col-2">
                                      <div className="Comment-User-Thumb">
                                        <img src="assets/images/abbass-iya.jpg" />
                                      </div>
                                    </div>
                                    <div className="Comment-Col-10">
                                      <div className="Comment-Area">
                                        <div className="Comment-Input">
                                          <input type="text" name="" value="" placeholder="Write a reply...">
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- #### COMMENT 3 ### -->
                              <div className="User-Comment">
                                <div className="Comment-Col-2">
                                  <div className="Comment-User-Thumb">
                                    <img src="assets/images/othmane-profile.jpg" alt="">
                                  </div>
                                  <ul className="comment-reactions-list">
                                    <li className="comment-reaction"><i className="dadupa-icon icon-clap"></i></li>
                                    <label className="count-reactions">2</label>
                                  </ul>
                                </div>
                                <div className="Comment-Col-10">
                                  <div className="Comment-User">
                                    <div className="Comment-Content">
                                      <div className="Comment-User-Name">
                                        <a className="Comment-User-Profile"href="#">Othmane Amrhar</a>
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
                                        <!-- <i className="uil uil-comment-notes"></i> <span>16</span><label> Replies</label> -->
                                      </ul>
                                      <li className="comment-action"><button className="like-action">Like</button></li>
                                      <li className="comment-action">Reply</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>'>
                          <img src="assets/images/dadupa-post-image.jpg" alt=""/>
                      </a>
                    </div>
                  </div>
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
                              <img src="assets/images/abbass-iya.jpg" />
                            </div>
                          </div>
                          <div className="Comment-Col-10">
                            <div className="Comment-Area">
                              <div className="Comment-Input">
                                <input type="text" name="" value="hhh" placeholder="Write your comment"/>
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
                                    <a className="Comment-User-Profile"href="#">Abdelkrim Ichi</a>
                                    <span className="Comment-Date">07/04/2020</span>
                                  </div>
                                  <div className="Comment-Text">
                                    <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus ultrices in iaculis nunc</span>
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
                            <div className="Comment-Reply Writing-Box">
                              <div className="Comment-Writing">
                                <div className="Comment-Col-2">
                                  <div className="Comment-User-Thumb">
                                    <img src="assets/images/abbass-iya.jpg" />
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
                                    <a className="Comment-User-Profile"href="#">Youness EL BEZZAZI</a>
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
                                  <button className="comment-replies-button" type="button" name="button"><i className="uil uil-comment-notes"></i> <span>16</span><span> Replies</span></button>
                                </div>
                                <ul className="comment-actions-list">
                                  <li className="comment-action"><button className="like-action">Like</button></li>
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
                                      <img src="assets/images/abbass-iya.jpg" />
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
                                          <a className="Comment-User-Profile"href="#">Abbass IYA</a>
                                          <span className="Comment-Date">07/04/2020</span>
                                        </div>
                                        <div className="Comment-Text">
                                          <span>Massa vitae tortor condimentum lacinia quis vel eros doc odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae</span>
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
                            </div>
                            <div className="Writing-Reply">
                              <div className="Comment-Writing">
                                <div className="Comment-Col-2">
                                  <div className="Comment-User-Thumb">
                                    <img src="assets/images/abbass-iya.jpg" />
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
                              </ul> ''
                            </div>
                            <div className="Comment-Col-10">
                              <div className="Comment-User">
                                <div className="Comment-Content">
                                  <div className="Comment-User-Name">
                                    <a className="Comment-User-Profile"href="#">Othmane Amrhar</a>
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
                                  <li className="comment-action"><button className="like-action">Like</button></li>
                                  <li className="comment-action">Reply</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                


              </div>
            </div>
          </div>
          
        
    )
}
