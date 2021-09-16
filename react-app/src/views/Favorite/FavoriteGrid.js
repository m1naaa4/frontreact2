import React from 'react'





export default function FavoriteGrid({favorite}) { 
    

    return (
          <div className="grid-item offres">
              <div className="offer-box">
                <div className="offer-header">
                  <div className="offer-title">
                    <h3><a href="single-offer.html">Nom du projet</a></h3>
                    <span>Secteur d’activité</span>
                  </div>
                  <div className="offer-logo">
                    <button className="offer-bookmark" type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer"><i className="uil uil-bookmark"></i></button>
                    <img src="/assets/images/majorel.png" title="Nom du projet" alt=""/>
                  </div>
                </div>
                <div className="offer-media">
                  <video className="player" playsinline controls data-poster="assets/images/offer-thumb-1.jpg">
                    <source src="assets/media/earth.mp4" type="video/mp4" />
                    <source src="assets/media/earth.ogv" type="video/ogv" />
                  </video>
                </div>
                <div className="offer-meta">
                  <ul className="meta-items">
                    <li className="meta-item">
                      <div className="meta-icon">
                        <img src="assets/images/icons/marker.svg" alt=""/>
                      </div>
                      <div className="meta-details">
                        <span className="meta-value">Maroc</span>
                      </div>
                    </li>
                    <li className="meta-item">
                      <div className="meta-icon">
                        <img src="assets/images/icons/value.svg" alt=""/>
                      </div>
                      <div className="meta-details">
                        <span className="meta-value">Type 3</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="offer-reactions">
                  <ul className="reactions-box">
                    <li className="reaction likes"><i className="dadupa-icon icon-clap"></i> <span>145</span></li>
                    <li className="reaction views"><i className="uil uil-eye"></i> <span>1500</span></li>
                    <li className="reaction comments"><i className="uil uil-comment-dots"></i> <span>1.9K</span></li>
                    <li className="reaction shares" data-toggle="modal" data-target="#SharingModal"><i className="uil uil-share-alt"></i> <span>380 Shares</span></li>
                  </ul>
                </div>
              </div>
            </div> 
 
    )
}
