import React, { useEffect, useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';
import { EditProfileAction } from '../../../store/actions/Profile/UserActions';
import SectorDropFilter from '../../User/Fields/Filter/Project/SectorDropFilter'
import TypeDrop from '../../User/Fields/Signup/TypeDrop'



const  ModalUpdateProfile = () => {

    const infoprofile = useSelector(state => state.infoProfile);
    const dispatch = useDispatch();
    const [formData, setForm] = useForm({id:infoprofile.infoprofile.id, job:infoprofile.infoprofile.job, sector_id:infoprofile.infoprofile.sector, 
      type:infoprofile.infoprofile.email, email:infoprofile.infoprofile.email, phone:infoprofile.infoprofile.phone,
       networks:infoprofile.infoprofile.networks, bio:infoprofile.infoprofile.about});

  const EditProfile =(id) =>{
    dispatch(EditProfileAction(formData, '', ''));
  }

    return (        
      
        <div className="modal-body">
          <form className=""  method="post">
            <div className="form-inputs">
              <div className="form-row">
                <div className="col-md-6 input-row input-select input-select-multi">
                  <TypeDrop className="project-status"   defaultValue={formData.type} onChange={setForm}/>
                </div>
                <div className="col-md-6 input-row input-select input-select-multi">
                  <SectorDropFilter defaultValue={formData.sector_id} onChange={setForm} />
                </div>
                <div className="col-md-6 input-row">
                  <input type="email" name="job" defaultValue={formData.job} onChange={setForm} placeholder="job" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="tel" name="phone" defaultValue={formData.phone} onChange={setForm} placeholder="Téléphone" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="email" name="networks" defaultValue={formData.networks} onChange={setForm} placeholder="Facebook" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="tel" name="networks" defaultValue={formData.networks} onChange={setForm} placeholder="Twitter" className="wizard-required" required/>
                </div>
                <div className="col-md-12 input-row">
                  <textarea name="bio" placeholder="Bio" defaultValue={formData.bio} onChange={setForm}></textarea>
                </div>
              </div>
            </div>
            <button type="button" onClick={EditProfile}  className="DadupaModal-BTNSubmit">Update</button>
          </form>
        </div>
      
    )
}
export default ModalUpdateProfile;
