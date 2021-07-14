import React, {useEffect, useRef, useState} from 'react'
import { Modal } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import ModalUpdateProfile from './Update_profile/ModalUpdateProfile';



export default function SideLeftProfileView() {

    const infoprofile = useSelector(state => state.infoProfile);
    const user = useSelector(state => state.userProfile.userProfile);
    const [show, setShow] = useState(false);
    const [user_profile_id, setProfileId] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  useEffect(() => {        
    if (user) {
      setProfileId(user.profile_id);console.log('user_profile_id', user_profile_id)
    }
  })
  
   

    return (
        
        <div className="col-md-3">
            {
            infoprofile.infoprofile !== "" && infoprofile.infoprofile !== 'loading' ?
            <div className="Left-Side">
              {/* <div className="Widget-BOX Profile-Info">
                <h3 className="Widget-Title text-center">Les 7 derniers jours</h3>
                <div className="Widget-Stats">
                  <div className="Stats-Field Stats-Field-Col-2">
                    <div className="Stats-Value"><span>+ </span><span className="counter">45</span></div>
                    <div className="Stats-Text">Interactions<br/> offres</div>
                  </div>
                  <div className="Stats-Field Stats-Field-Col-2">
                    <div className="Stats-Value"><span>+ </span><span className="counter">30</span></div>
                    <div className="Stats-Text">Visites<br/> de profil</div>
                  </div>
                </div>
              </div> */}
              <div className="Widget-BOX">
              
                <div className="Profile-Info Profile-Infos-Items">
                {user_profile_id === infoprofile.infoprofile.id &&
                  <button type="button" className="UpdateInfos-BTN" onClick={handleShow} data-toggle="modal" data-target="#exampleModalCenter"><i className="uil uil-pen"></i></button>
                }
                  <ul>
                    <li><i className="uil uil-user"></i> {infoprofile.infoprofile.age}</li>
                    <li><i className="uil uil-crosshair"></i> {infoprofile.infoprofile.job}</li>
                    <li><i className="uil uil-phone"></i> {infoprofile.infoprofile.phone}</li>
                    <li><i className="uil uil-envelope"></i> {infoprofile.infoprofile.email}</li>

                    {infoprofile.infoprofile.networks?.facebook &&<li><i className="uil uil-facebook-f"></i><a href={infoprofile.infoprofile.networks.facebook} target="_blank">@facebook</a> </li>}
                    {infoprofile.infoprofile.networks?.twitter && <li><i className="uil uil-twitter-alt"></i><a href={infoprofile.infoprofile.networks.twitter} target="_blank">@twitter</a> </li>}
                    {infoprofile.infoprofile.networks?.linkedin && <li><i className="uil uil-linkedin-alt"></i><a href={infoprofile.infoprofile.networks.linkedin} target="_blank">@linkedin</a> </li>}
                    {infoprofile.infoprofile.networks?.instagram && <li><i className="uil uil-instagram-alt"></i><a href={infoprofile.infoprofile.networks.instagram} target="_blank">@instagram</a> </li>}
                    {infoprofile.infoprofile.networks?.youtube && <li><i className="uil-youtube"></i><a href={infoprofile.infoprofile.networks.youtube} target="_blank">@youtube</a> </li>}
                  
                  </ul>
                </div>
              
                <Modal show={show} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      {/* <div className="DadupaModal-Header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="uil uil-times"></i></button>
                      </div> */}
                      <ModalUpdateProfile show={show} handleClose={handleClose}/>
                </Modal>

                <div className="Profile-Info Profile-Bio">
                  <h3>Bio</h3>
                  <span>{infoprofile.infoprofile.about}</span>
                </div>
                <div className="Profile-Info">
                  <h3>Secteur d’activité</h3>
                  <span>{infoprofile.infoprofile.sector}</span>
                </div>
                <div className="Profile-Info">
                  <h3>Lieu de résidence</h3>
                  <span>{infoprofile.infoprofile.address}</span>
                </div>
                <div className="Profile-Adresse">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.443077639317!2d-7.6081671853399175!3d33.593806480733214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6c03865309%3A0x1281f2138bd13aab!2sRegus%20-%20Casablanca%2C%20Downtown!5e0!3m2!1sen!2sma!4v1593043725007!5m2!1sen!2sma" 
                        style={{width:"100%", height:"200", frameborder:"0", style:"border:0", allowfullscreen:"", ariaHidden:"false", tabindex:"0"}}></iframe>
                </div>
              </div>
            </div>
            : infoprofile.success === false ?
            infoprofile.message: <span/>
        }
          </div>
        
    )
}
