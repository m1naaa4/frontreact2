import React from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';
import { EditProfileAction } from '../../../store/actions/Profile/UserActions';
import SectorDropFilter from '../../User/Fields/Filter/Project/SectorDropFilter'
import TypeDrop from '../../User/Fields/Signup/TypeDrop'



const  ModalUpdateProfile = ({ show, handleClose}) => {

    const infoprofile = useSelector(state => state.infoProfile);
    const dispatch = useDispatch();
    const [formData, setForm] = useForm({id:infoprofile.infoprofile.id, job:infoprofile.infoprofile.job, sector_id:infoprofile.infoprofile.sector, 
      type:infoprofile.infoprofile.email, email:infoprofile.infoprofile.email, phone:infoprofile.infoprofile.phone,
       
      facebook:infoprofile.infoprofile.networks?.facebook,
      twitter:infoprofile.infoprofile.networks?.twitter,
      linkedin:infoprofile.infoprofile.networks?.linkedin,
      instagram:infoprofile.infoprofile.networks?.instagram,
      youtube:infoprofile.infoprofile.networks?.youtube,
       
      bio:infoprofile.infoprofile.about});
    const EditProfile =(id) =>{
      dispatch(EditProfileAction(formData, '', ''));
    }

    return (        
      <>
        {
        show &&
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
                <div className="col-md-12 input-row">
                  <div class="Profile-Info Profile-Infos-Items">
                    <ul>
                      <li>
                        <div className="form-row">
                          <div className="col-md-2"><i className="uil uil-facebook-f"></i></div>
                          <div className="col-md-8"><input type="url" name="facebook" onChange={setForm} defaultValue={formData.facebook}  placeholder="Facebook" className="wizard-required" required/></div>
                        </div>
                      </li>
                      <li>
                        <div className="form-row">
                          <div className="col-md-2"><i className="uil uil-twitter-alt"></i></div>
                          <div className="col-md-8"><input type="url" name="twitter" onChange={setForm} defaultValue={formData.twitter}  placeholder="Twitter" className="wizard-required" required/></div>
                        </div>
                      </li>
                      <li>
                        <div className="form-row">
                          <div className="col-md-2"><i className="uil uil-linkedin-alt"></i></div>
                          <div className="col-md-8"><input type="url" name="linkedin" onChange={setForm} defaultValue={formData.linkedin}  placeholder="Linkedin" className="wizard-required" required/></div>
                        </div>
                      </li>
                      <li>
                        <div className="form-row">
                          <div className="col-md-2"><i className="uil uil-instagram-alt"></i></div>
                          <div className="col-md-8"><input type="url" name="instagram" onChange={setForm} defaultValue={formData.instagram}  placeholder="Instagram" className="wizard-required" required/></div>
                        </div>
                      </li>
                      <li>
                        <div className="form-row">
                          <div className="col-md-2"><i className="uil-youtube"></i></div>
                          <div className="col-md-8"><input type="url" name="youtube" onChange={setForm} defaultValue={formData.youtube}  placeholder="Youtube" className="wizard-required" required/></div>
                        </div>
                      </li>
                    </ul>    
                  </div>
                </div>
                <div className="col-md-12 input-row">
                  <textarea name="bio" placeholder="Bio" defaultValue={formData.bio} onChange={setForm}></textarea>
                </div>
              </div>
            </div>
            <button type="button" onClick={() => {EditProfile(); handleClose()}}  className="DadupaModal-BTNSubmit">Update</button>
          </form>
        </div>
       }
      </>
    )
}
export default ModalUpdateProfile;
