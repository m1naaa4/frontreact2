import React from 'react'
import { useSelector } from 'react-redux';
import SectorDropFilter from '../../User/Fields/Filter/Project/SectorDropFilter'
import TypeDrop from '../../User/Fields/Signup/TypeDrop'



export default function ModalUpdateProfile() {

    const infoprofile = useSelector(state => state.infoProfile);
    const newavatar = useSelector(state => state.updateavatar);
    const user = useSelector(state => state.userProfile.userProfile);

  useEffect(() => {        
    if (infoprofile.infoprofile.avatar !== undefined &&  newavatar.avatar !== undefined) {  
      setAvatar(newavatar.avatar);                
      setUserVisiterAvatar(user.user.profile.avatar_link);
    }     
  })

    return (        
      
        <div className="modal-body">
          <form className="" action="index.html" method="post">
            <div className="form-inputs">
              <div className="form-row">
                <div className="col-md-6 input-row input-select input-select-multi">
                  <TypeDrop className="project-status"  name="type" value={user.type} onChange={setForm}/>
                </div>
                <div className="col-md-6 input-row input-select input-select-multi">
                  <SectorDropFilter value={user.sector_id} onChange={setForm} />
                </div>
                <div className="col-md-6 input-row">
                  <input type="email" name="" defaultValue="" placeholder="Email" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="tel" name="" defaultValue="" placeholder="Téléphone" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="email" name="" defaultValue="" placeholder="Facebook" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="tel" name="" defaultValue="" placeholder="Twitter" className="wizard-required" required/>
                </div>
                <div className="col-md-12 input-row">
                  <textarea name="name" placeholder="Bio"></textarea>
                </div>
              </div>
            </div>
            <button type="button" className="DadupaModal-BTNSubmit">Update</button>
          </form>
        </div>
      
    )
}
