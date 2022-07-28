import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { CvAction } from '../../../../store/actions/Profile/UserActions';
import DropType from '../../../../utils/DropType';
import sectors from "../../../../data/sectors"
import { useTranslation } from 'react-i18next';


const  ExperienceModal = ({ showexperience, handleCloseExperience}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataCategory = [
      ['','filter.secteur'],
      ['agroalimentaire','filter.secteur.agroalimentaire'],
      ['architecture','filter.secteur.architecture'],
      ['art','filter.secteur.art'],
      ['big_data','filter.secteur.big_data'],
      ['bio','filter.secteur.bio'],
      ['btp','filter.secteur.btp']
  ]

  const [datedebut, setDatedebut] = useState(new Date());
  const [datefin, setDatefin] = useState(new Date());

  const [formData, setForm] = useForm({present:'', entreprise:'', sector:'', lieu:'', post:'', description:''});

  const data = {
      experiences : {
        datedebut : datedebut,
        datefin : datefin,
        present : formData.present,
        entreprise : formData.entreprise,
        sector : formData.sector,
        lieu : formData.lieu,
        post : formData.post,
        description : formData.description,
    }
  }

  const AddEperience =(id) =>{
    dispatch(CvAction(data, '', ''));
  }

    return (    
    <>
      {
      showexperience &&
        <div className="modal-body">
            <div className="" >
              <div className="form-inputs">
                <div className="form-row">
                  <div className="col-12 input-row">
                    <h3 className="Profile-Section-Title"><i className="uil uil-bag"></i> Experiences</h3>
                  </div>
                  <div className="col-md-5 input-row">
                    <label className='d-flex flex-column mb-0'>
                      <span className='mb-2'>Date de début</span>
                      <ReactDatePicker className="wizard-required" selected={datedebut} onChange={(date) => setDatedebut(date)} />
                    </label>
                  </div>
                  <div className="col-md-5 input-row mb-4">
                    <label className='d-flex flex-column mb-0'>
                      <span className='mb-2'>Date de fin</span>
                      <ReactDatePicker className="wizard-required" selected={datefin} onChange={(date) => setDatefin(date)} />
                    </label>
                  </div>
                  <div className="col-md-2 input-row mb-4">
                    <label className='d-flex flex-column mb-0'>
                      <span className='mb-2'>Présent</span>
                      <div className="custom-control custom-switch switch-present">
                          <input type="checkbox" onChange={setForm} className="custom-control-input" id="switch-present"
                            name="present" />
                          <label className="custom-control-label" htmlFor="switch-present"></label>
                        </div>
                      {/* <div>
                        <input type="checkbox" name="present" onChange={setForm} />
                        <span className="checkmark"></span>
                      </div> */}
                    </label>
                  </div>
                  <div className="col-md-6 input-row">
                    <label className='d-flex flex-column mb-0'>
                      <span className='mb-2'>Entreprise</span>
                      <input type="text" name="entreprise" defaultValue="" placeholder="Entreprise" className="wizard-required" onChange={setForm} required/>
                    </label>
                  </div>
                  <div className="col-md-6 input-row">
                    <label className='d-flex flex-column mb-0'>
                      <span className='mb-2'>Poste</span>
                      <input type="text" name="post" defaultValue="" placeholder="Poste" className="wizard-required" onChange={setForm} required/>
                    </label>
                  </div>
                  <div className="col-md-6 input-row">
                    <label className='d-flex flex-column mb-0'>
                      <span className='mb-2'>Lieu</span>
                      <input type="text" name="lieu" defaultValue="" placeholder="Lieu" className="wizard-required" onChange={setForm} required/>
                    </label>
                  </div>
                  <div className="col-md-6 input-row input-select input-select-multi">
                    <label className='d-flex flex-column mb-0'>
                      <span className='mb-2'>Secteur</span>
                      <select className="user-type" name='sector' defaultValue={formData.sector} onChange={setForm}>
                        {sectors.map((item, key) => (
                            <option key={key} value={item.value}>{t(item.label)}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="col-md-12 input-row">
                    <label className='d-flex flex-column mb-0'>
                      <span className='mb-2'>Description</span>
                      <textarea name="description" placeholder="Description" onChange={setForm}></textarea>
                    </label>
                  </div>
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="w-100">
                  <button type="button" className="DadupaModal-BTNSubmit w-100" onClick={() => {AddEperience(); handleCloseExperience()}}>ADD NEW Experince</button>
                </div>
              </div>
            </div>
          </div>
      }
    </>
    )
}
export default ExperienceModal;
