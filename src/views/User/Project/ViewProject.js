import React  from 'react'

export default function ViewProject() {



    return (
        <div className="Single-Wrapper">
            <div className="container">

                {/* <!-- SINGLE -->*/}
                <div className="Single-Content">
                    <div className="row">
                        <div className="col-md-8">

                            {/*!--PAGE HEADER --*/}
                            <div className="single-header">
                                <div className="signle-offer-type">Project Business</div>
                                <div className="single-offer-header">
                                    <div className="single-offer-logo">
                                        <img src="assets/images/porject-logo.png" title="Nom du projet" alt=""/>
                                    </div>
                                    <h3 className="single-offer-name">Nom du projet</h3>
                                </div>
                            </div>

                            <div className="Content-Wrap">
                                <div className="Signle-Offer-Media">
                                    <video className="player" playsinline controls
                                           data-poster="assets/images/offers/offer-thumb-5.jpg">
                                        <source src="assets/media/earth.mp4" type="video/mp4"/>
                                        <source src="assets/media/earth.ogv" type="video/ogv"/>
                                    </video>
                                </div>

                                <div className="Signle-Offer-Content">
                                    <div className="reactions-wrap">
                                        <div className="reactions-box">
                                            <div className="row">
                                                <div className="col-6 col-md-4 col-lg-6">
                                                    <div className="reaction likes"><img src=""/><span>145</span></div>
                                                    <div className="reaction views"><i className="uil uil-eye"></i>
                                                        <span>1500</span></div>
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
                                            <img src="assets/images/icons/dadupa-like.svg" alt=""/>
                                                Aimer
                                        </button>
                                        <a className="reaction-button reaction-comment" href="#Comments-Wrap">
                                            <img src="assets/images/icons/dadupa-comment.svg" alt=""/>
                                                Commenter
                                        </a>
                                        <button className="reaction-button" type="button" name="button">
                                            <img src="assets/images/icons/dadupa-share.svg" alt=""/>
                                                Partager
                                        </button>
                                    </div>
                                    <div className="Signle-Offer-Text">
                                        <p>Massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor
                                            orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue
                                            eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed
                                            egestas egestas fringilla phasellus faucibus scelerisque eleifend donec
                                            pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae
                                            elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer
                                            vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum
                                            lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna
                                            nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin
                                            aliquam ultrices sagittis orci a scelerisque purus semper eget duis at
                                            tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet
                                            lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien
                                            pellentesque habitant morbi tristique senectus et netus et malesuada fames
                                            ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies
                                            mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet
                                            consectetur adipiscing elit pellentesque habitant morbi tristique senectus
                                            et netus et malesuada fames ac turpis egestas integer eget aliquet nibh
                                            praesent tristique magna sit amet purus gravida quis blandit turpis cursus
                                            in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat
                                            consequat mauris nunc congue nisi vitae suscipit tellus mauris a diam
                                            maecenas sed enim ut sem viverra aliquet eget sit amet tellus cras
                                            adipiscing enim eu turpis egestas pretium aenean pharetra magna ac placerat
                                            vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui
                                            ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod
                                            nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor
                                            id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet
                                            risus nullam eget felis eget nunc lobortis mattis</p>
                                    </div>

                                </div>
                            </div>

                            <div id="Comments-Wrap" className="Comments-Wrap">
                                <div className="Comments-Header">
                                    <div className="Comments-Title">
                                        <h3>Comments</h3>
                                    </div>
                                    <div className="Comments-Filter">
                                        <div className="comment-select">
                                            <select className="comments-filter-select" name="">
                                                <option value="" selected>Newest</option>
                                                <option value="">Newest</option>
                                                <option value="">Newest</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="Comments-Box">
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
                                                           placeholder="Write your comment"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="User-Comments">

                                        {/*!--#### COMMENT 1 ### --*/}
                                        <div className="User-Comment">
                                            <div className="Comment-Col-2">
                                                <div className="Comment-User-Thumb">
                                                    <img src="assets/images/abdelkarim-profile.jpg" alt=""/>
                                                </div>
                                                <ul className="comment-reactions-list">
                                                    <li className="comment-reaction"><img
                                                        src="assets/images/icons/dadupa-like.svg" alt=""/></li>
                                                    <label className="count-reactions">120</label>
                                                </ul>
                                            </div>
                                            <div className="Comment-Col-10">
                                                <div className="Comment-User">
                                                    <div className="Comment-Content">
                                                        <div className="Comment-User-Name">
                                                            <a className="Comment-User-Profile" href="#">Abdelkrim
                                                                Ichi</a>
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
                                                            <img src="assets/images/abbass-iya.jpg"/>
                                                        </div>
                                                    </div>
                                                    <div className="Comment-Col-10">
                                                        <div className="Comment-Area">
                                                            <div className="Comment-Input">
                                                                <input type="text" name="" value=""
                                                                       placeholder="Write your comment"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="Post-Actions">
                                <div className="Update-Post">
                                    <button type="button" name="button" data-toggle="tooltip" data-placement="bottom"
                                            title="Edit Post" className="edit-button"><i className="uil uil-pen"></i>
                                    </button>
                                </div>
                                <div className="Send-Message">
                                    <button className="Button-Send" type="button" name="button" data-toggle="tooltip"
                                            data-placement="bottom" title="Send a message">
                                        <span>Envoyer un message</span> <i className="uil uil-message"></i></button>
                                </div>
                            </div>
                            <div className="Single-Offer-Details">
                                <ul className="Offer-Details-List">
                                    <li className="Offer-Item">
                                        <label>Publié le</label>
                                        <span>7 Avril 2020</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Etat du projet</label>
                                        <span>Idée</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Secteurs d’activité</label>
                                        <span>Agriculture</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Zones ciblées</label>
                                        <span>Maroc, France</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Financement recherché</label>
                                        <span>$100.000</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="Single-Offer-Tags">
                                <h3>Tags</h3>
                                <ul className="Tags-List">
                                    <li className="Tag-Item">Tag</li>
                                    <li className="Tag-Item">Tag</li>
                                    <li className="Tag-Item">Tag</li>
                                    <li className="Tag-Item">Tag</li>
                                    <li className="Tag-Item">Tag</li>
                                    <li className="Tag-Item">Tag</li>
                                    <li className="Tag-Item">Tag</li>
                                </ul>
                            </div>
                            <div className="Co-Porteurs">
                                <h3>Co-porteurs du projet</h3>
                                <ul className="Co-Porteurs-List">
                                    <li className="Co-Porteur">
                                        <a href="#">
                                            <div className="Co-Porteur-Profile">
                                                <img src="assets/images/abbass-iya.jpg"/>
                                            </div>
                                            <div className="Co-Porteur-Name">Abbass IYA</div>
                                        </a>
                                    </li>
                                    <li className="Co-Porteur">
                                        <a href="#">
                                            <div className="Co-Porteur-Profile">
                                                <img src="assets/images/abbass-iya.jpg"/>
                                            </div>
                                            <div className="Co-Porteur-Name">Abbass IYA</div>
                                        </a>
                                    </li>
                                    <li className="Co-Porteur">
                                        <a href="#">
                                            <div className="Co-Porteur-Profile">
                                                <img src="assets/images/abbass-iya.jpg"/>
                                            </div>
                                            <div className="Co-Porteur-Name">Abbass IYA</div>
                                        </a>
                                    </li>
                                    <li className="Co-Porteur">
                                        <a href="#">
                                            <div className="Co-Porteur-Profile">
                                                <img src="assets/images/abbass-iya.jpg"/>
                                            </div>
                                            <div className="Co-Porteur-Name">Abbass IYA</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}