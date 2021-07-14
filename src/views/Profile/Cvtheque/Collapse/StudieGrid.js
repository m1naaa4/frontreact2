import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DropType from '../../../../utils/DropType';
import { CvUpdateAction } from '../../../../store/actions/Profile/UserActions';
import moment from 'moment';


const  StudieGrid = ({study}) => {

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

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const UpdateStudies =(id) =>{
    dispatch(CvUpdateAction(data, '', ''));
  }
    return (    
      <>
        <li className="Section-Item">
                    <label>{moment(study.datefin).format('y')} - {study.diplome}</label>
                    <span>{study.lieu}</span>
                    <button type="button" onClick={handleShow} className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
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
                              <DropType datas={dataCategory} field='sector' defaultValue={formData.sector} onChange={setForm}/>
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
