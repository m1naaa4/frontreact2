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
                  <div className="col-md-6 input-row">
                    <ReactDatePicker className="wizard-required" selected={datedebut} onChange={(date) => setDatedebut(date)} />
                  </div>
                  <div className="col-md-6 input-row input-flex">
                    <ReactDatePicker className="wizard-required" selected={datefin} onChange={(date) => setDatefin(date)} />
                    <label className="container-checkbox">
                    <input type="checkbox" name="present" onChange={setForm}/>
                      <span className="checkmark"></span>
                      <span>Présent</span>
                    </label>
                  </div>
                  <div className="col-md-12 input-row">
                    <input type="text" name="entreprise" defaultValue="" placeholder="Entreprise" className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-12 input-row">
                    <input type="text" name="post" defaultValue="" placeholder="Poste" className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-6 input-row">
                    <input type="text" name="lieu" defaultValue="" placeholder="Lieu" className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-6 input-row input-select input-select-multi">
                    <select className="user-type" name='sector' defaultValue={formData.sector} onChange={setForm}>
                        {sectors.map((item, key) => (
                            <option key={key} value={item.value}>{t(item.label)}</option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-12 input-row">
                  <textarea name="description" placeholder="Description" onChange={setForm}></textarea>
                  </div>
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                </div>
                <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                  <button type="button" className="DadupaModal-BTNSubmit" onClick={() => {AddEperience(); handleCloseExperience()}}>ADD NEW Experince</button>
                </div>
              </div>
            </div>
          </div>
      }
    </>
    )
}
export default ExperienceModal;
