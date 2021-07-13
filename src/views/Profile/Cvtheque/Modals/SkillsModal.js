import React from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { CvAction } from '../../../../store/actions/Profile/UserActions';
import DropType from '../../../../utils/DropType';



const  SkillsModal = () => {
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
        console.log(data)
        dispatch(CvAction(data, '', ''));
      }
    

    return (        
      
        <div className="modal-body">
            <div className="">
              <div className="form-inputs">
                <div className="form-row">
                  <div className="col-md-12 input-row">
                    <input type="text" name="name" onChange={setForm} defaultValue="" placeholder="Nom du Skill" className="wizard-required" required/>
                  </div>
                  <div className="col-md-12 input-row input-select input-select-multi">
                    <DropType datas={dataCategory} field='category' defaultValue={formData.category} onChange={setForm}/>
                  </div>
                  <div className="col-md-12 input-row input-select input-select-multi">
                    <DropType datas={dataLevel} field='level' defaultValue={formData.level} onChange={setForm}/>
                  </div>
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft"></div>
                <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                  <button type="button" className="DadupaModal-BTNSubmit" onClick={AddSkills}>ADD NEW SKILL</button>
                </div>
              </div>
            </div>
          </div>
    )
}
export default SkillsModal;
