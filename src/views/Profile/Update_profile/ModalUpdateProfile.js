import React, { useEffect, useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';
import SectorDropFilter from '../../User/Fields/Filter/Project/SectorDropFilter'
import TypeDrop from '../../User/Fields/Signup/TypeDrop'



const  ModalUpdateProfile = () => {

    const infoprofile = useSelector(state => state.infoProfile);
    const user = useSelector(state => state.userProfile.userProfile);
    const dispatch = useDispatch();
    const [formData, setForm] = useForm({sector_id:infoprofile.infoprofile.sector, 
      type:infoprofile.infoprofile.email, email:infoprofile.infoprofile.email, phone:infoprofile.infoprofile.phone,
       networks:infoprofile.infoprofile.networks, bio:infoprofile.infoprofile.about});

  const EditProfile =(id) =>{
    console.log(id)
    //dispatch(EditProfileAction(data, '', 'delete'));
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
                  <input type="email" name="email" defaultValue={formData.email} onChange={setForm} placeholder="Email" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="tel" name="phone" defaultValue={formData.phone} onChange={setForm} placeholder="Téléphone" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="email" name="network" defaultValue={formData.networks} onChange={setForm} placeholder="Facebook" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="tel" name="network" defaultValue={formData.networks} onChange={setForm} placeholder="Twitter" className="wizard-required" required/>
                </div>
                <div className="col-md-12 input-row">
                  <textarea name="about" placeholder="Bio" defaultValue={formData.bio} onChange={setForm}></textarea>
                </div>
              </div>
            </div>
            <button type="button"  className="DadupaModal-BTNSubmit">Update</button>
          </form>
        </div>
      
    )
}
export default ModalUpdateProfile;
