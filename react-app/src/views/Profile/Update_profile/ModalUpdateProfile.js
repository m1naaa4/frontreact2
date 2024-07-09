import React, { useState } from 'react'
import { useForm } from "react-hooks-helper";
import { Tab } from 'react-bootstrap';
import { Tabs } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { EditProfileAction } from '../../../store/actions/Profile/UserActions';
import SelectSector from '../../../utils/SelectSector';
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
      formData.country = country?.value ? country?.value : formData.country;
      formData.sector_id = sector?.value ? sector?.value : formData.sector_id;
      formData.type = typeuser?.value ? typeuser?.value : formData.type;
      dispatch(EditProfileAction(formData, '', ''));
    }

    const SelectStyleWithScrollbar = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#e8fbf1" : "white",
        color: "black",
        textAlign: 'center',
        "&:hover":{
          backgroundColor: "#e8fbf1",
        },
      //   '&:nth-child(1) ': {
      //     marginTop: '0px',
      //     borderTopLeftRadius: '30px',
      //     borderTopRightRadius: '20px',
      // },
      '&:last-child ': {
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
      }}),
      
      menu: (provided) => ({
        ...provided,
        borderRadius: "15px",
        overflow: 'hidden',
        border: '0.5px solid #00b602',
      }),

      menuList: (provided, state) => ({
      ...provided,
      // border: '1px solid green',
      borderRadius: "15px",
      padding: '0',
      "&::-webkit-scrollbar": {
        width: "5px",
        
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
        boxShadow: state.isFocused ? "0px 1px 15px -3px #00b60 ":"0px 0px 20px 0px #e7e7e7",
        borderRadius: '15px',
          border: '1px solid #F5F5F5',
          height: '50px',
          fontSize: '12px',
          "&:hover":{
            boxShadow: "none",
          },
        }),
        valueContainer:(base) => ({
          ...base,
          height: '50px',
          padding: '2px 15px',
        })
    }
    
    return (        
      <>
        {
        show &&
        <div className="modal-body">
          <form className=""  method="post">
          <Tabs
            defaultActiveKey="general-infos"
            id="uncontrolled-tab-example"
            className="dadupa-tabs"
          >
            <Tab eventKey="general-infos" title="General Informations">
             
              <div className="form-inputs">
                <div className="form-row">
                  <div className="col-md-6 input-row input-select input-select-multi">
                    {/* <TypeDrop className="project-status"   defaultValue={formData.type} onChange={setForm}/> */}
                    <SelectTypeuser {...{ setTypeuser }} defaultValue={formData.type} datas={typeusers} SelectStyleWithScroll={SelectStyleWithScrollbar}/>
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
                </div>
              </div>
            </Tab>

            <Tab eventKey="social-media" title="Social Media">
              <div className="form-inputs">
                <div className="form-row">

                  <div className="col-md-12 input-row">
                    <div className="Profile-Infos-Items social-media-fields">
                      <ul>
                        <li>
                          <div className="form-row">
                            <div className='social-media-profile'>
                              <i className="uil uil-facebook-f"></i>
                              <input type="url" name="facebook" onChange={setForm} defaultValue={formData.facebook}  placeholder="Insert Facebook URL here" className="wizard-required" required/>
                            </div>                          
                          </div>
                        </li>
                        <li>
                          <div className="form-row">
                            <div className='social-media-profile'>
                              <i className="uil uil-twitter-alt"></i>
                              <input type="url" name="twitter" onChange={setForm} defaultValue={formData.twitter}  placeholder="Insert Twitter URL here" className="wizard-required" required/>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="form-row">
                            <div className='social-media-profile'>
                              <i className="uil uil-linkedin-alt"></i>
                              <input type="url" name="linkedin" onChange={setForm} defaultValue={formData.linkedin}  placeholder="Insert Linkedin URL here" className="wizard-required" required/>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="form-row">
                            <div className='social-media-profile'>
                              <i className="uil uil-instagram-alt"></i>
                              <input type="url" name="instagram" onChange={setForm} defaultValue={formData.instagram}  placeholder="Insert Instagram URL here" className="wizard-required" required/>
                            </div>
                          </div>

                        </li>
                        <li>
                          <div className="form-row">
                            <div className='social-media-profile'>
                              <i className="uil-youtube"></i>
                              <input type="url" name="youtube" onChange={setForm} defaultValue={formData.youtube}  placeholder="Insert Youtube URL here" className="wizard-required" required/>
                            </div>
                          </div>
                        </li>
                      </ul>    
                    </div>
                  </div>
                  
                </div>
              </div>
            </Tab>

            <Tab eventKey="biography" title="Biography">
              <div className="form-inputs">
                <div className="form-row">
                  <div className="col-md-12 input-row">
                    <textarea name="bio" placeholder="Bio" defaultValue={formData.bio} onChange={setForm}></textarea>
                  </div>
                </div>
              </div>
            </Tab>

          </Tabs>





            
            <div className="DadupaModal-Footer">
              <div className="w-100">
                <button type="button" onClick={() => {EditProfile(); handleClose()}}  className="DadupaModal-BTNSubmit">Update</button>
              </div>
            </div>
          </form>
        </div>
       }
      </>
    )
}
export default ModalUpdateProfile;
