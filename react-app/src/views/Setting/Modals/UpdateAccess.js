import React, { useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { AccessUserAction } from '../../../store/actions/Profile/UserActions';
import { useTranslation } from 'react-i18next';



const UpdateAccess = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const [passwordShown, setPasswordShown] = useState(false);
    const TogglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const [passwordShownnew, setPasswordShownnew] = useState(false);
    const TogglePasswordVisiblitynew = () => {
        setPasswordShownnew(passwordShownnew ? false : true);
    };

    const [formData, setForm] = useForm({ email: '', password: '', newpassword: '' });

    const updateAccesss = (id) => {
        dispatch(AccessUserAction(formData, '', ''));
    }

    return (
        <>
            {
                show &&
                <div className="modal-body">
                    <div className="form-inputs">
                        <div className="User-Settings-Header">
                            <h3 className="Profile-Section-Title"><i className="uil uil-keyhole-circle"></i> {t('passwordUpdate')}</h3>
                        </div>
                        <div className="form-row">

                            {/* <h4>Updating Email</h4>
                    <div className="col-md-12 input-row">
                        <input type="text" name="project-name" value="" placeholder="Actuel email" className="wizard-required" required />
                    </div>
                    <div className="col-md-12 input-row">
                        <input type="text" name="project-name" value="" placeholder="Nouveau email" className="wizard-required" required />
                    </div> */}
                            {/* <div className="col-md-12 input-row">
                        <input type="text" name="project-name" value="" placeholder="Confirmer nouvel email" className="wizard-required" required />
                    </div> */}

                            {/* <h4>Updating Password</h4> */}
                            <div className="col-md-12 input-row">
                                <input name="password" defaultValue="" type={passwordShown ? "text" : "password"}
                                    onChange={setForm} placeholder={t('password')} className="wizard-required" required />
                                <span toggle="#password-field" onClick={TogglePasswordVisiblity}
                                    className="uil uil-eye field-icon toggle-password"></span>
                            </div>
                            <div className="col-md-12 input-row">
                                <input name="newpassword" defaultValue="" type={passwordShownnew ? "text" : "password"}
                                    onChange={setForm} placeholder={t('password')} className="wizard-required" required />
                                <span toggle="#password-field" onClick={TogglePasswordVisiblitynew}
                                    className="uil uil-eye field-icon toggle-password"></span>
                            </div>
                            <div className="DadupaModal-Footer w-100">
                                <button type="submit" className="DadupaModal-BTNSubmit" name="submit" onClick={() => { updateAccesss(); handleClose() }}>{t('confirm')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default UpdateAccess;
