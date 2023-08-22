import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';

import { Modal } from 'react-bootstrap';
import UpdateAccess from './Modals/UpdateAccess';
import UpdateUserInfo from './Modals/UpdateUserInfo';
import LanguageSelectorView from '../Fields/Language/LanguageSelectorView';
import { ConfirmationAction, LanguageAction } from '../../store/actions/Profile/UserActions';
import countries from '../../data/countries';



export default function SideRightSettingView(props) { 
    const infoprofile = useSelector(state => state.userProfile.userProfile);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [country, setCountry] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);

    let languageStoredInLocalStorage = localStorage.getItem("language");
    let [language, setLangue] = useState(
        languageStoredInLocalStorage ? languageStoredInLocalStorage : "en"
    );

    const updateInfo =(id) =>{
        let data = {
            language : language
        }
        dispatch(LanguageAction(data, '', ''));
    }
    
    const sendconfirm =(id) =>{
        dispatch(ConfirmationAction({}, '', ''));
    }

    useEffect(() => {
      countries.map((key) => 
        {if (key.value === infoprofile?.profile?.country) {
          setCountry(key.label)
        }}
      );
    })

    return (
        <>  
            {
            infoprofile.profile !== "" && infoprofile.profile !== undefined ?                
            <div className="col-md-12 ">
              <div className="row">
                <div className="col-lg-12">
                  <div className="User-Settings">
                    <div className="form-inputs">

                      <div className="User-Settings-Header">
                        <h3>Mon compte</h3>
                        <button type="button" className="UpdateInfos-BTN" onClick={handleShowInfo} data-toggle="modal" data-target="#SkillsModal"><i className="uil uil-pen"></i></button>
                      </div>
                        <Modal show={showInfo} onHide={handleCloseInfo} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <UpdateUserInfo showInfo={showInfo} handleCloseInfo={handleCloseInfo} user={infoprofile}/>
                        </Modal>
                      <div className="form-row">
                        <div className="col-md-6 input-row">
                          <input type="text" name="project-name" value={infoprofile.firstname} placeholder="first name" className="wizard-required" readOnly />
                        </div>
                        <div className="col-md-6 input-row">
                          <input type="text" name="project-name" value={infoprofile.lastname} placeholder="last name" className="wizard-required" readOnly />
                        </div>
                        <div className="col-md-6 input-row">
                          <input type="text" name="project-name" value={infoprofile.profile.username} placeholder="pseudo" className="wizard-required" readOnly />
                        </div>

                        <div className="col-md-6 input-row">
                          <input type="text" name="project-areas" value={infoprofile.profile.birthday} placeholder="Birthday" className="wizard-required" readOnly />
                        </div>
                        <div className="col-md-12 input-row">
                          <input type="text" name="project-areas" defaultValue={country} placeholder="Country" className="wizard-required" readOnly/>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
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
                          <input type="text" name="project-name" value={infoprofile.email} placeholder="your email" className="wizard-required" readOnly />
                        </div>
                        <div className="col-md-12 input-row">
                          <input type="password" name="project-name" value="" placeholder="Mon mot de passe" value="Mon mot de passe" className="wizard-required" readOnly />
                        </div>
                        {!infoprofile.email_verified_at  && <div className="col-md-12 confirmation-message">
                            <div className="confirmation-message-text">
                              <p>{infoprofile.email_verification_sent ? 'Votre email n’est pas confirmé' : "Renvoyer l'email de confirmation " }</p>
                            </div>
                            <div className="confirmation-message-action">
                              <button type="button" onClick={sendconfirm} name="button">Confirmer</button>
                            </div>
                          </div>
                        }
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="User-Settings">
                <div className="form-inputs">

                  <div className="User-Settings-Header">
                    <h3>Interface</h3>
                    <button type="button" className="UpdateInfos-BTN UpdateInfos-BTNText" onClick={updateInfo}>Update</button>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 input-row input-select">
                        <LanguageSelectorView onChange={setLangue} language={language} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
        :
        infoprofile.success === false ?
        infoprofile.message: <span/>
        }
        </>
    
           
        
    )
}