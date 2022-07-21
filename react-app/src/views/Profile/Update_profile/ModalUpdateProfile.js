import React, { useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';
import { EditProfileAction } from '../../../store/actions/Profile/UserActions';
import SelectSector from '../../../utils/SelectSector';
import SectorDropFilter from '../../User/Fields/Filter/Project/SectorDropFilter'
import TypeDrop from '../../User/Fields/Signup/TypeDrop'
import countries from '../../../data/countries';
import typeusers from '../../../data/typeusers';
import sectors from '../../../data/sectors';
import SelectCountry from '../../../utils/SelectCountry';
import SelectTypeuser from '../../../utils/SelectTypeuser';
import { useTranslation } from 'react-i18next';



const  ModalUpdateProfile = ({ show, handleClose}) => {

    const { t } = useTranslation();
    const infoprofile = useSelector(state => state.infoProfile);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const dispatch = useDispatch();
    const [sector, setSector] = useState();
    const [country, setCountry] = useState();
    const [typeuser, setTypeuser] = useState();

    const [formData, setForm] = useForm({id:infoprofile.infoprofile.id, job:infoprofile.infoprofile.job, sector_id:infoprofile.infoprofile.sector, 
      type:userProfile.type, email:infoprofile.infoprofile.email, phone:infoprofile.infoprofile.phone,
      look_angel:infoprofile.infoprofile.look_angel, look_mentor:infoprofile.infoprofile.look_mentor,
      address:infoprofile.infoprofile.address,
      facebook:infoprofile.infoprofile.networks?.facebook,
      twitter:infoprofile.infoprofile.networks?.twitter,
      linkedin:infoprofile.infoprofile.networks?.linkedin,
      instagram:infoprofile.infoprofile.networks?.instagram,
      youtube:infoprofile.infoprofile.networks?.youtube,
      country:infoprofile.infoprofile.country,
       
      bio:infoprofile.infoprofile.about});
    const EditProfile =(id) =>{
      console.log(country, sector, typeuser)
      formData.country = country?.value ? country?.value : formData.country;
      formData.sector_id = sector?.value ? sector?.value : formData.sector_id;
      formData.type = typeuser?.value ? typeuser?.value : formData.type;
      dispatch(EditProfileAction(formData, '', ''));
    }

    const SelectWithoutScrollbar = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#12e313" : "white",
        textAlign: 'center',
        "&:hover":{
          backgroundColor: "#9dfc9d",
        },
        '&:nth-child(1) ': {
          marginTop: '0px',
          borderTopLeftRadius: '29px',
          borderTopRightRadius: '29px',
      },
      '&:last-child ': {
        borderBottomLeftRadius: '29px',
        borderBottomRightRadius: '29px',
      }}),
      menuList: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      padding: '0',
    
      }),
      control: (base, state) => ({
        ...base,
        boxShadow: state.isFocused ? "0px 0px 3px 0px green ":"none ",
        "&:hover":{
          boxShadow: "none",
        },
      }),
    }

    const SelectStyleWithScrollbar = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#12e313" : "white",
        textAlign: 'center',
        "&:hover":{
          backgroundColor: "#9dfc9d",
        },
        '&:nth-child(1) ': {
          marginTop: '0px',
          borderTopLeftRadius: '30px',
          borderTopRightRadius: '20px',
      },
      '&:last-child ': {
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '20px',
      }}),
      
      menuList: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderRadius: "30px",
      padding: '0',
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        background: "#888",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555"
      }
    
    
      }),
      control: (base, state) => ({
        ...base,
        boxShadow: state.isFocused ? "0px 0px 3px 0px green ":"none ",
        "&:hover":{
          boxShadow: "none",
        },
      }),
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
                  {/* <TypeDrop className="project-status"   defaultValue={formData.type} onChange={setForm}/> */}
                  <SelectTypeuser {...{ setTypeuser }} defaultValue={formData.type} datas={typeusers} SelectWithoutScroll={SelectWithoutScrollbar}/>
                </div>
                <div className="col-md-6 input-row input-select input-select-multi">
                  {/* <SectorDropFilter defaultValue={formData.sector_id} onChange={setForm} /> */}
                  <SelectSector {...{ setSector }} defaultValue={formData.sector_id} datas={sectors} SelectStyleWithScroll={SelectStyleWithScrollbar}/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="text" name="job" defaultValue={formData.job} onChange={setForm} placeholder="job" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="tel" name="phone" defaultValue={formData.phone} onChange={setForm} placeholder="Phone" className="wizard-required" required/>
                </div>
                <div className="col-md-6 input-row">
                  <SelectCountry {...{ setCountry }} defaultValue={formData.country} datas={countries} SelectStyleWithScroll={SelectStyleWithScrollbar}/>
                </div>
                <div className="col-md-6 input-row">
                  <input type="text" name="address" defaultValue={formData.address} onChange={setForm} placeholder="Residence" className="wizard-required" required/>
                </div>

                <div className="col-md-6 input-row">
                    <div className="custom-control custom-switch">
                        <input type="checkbox" defaultChecked={formData.look_angel} onChange={setForm}   className="custom-control-input" id="switch1"
                                name="look_angel"/>
                        <label className="custom-control-label" htmlFor="switch1"><span>{t('form.want_funder')}</span></label>
                    </div>
                </div>
                <div className="col-md-6 input-row">
                    <div className="custom-control custom-switch">
                        <input type="checkbox" defaultChecked={formData.look_mentor}  onChange={setForm}   className="custom-control-input" id="switch2"
                                name="look_mentor"/>
                        <label className="custom-control-label" htmlFor="switch2"><span>{t('form.want_mentors')}</span></label>
                    </div>
                </div>

                <div className="col-md-12 input-row">
                  <div className="Profile-Info Profile-Infos-Items">
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
