import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch} from 'react-redux';
import { CvAction } from '../../../../store/actions/Profile/UserActions';
import DropType from '../../../../utils/DropType';
import sectors from "../../../../data/sectors"
import { useTranslation } from 'react-i18next';



const  StudieModal = ({ showstudies, handleCloseStudies}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [datedebut, setDatedebut] = useState(new Date());
  const [datefin, setDatefin] = useState(new Date());

  const [formData, setForm] = useForm({datefin:'', present:'', etablissement:'', sector:'', lieu:'', diplome:'', description:''});

  const data = {
      studies : {
        datedebut : datedebut,
        datefin : datefin,
        present : formData.present,
        etablissement : formData.etablissement,
        sector : formData.sector,
        lieu : formData.lieu,
        diplome : formData.diplome,
        description : formData.description,
    }
  }

  const AddStudies =(id) =>{
      dispatch(CvAction(data, '', ''));
    }

    return (  
      <>
      {
        showstudies &&  

        <div className="modal-body">
            <div className=""  method="post">
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
                    <input type="text" name="etablissement" defaultValue="" placeholder="Établissement" className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-12 input-row">
                    <input type="text" name="lieu" defaultValue="" placeholder="Lieu" className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-6 input-row">
                    <input type="text" name="diplome" defaultValue="" placeholder="Diplôme obtenu" className="wizard-required" onChange={setForm} required/>
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
                  <button type="button" className="DadupaModal-BTNSubmit" onClick={() => {AddStudies(); handleCloseStudies()}}>ADD NEW</button>
                </div>
              </div>
            </div>
          </div>
          }
        </>
    )
}
export default StudieModal;
