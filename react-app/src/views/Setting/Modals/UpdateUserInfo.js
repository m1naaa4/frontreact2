import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { UserInfoAction } from '../../../store/actions/Profile/UserActions';
import ZoneDropProfileFilter from '../../User/Fields/Filter/ZoneDropProfileFilter';



const UpdateUserInfo = ({ showInfo, handleCloseInfo, user }) => {
    const dispatch = useDispatch();

    const [birthday, setBirthday] = useState(new Date());

    const [formData, setForm] = useForm({ first_name: user.firstname, last_name: user.lastname, identifiant: user.profile.username, country: user.profile.country, phone: user.profile.phone, city: user.profile.city });

    useEffect(() => {
        if (user.profile.birthday != '' && user.profile.birthday != undefined) {
            setBirthday(new Date(user.profile.birthday))
        }
    }, [])

    const data = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        identifiant: formData.identifiant,
        country: formData.country,
        birthday: birthday,
        city: formData.city,
        phone: formData.phone,
    }
    const updateInfo = (id) => {
        dispatch(UserInfoAction(data, '', ''));
    }

    const updateFormData = (updatedData) => {
        formData.country = updatedData;
    }

    return (
        <>
            {
                showInfo &&
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-inputs">
                                <div className="User-Settings-Header">
                                    <h3 className="Profile-Section-Title"><i className="uil uil-chat-bubble-user"></i> Updating Mon compte</h3>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6 input-row">
                                        <input type="text" name="first_name" defaultValue={formData.first_name} onChange={setForm} placeholder="Nom" className="wizard-required" required />
                                    </div>
                                    <div className="col-md-6 input-row">
                                        <input type="text" name="last_name" defaultValue={formData.last_name} onChange={setForm} placeholder="Prénom" className="wizard-required" required />
                                    </div>
                                    <div className="col-md-12 input-row">
                                        <input type="text" name="identifiant" defaultValue={formData.identifiant} onChange={setForm} placeholder="Identifiant unique" className="wizard-required" required />
                                    </div>

                                    <div className="col-md-12 input-row">
                                        <input type="text" name="phone" defaultValue={formData.phone} onChange={setForm} placeholder="Phone" className="wizard-required" required />
                                    </div>

                                    <div className="col-md-12 input-row">
                                        <div id="datepicker" className="date" data-date-format="dd-mm-yyyy">
                                            <ReactDatePicker className="wizard-required" selected={birthday} onChange={(date) => setBirthday(date)} />
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                                        </div>
                                    </div>
                                    <div className="col-md-12 input-row">
                                        <ZoneDropProfileFilter formData={formData} updateFormData={updateFormData} required />
                                    </div>

                                    <div className="col-md-12 input-row">
                                        <input type="text" name="city" defaultValue={formData.city} onChange={setForm} placeholder="City" className="wizard-required" required />
                                    </div>

                                    <div className="DadupaModal-Footer w-100">
                                        <button type="submit" className="DadupaModal-BTNSubmit" name="submit" onClick={() => { updateInfo(); handleCloseInfo() }}>Update</button>
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
