import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SectorDropFilter from '../../User/Fields/Filter/Project/SectorDropFilter'
import TypeDrop from '../../User/Fields/Signup/TypeDrop'



export default function ModalUpdateProfile() {

    const infoprofile = useSelector(state => state.infoProfile);
    const newavatar = useSelector(state => state.updateavatar);
    const user = useSelector(state => state.userProfile.userProfile);
    const dispatch = useDispatch();
    const [sector_id, setSectorId] = useState();
    const [type, setType]= useState();
    const [email, setEmail]= useState();
    const [phone, setPhone] = useState();
    const [networks, setNetworks]= useState();
    const [bio, setBio]= useState();

  

  useEffect(() => {        
    if (infoprofile.infoprofile.avatar !== undefined &&  newavatar.avatar !== undefined) {
      setSectorId(infoprofile.infoprofile.sector);  setType(infoprofile.infoprofile.type);  
      setEmail(infoprofile.infoprofile.email);  setPhone(infoprofile.infoprofile.phone);  
      setNetworks(infoprofile.infoprofile.networks);  setBio(infoprofile.infoprofile.about); 
    }     
  })

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
                  <TypeDrop className="project-status"   defaultValue={type} onChange={setType}/>
                </div>
                <div className="col-md-6 input-row input-select input-select-multi">
                  <SectorDropFilter defaultValue={sector_id} onChange={setSectorId} />
                </div>
                <div className="col-md-6 input-row">
                  <input type="email" name="email" defaultValue={email} onChange={setEmail} placeholder="Email" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="tel" name="phone" defaultValue={phone} onChange={setPhone} placeholder="Téléphone" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="email" name="network" defaultValue={networks} onChange={setNetworks} placeholder="Facebook" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="tel" name="network" defaultValue={networks} onChange={setNetworks} placeholder="Twitter" className="wizard-required" required/>
                </div>
                <div className="col-md-12 input-row">
                  <textarea name="about" placeholder="Bio" defaultValue={bio} onChange={setBio}></textarea>
                </div>
              </div>
            </div>
            <button type="button"  className="DadupaModal-BTNSubmit">Update</button>
          </form>
        </div>
      
    )
}
