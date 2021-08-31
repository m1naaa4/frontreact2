import React, { useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { useFormFields } from '../../../../helpers/hooksFormInput';
import { AccessUserAction } from '../../../../store/actions/Profile/UserActions';



const  UpdateAccess = ({ show, handleClose}) => {
    const dispatch = useDispatch();

    const [passwordShown, setPasswordShown] = useState(false);
    const TogglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const [passwordShownnew, setPasswordShownnew] = useState(false);
    const TogglePasswordVisiblitynew = () => {
        setPasswordShownnew(passwordShownnew ? false : true);
    };

    const [formData, setForm] = useForm({email:'', password:'', newpassword:''});

    const updateAccess =(id) =>{
        console.log(formData)
        dispatch(AccessUserAction(formData, '', ''));
      }
    
    return (  
      <>
      {
     show &&
     
        <div class="ModalUpdate modal-dialog modal-dialog-centered" role="document">
        <div class="ModalUpdate-Content modal-content">
            <div className="User-Settings">
             <div className="form-inputs">
                
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
                            onChange={setForm} placeholder="Actuel mot de passe" className="wizard-required" required />
                            <span toggle="#password-field" onClick={TogglePasswordVisiblity}
                                                      className="uil uil-eye field-icon toggle-password"></span>
                </div>
                <div className="col-md-12 input-row">
                    <input name="newpassword" defaultValue="" type={passwordShownnew ? "text" : "password"}
                            onChange={setForm} placeholder="Nouveau mot de passe" className="wizard-required" required />
                            <span toggle="#password-field" onClick={TogglePasswordVisiblitynew}
                                                      className="uil uil-eye field-icon toggle-password"></span>
                </div>
                <div className="User-Settings-Footer">
                    <button type="submit" className="DadupaModal-BTNSubmit" name="submit" onClick={() => {updateAccess(); handleClose()}}>Update</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
      }
      </>
    )
}
export default UpdateAccess;
