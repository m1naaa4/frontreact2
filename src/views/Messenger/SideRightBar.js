import React  from 'react'



export default function SideRightBar({conversation}) {

  


  return (
    <>
      {conversation.user  &&
  (
    <div className="Messenger-user-profile">
      <div className="Messenger-profile-header">
        <div className="Messenger-Profile-Infos">
          <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
          <div className="Profile-Picture" id="imageProfile" style={{backgroundImage: `url(${conversation.user.profile.avatar_link})`}} ></div>
          <div className="Profile-Name">{conversation.user.profile.username}</div>
        </div>
      </div>
      <div className="Messenger-Profile-Widgets">
      <div className="Messenger-Profile-Widget">
        <h3 className="Messenger-Widget-Title">Lieu de résidence</h3>
        <p>{conversation.user.profile.address}</p>
      </div>
      <div className="Messenger-Profile-Widget">
        <h3 className="Messenger-Widget-Title">{conversation.user.bio}</h3>
        <p>{conversation.user.profile.job}</p>
      </div>
      <div className="Messenger-Profile-Widget">
        <h3 className="Messenger-Widget-Title">Offres</h3>
        <div className="Messenger-Offers">
          <div className="Messenger-Offer">
            <div className="Messenger-Offer-Media">
            </div>
            <div className="Messenger-Offer-Content">
              <div className="offer-title">
                <div className="offer-logo">
                  <img src="assets/images/majorel.png" title="Nom du projet" alt=""/>
                </div>
                <h3><a href="#!" data-toggle="modal" data-target="#performancesModalCenter">Nom du projet</a></h3>
                <span>Secteur d’activité</span>
              </div>
            </div>
          </div>
          <div className="Messenger-Offer">
            <div className="Messenger-Offer-Media">
            </div>
            <div className="Messenger-Offer-Content">
              <div className="offer-title">
                <div className="offer-logo">
                  <img src="assets/images/majorel.png" title="Nom du projet" alt=""/>
                </div>
                <h3><a href="#!" data-toggle="modal" data-target="#performancesModalCenter">Nom du projet</a></h3>
                <span>Secteur d’activité</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
    )
  }

  </>

    )
}