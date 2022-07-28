import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { CvAction } from '../../../../store/actions/Profile/UserActions';
import DropType from '../../../../utils/DropType';
import sectors from "../../../../data/sectors"
import { useTranslation } from 'react-i18next';
import Select from 'react-select';


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
  const alloptions = sectors.map((item) => (
    {value: item.value,label: t(item.label)}
))

const [optionSelected, setOptionSelected] = useState();

    const HandleChange = (selected)=>{
        setOptionSelected(selected);
        formData.sector=selected.value;
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
          '&:nth-child(1) ': {
            disable:true,
            marginTop: '0px',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '20px',
        },
        '&:last-child ': {
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '20px',
        }}),
        
        menu: (provided) => ({
          ...provided,
          borderRadius: "35px",
          overflow: 'hidden',
          border: '0.5px solid #00b602',
          zIndex: '999'
        }),
  
        menuList: (provided, state) => ({
        ...provided,
        // border: '1px solid green',
        borderRadius: "32px",
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
          borderRadius: '30px',
          border: '1px solid #e7e7e7',
          height: '50px',
          "&:hover":{
            boxShadow: "none",
          },
        }),
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
                      {/* <select className="user-type" name='sector' defaultValue={formData.sector} onChange={setForm}>
                        {sectors.map((item, key) => (
                            <option key={key} value={item.value}>{t(item.label)}</option>
                        ))}
                      </select> */}
                      <Select
                              options={alloptions}
                              onChange={HandleChange}
                              value={optionSelected}
                              styles={SelectStyleWithScrollbar}
                              placeholder="Secteur d'activité"
                              required={true}
                              className="Select"
                      />
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
