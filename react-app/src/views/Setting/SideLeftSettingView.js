import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';

import { Modal } from 'react-bootstrap';
import UpdateAccess from './Modals/UpdateAccess';
import UpdateUserInfo from './Modals/UpdateUserInfo';
import LanguageSelectorView from '../Fields/Language/LanguageSelectorView';
import { ConfirmationAction, LanguageAction } from '../../store/actions/Profile/UserActions';
import countries from '../../data/countries';
import { useTranslation } from 'react-i18next';



export default function SideRightSettingView() { 
    const infoprofile = useSelector(state => state.userProfile.userProfile);
    const dispatch = useDispatch();
    const {t} = useTranslation();

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
                        <h3>{t('account')}</h3>
                        <button type="button" className="UpdateInfos-BTN" onClick={handleShowInfo} data-toggle="modal" data-target="#SkillsModal"><i className="uil uil-pen"></i></button>
                      </div>
                        <Modal show={showInfo} onHide={handleCloseInfo} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <UpdateUserInfo showInfo={showInfo} handleCloseInfo={handleCloseInfo} user={infoprofile}/>
                        </Modal>
                      <div className="form-row">
                        <div className="col-md-6 input-row">
                          <input type="text" name="firstName" value={infoprofile.firstname} placeholder={t('firstName')} className="wizard-required" readOnly disabled style={{border: 'none', background: 'transparent', color: 'black'}}/>
                        </div>
                        <div className="col-md-6 input-row">
                          <input type="text" name="lastName" value={infoprofile.lastname} placeholder={t('lastName')} className="wizard-required" readOnly disabled style={{border: 'none', background: 'transparent', color: 'black'}}/>
                        </div>
                        <div className="col-md-6 input-row">
                          <input type="text" name="username" value={infoprofile.profile.username} placeholder={t('username')} className="wizard-required" readOnly disabled style={{border: 'none', background: 'transparent', color: 'black'}}/>
                        </div>

                        <div className="col-md-6 input-row">
                          <input type="text" name="project-areas" value={infoprofile.profile.birthday} placeholder={t('firstName')} className="wizard-required" readOnly disabled style={{border: 'none', background: 'transparent', color: 'black'}}/>
                        </div>
                        <div className="col-md-12 input-row">
                          <input type="text" name="country" defaultValue={country} placeholder={t('country')} className="wizard-required" readOnly disabled style={{border: 'none', background: 'transparent', color: 'black'}} />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="User-Settings">
                    <div className="form-inputs">

                      <div className="User-Settings-Header">
                        <h3>{t('access')}</h3>
                        <button type="button" className="UpdateInfos-BTN" onClick={handleShow} data-toggle="modal" data-target="#SkillsModal"><i className="uil uil-pen"></i></button>
                      </div>

                    <Modal show={show} onHide={handleClose} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <UpdateAccess show={show} handleClose={handleClose}/>
                    </Modal>

                      <div className="form-row">
                        <div className="col-md-12 input-row">
                          <input type="text" name="email" value={infoprofile.email} placeholder={t('email')} className="wizard-required" readOnly disabled style={{border: 'none', background: 'transparent', color: 'black'}}/>
                        </div>
                        <div className="col-md-12 input-row">
                          <input type="password" name="password" value="" placeholder={t('password')}  className="wizard-required" readOnly disabled style={{border: 'none', background: 'transparent', color: 'black'}}/>
                        </div>
                        {!infoprofile.email_verified_at  && <div className="col-md-12 confirmation-message">
                            <div className="confirmation-message-text">
                              <p>{infoprofile.email_verification_sent ? t('email_not_confirmed') : t('emailConfirmation') }</p>
                            </div>
                            <div className="confirmation-message-action">
                              <button type="button" onClick={sendconfirm} name="button">{t('settingconfirm')}</button>
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
                    <h3>{t('interface')}</h3>
                    <button type="button" className="UpdateInfos-BTN UpdateInfos-BTNText" onClick={updateInfo}>{t('update')}</button>
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
