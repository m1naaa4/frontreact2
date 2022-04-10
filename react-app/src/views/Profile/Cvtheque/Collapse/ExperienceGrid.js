import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';
import { CvdeleteAction, CvUpdateAction } from '../../../../store/actions/Profile/UserActions';
import DropType from '../../../../utils/DropType';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import sectors from "../../../../data/sectors"
import { useTranslation } from 'react-i18next';


const  ExperienceGrid = ({experience}) => {
  const { t } = useTranslation();
  const [datedebut, setDatedebut] = useState(new Date(experience.datedebut));
  const [datefin, setDatefin] = useState(new Date(experience.datefin));
  const dataCategory = [
    ['','filter.secteur'],
    ['agroalimentaire','filter.secteur.agroalimentaire'],
    ['architecture','filter.secteur.architecture'],
    ['art','filter.secteur.art'],
    ['big_data','filter.secteur.big_data'],
    ['bio','filter.secteur.bio'],
    ['btp','filter.secteur.btp']
  ]

  const dispatch = useDispatch();
  const [formData, setForm] = useForm({present:experience.present, post:experience.post, sector:experience.sector, entreprise:experience.entreprise,lieu:experience.lieu, description:experience.description});

  const params = useParams();
  const user = useSelector(state => state.userProfile.userProfile);
  const [action, setAction] = useState(false);

  useEffect(() => {
    if (user?.profile_id) {
      user?.profile_id === params.id ? setAction(true) : setAction(false);
    }
  })

  const data = {
      experiences : {
        datedebut : datedebut,
        datefin :datefin,
        present : formData.present,
        entreprise : formData.entreprise,
        sector : formData.sector,
        lieu : formData.lieu,
        post : formData.post,
        description : formData.description,
        index : experience.index,
    }
  }

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const UpdateExperience =(id) =>{
    dispatch(CvUpdateAction(data, '', ''));
  }

  const deleteStudy =() =>{
    let data = {
      experiences : {index : experience.index}
        }
    dispatch(CvdeleteAction(data, '', ''));
  }

    return (    
      <>
        <li className="Section-Item">
          <label>{moment(experience.datedebut).format('MMMM y')} - {experience.present ? 'Present' : moment(experience.datefin).format('MMMM y')}
          </label>
          <span>{experience.post}- {experience.lieu}</span>
            {
              action &&
              <div className="Contact">
              <div className="Add-Contact Invitation-Options">
                    <button type="button" name="button" onClick={handleShow} className="Invitation-Option_Confirm"><i className="uil uil-pen"></i></button>
                    <button type="button" name="button" onClick={deleteStudy} className="Invitation-Option_Delete"><i className="uil uil-times"></i></button>
                </div>
                {/* <button type="button" onClick={handleShow} className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
                <button type="button" style={{marginLeft:'10px'}} className=" Profile-Skills delete-skill" onClick={ deleteStudy}><i className="uil uil-trash"></i></button> */}
              </div>
            }
          
          <div className="CollapsUpdate" style={{display:show?'block':'none'}}>
            <form className="" action="index.html" method="post">
              <div className="form-inputs">
                <div className="form-row">
                  <div className="col-md-6 input-row">
                    <ReactDatePicker className="wizard-required" selected={datedebut}  onChange={(date) => setDatedebut(date)} />
                  </div>
                  <div className="col-md-6 input-row input-flex">
                    <ReactDatePicker className="wizard-required" selected={datefin}   onChange={(date) => setDatefin(date)} />
                    <label className="container-checkbox">
                    <input type="checkbox" defaultChecked={formData.present}/>
                      <span className="checkmark"></span>
                      <span>Présent</span>
                    </label>
                  </div>
                  <div className="col-md-12 input-row">
                    <input type="text" name="entreprise" defaultValue={formData.entreprise} placeholder="entreprise" className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-12 input-row">
                    <input type="text" name="post" defaultValue={formData.post} placeholder="Poste" className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-6 input-row">
                    <input type="text" name="lieu" defaultValue={formData.lieu} placeholder="Lieu" className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-6 input-row input-select input-select-multi">
                    <select className="user-type" name='sector' defaultValue={formData.sector} onChange={setForm}>
                        {sectors.map((item, key) => (
                            <option key={key} value={item.value}>{t(item.label)}</option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-12 input-row">
                    <textarea name="description" placeholder="Description " defaultValue={formData.description} onChange={setForm}></textarea>
                  </div>
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                </div>
                <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                  <button type="button" className="DadupaModal-BTNSubmit" onClick={UpdateExperience}>Update</button>
                </div>
              </div>
            </form>
          </div>
        </li>
      </>
    )
}
export default ExperienceGrid;
