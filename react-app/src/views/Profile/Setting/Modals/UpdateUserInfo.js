import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { UserInfoAction } from '../../../../store/actions/Profile/UserActions';
import ZoneDropFilter from '../../../User/Fields/Filter/Project/ZoneDropFilter';



const  UpdateUserInfo = ({ showInfo, handleCloseInfo, profile}) => {
    const dispatch = useDispatch();

    const [birthday, setBirthday] = useState(new Date(profile.birthday));

    const [formData, setForm] = useForm({first_name:profile.username, last_name:profile.username, identifiant:profile.identifiant, country:profile.country, phone:profile.phone, city:profile.city});

    const data = {
        first_name : formData.first_name,
        last_name : formData.last_name,
        identifiant : formData.identifiant,
        country : formData.country,
        birthday : birthday,
        city : formData.city,
        phone : formData.phone,
    }

    const updateInfo =(id) =>{
        dispatch(UserInfoAction(data, '', ''));
      }
    
    return (  
      <>
      {
     showInfo &&
        <div className="ModalUpdate-Content modal-content">
          <div className="User-Settings">
            <div className="form-inputs">
                <div className="User-Settings-Header">
                <h3>Updating Mon compte</h3>
                </div>
                <div className="form-row">
                <div className="col-md-6 input-row">
                    <input type="text" name="first_name" defaultValue={formData.first_name} onChange={setForm} placeholder="Nom" className="wizard-required" required />
                </div>
                <div className="col-md-6 input-row">
                    <input type="text" name="last_name" defaultValue={formData.last_name} onChange={setForm} placeholder="Prénom" className="wizard-required" required />
                </div>
                <div className="col-md-12 input-row">
                    <input type="text" name="identifiant" defaultValue={formData.identifiant} onChange={setForm}  placeholder="Identifiant unique" className="wizard-required" required />
                </div>

                <div className="col-md-12 input-row">
                    <input type="text" name="phone" defaultValue={formData.phone} onChange={setForm}  placeholder="Phone" className="wizard-required" required />
                </div>

                <div className="col-md-12 input-row">
                    <div id="datepicker" className="date" data-date-format="dd-mm-yyyy">
                        <ReactDatePicker className="wizard-required" selected={birthday} onChange={(date) => setBirthday(date)} />
                        <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                    </div>
                </div>
                <div className="col-md-12 input-row">
                    <ZoneDropFilter field='country' placeholder="Pays" defaultValue={formData.country} onChange={setForm} required/>
                </div>

                <div className="col-md-12 input-row">
                    <input type="text" name="city" defaultValue={formData.city} onChange={setForm}  placeholder="City" className="wizard-required" required />
                </div>

                <div className="User-Settings-Footer">
                    <button type="submit" className="DadupaModal-BTNSubmit" name="submit" onClick={() => {updateInfo(); handleCloseInfo()}}>Update</button>
                </div>
                </div>
            </div>
          </div>
        </div>
      }
      </>
    )
}
export default UpdateUserInfo;
