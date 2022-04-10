import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';
import DropType from '../../../../utils/DropType';
import { CvdeleteAction, CvUpdateAction } from '../../../../store/actions/Profile/UserActions';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import sectors from "../../../../data/sectors"
import { useTranslation } from 'react-i18next';

const  StudieGrid = ({study}) => {
  const { t } = useTranslation();
  const [datedebut, setDatedebut] = useState(new Date(study.datedebut));
  const [datefin, setDatefin] = useState(new Date(study.datefin));
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
  const [formData, setForm] = useForm({present:study.present, etablissement:study.etablissement, sector:study.sector,lieu:study.lieu, diplome:study.diplome, description:study.description});

  const data = {
      studies : {
        datedebut : datedebut,
        datefin :datefin,
        present : formData.present,
        etablissement : formData.etablissement,
        sector : formData.sector,
        lieu : formData.lieu,
        diplome : formData.diplome,
        description : formData.description,
        index : study.index,
    }
  }
  const user = useSelector(state => state.userProfile.userProfile);
  const [action, setAction] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const params = useParams();

  useEffect(() => {
    if (user?.profile_id) {
      user?.profile_id === params.id ? setAction(true) : setAction(false);
    }
  })

  const UpdateStudies =(id) =>{
    dispatch(CvUpdateAction(data, '', ''));
  }

  const deleteStudy =() =>{
    let data = {
      studies : {index : study.index}
        }
    dispatch(CvdeleteAction(data, '', ''));
  }
    return (    
      <>
        <li className="Section-Item">
                    <label>{moment(study.datefin).format('y')} - {study.diplome}</label>
                    <span>{study.lieu}</span>
                    <div>
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
                      
                    {/* <li className="Profile-Skills">
                      
                    </li> */}
                    </div>
                    
                    
                    
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
                              <input type="text" name="project-areas" defaultValue={formData.etablissement} placeholder="Établissement" onChange={setForm} className="wizard-required" required/>
                            </div>
                            <div className="col-md-12 input-row">
                              <input type="text" name="lieu" defaultValue={formData.lieu} placeholder="Lieu" className="wizard-required" onChange={setForm} required/>
                            </div>
                            <div className="col-md-6 input-row">
                              <input type="text" name="diplome" defaultValue={formData.diplome} placeholder="Diplôme obtenu" className="wizard-required" onChange={setForm} required/>
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
                            <button type="button" className="DadupaModal-BTNSubmit" onClick={UpdateStudies}>Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
      </>
    )
}
export default StudieGrid;
