import React from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { CvAction } from '../../../../store/actions/Profile/UserActions';
import { useTranslation } from 'react-i18next';



const  SkillsModal = ({ show, handleClose}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    
    const dataLevel = [
        ['','filter.secteur'],
        ['agroalimentaire','filter.secteur.agroalimentaire'],
        ['architecture','filter.secteur.architecture'],
    ]

    const [formData, setForm] = useForm({name:'', categorie:'', level:''});

    const data = {
        skills : {name : formData.name,
        category : formData.category,
        level : formData.level}
    }

    const AddSkills =(id) =>{
        dispatch(CvAction(data, '', ''));
      }
    
    return (  
      <>
      {
     show &&
        <div className="modal-body">
            <div className="">
              <div className="form-inputs">
                <div className="form-row">
                  <div className="col-md-12 input-row">
                    <input type="text" name="name" onChange={setForm} defaultValue="" placeholder={t('skills.form.new')} className="wizard-required" required/>
                  </div>
                  {/* <div className="col-md-12 input-row input-select input-select-multi">
                    <DropType datas={dataCategory} field='category' defaultValue={formData.category} onChange={setForm}/>
                  </div>
                  <div className="col-md-12 input-row input-select input-select-multi">
                    <DropType datas={dataLevel} field='level' defaultValue={formData.level} onChange={setForm}/>
                  </div> */}
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="w-100">
                  <button type="button" className="DadupaModal-BTNSubmit" onClick={() => {AddSkills(); handleClose()}}>{t('add')} {t('skills.form.new')}</button>
                </div>
              </div>
            </div>
        </div>
      }
      </>
    )
}
export default SkillsModal;
