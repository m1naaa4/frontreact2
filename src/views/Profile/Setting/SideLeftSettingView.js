import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux';
import { useParams } from 'react-router';

import $ from "jquery";
import { Modal } from 'react-bootstrap';
import UpdateAccess from './Modals/UpdateAccess';
import UpdateUserInfo from './Modals/UpdateUserInfo';



export default function SideRightSettingView(props) { 
    const dispatch = useDispatch();
    const params = useParams();

    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);
    

    return (
        <>  
            
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="col-lg-6">
                  <div className="User-Settings">
                    <div className="form-inputs">

                      <div className="User-Settings-Header">
                        <h3>Mon compte</h3>
                        <button type="button" className="UpdateInfos-BTN" onClick={handleShowInfo} data-toggle="modal" data-target="#SkillsModal"><i className="uil uil-pen"></i></button>
                      </div>
                      <Modal show={showInfo} onHide={handleCloseInfo} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <UpdateUserInfo showInfo={showInfo} handleCloseInfo={handleCloseInfo}/>
                    </Modal>
                      <div className="form-row">
                        <div className="col-md-6 input-row">
                          <input type="text" name="project-name" value="" placeholder="Iya Abbass" className="wizard-required" readonly />
                        </div>
                        <div className="col-md-6 input-row">
                          <input type="text" name="project-name" value="" placeholder="Salaheddine" className="wizard-required" readonly />
                        </div>
                        <div className="col-md-6 input-row">
                          <input type="text" name="project-name" value="" placeholder="@salaheddine1" className="wizard-required" readonly />
                        </div>

                        <div className="col-md-6 input-row">
                          <input type="text" name="project-areas" value="" placeholder="12/09/1994" className="wizard-required" readonly />
                        </div>
                        <div className="col-md-12 input-row">
                          <input type="text" name="project-areas" value="" placeholder="Cameroun" className="wizard-required" readonly />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="User-Settings">
                    <div className="form-inputs">

                      <div className="User-Settings-Header">
                        <h3>Mes Accès</h3>
                        <button type="button" className="UpdateInfos-BTN" onClick={handleShow} data-toggle="modal" data-target="#SkillsModal"><i className="uil uil-pen"></i></button>
                      </div>

                      

                    <Modal show={show} onHide={handleClose} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <UpdateAccess show={show} handleClose={handleClose}/>
                    </Modal>

                      <div className="form-row">
                        <div className="col-md-12 input-row">
                          <input type="text" name="project-name" value="" placeholder="test@dadupa.com" className="wizard-required" readonly />
                        </div>
                        <div className="col-md-12 input-row">
                          <input type="password" name="project-name" value="" placeholder="Mon mot de passe" value="Mon mot de passe" className="wizard-required" readonly />
                        </div>
                        <div className="col-md-12 confirmation-message">
                          <div className="confirmation-message-text">
                            <p>Votre email n’est pas confirmé</p>
                          </div>
                          <div className="confirmation-message-action">
                            <button type="button" name="button">Confirmer</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="User-Settings">
                <div className="form-inputs">

                  <div className="User-Settings-Header">
                    <h3>Interface</h3>
                    <button type="button" className="UpdateInfos-BTN UpdateInfos-BTNText">Update</button>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 input-row input-select">
                      <select className="project-status" name="project-status" required >
                        <option selected disabled>Langue</option>
                        <option value="Un porteur de projet">Français</option>
                        <option value="Un bailleur de fonds">Englais</option>
                        <option value="Un accompagnateur">Arabe</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

            </div>
        
        </>
    
           
        
    )
}