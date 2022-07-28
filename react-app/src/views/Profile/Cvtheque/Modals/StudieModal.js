import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { CvAction } from '../../../../store/actions/Profile/UserActions';
import DropType from '../../../../utils/DropType';
import sectors from "../../../../data/sectors"
import { useTranslation } from 'react-i18next';



const StudieModal = ({ showstudies, handleCloseStudies }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [datedebut, setDatedebut] = useState(new Date());
  const [datefin, setDatefin] = useState(new Date());

  const [formData, setForm] = useForm({ datefin: '', present: '', etablissement: '', sector: '', lieu: '', diplome: '', description: '' });

  const data = {
    studies: {
      datedebut: datedebut,
      datefin: datefin,
      present: formData.present,
      etablissement: formData.etablissement,
      sector: formData.sector,
      lieu: formData.lieu,
      diplome: formData.diplome,
      description: formData.description,
    }
  }

  const AddStudies = (id) => {
    dispatch(CvAction(data, '', ''));
  }

  return (
    <>
      {
        showstudies &&

        <div className="modal-body">
          <div className="" method="post">
            <div className="form-inputs">
              <div className="form-row">
                <div className='col-12'>
                  <h3 className="Profile-Section-Title"><i className="uil uil-graduation-cap"></i> Etudes</h3>
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
                <div className="col-md-6 input-row mb-3">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>Etablissement</span>
                    <input type="text" name="etablissement" defaultValue="" placeholder="Établissement" className="wizard-required" onChange={setForm} required />
                  </label>
                </div>
                <div className="col-md-6 input-row mb-3">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>Lieu</span>
                    <input type="text" name="lieu" defaultValue="" placeholder="Lieu" className="wizard-required" onChange={setForm} required />
                  </label>
                </div>
                <div className="col-md-6 input-row mb-3">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>Diplôme</span>
                    <input type="text" name="diplome" defaultValue="" placeholder="Diplôme obtenu" className="wizard-required" onChange={setForm} required />
                  </label>
                </div>
                <div className="col-md-6 input-row mb-3 input-select input-select-multi">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>Secteur</span>
                    <select className="user-type" name='sector' defaultValue={formData.sector} onChange={setForm}>
                      {sectors.map((item, key) => (
                        <option key={key} value={item.value}>{t(item.label)}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="col-md-12 input-row  mb-2">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>Description</span>
                    <textarea name="description" placeholder="Description" onChange={setForm}></textarea>
                  </label>
                </div>
              </div>
            </div>
            <div className="DadupaModal-Footer">
              <div className="w-100">
                <button type="button" className="DadupaModal-BTNSubmit w-100" onClick={() => { AddStudies(); handleCloseStudies() }}>ADD NEW</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default StudieModal;
