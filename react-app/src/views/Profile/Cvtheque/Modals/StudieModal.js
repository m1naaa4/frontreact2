import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';
import { CvAction } from '../../../../store/actions/Profile/UserActions';
import DropType from '../../../../utils/DropType';
import sectors from "../../../../data/sectors"
import { useTranslation } from 'react-i18next';
import Select from 'react-select';



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
        //   '&:nth-child(1) ': {
        //     disable:true,
        //     marginTop: '0px',
        //     borderTopLeftRadius: '30px',
        //     borderTopRightRadius: '20px',
        // },
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
          borderRadius: '15px',
          border: '1px solid #F5F5F5',
          height: '50px',
          fontSize: '12px',
          "&:hover":{
            boxShadow: "none",
          },
        }),
        valueContainer:(base) => ({
          ...base,
          height: '50px',
          padding: '2px 15px',
        })
      }

  return (
    <>
      {
        showstudies &&

        <div className="modal-body">
          <div className="" method="post">
            <div className='modal-header'>
              <h3 className="Profile-Section-Title"><i className="uil uil-graduation-cap"></i>{t('Etudes')}</h3>
              <div className='input-row'>
                <span>{t('ongoing')}</span>
                <div className="custom-control custom-switch switch-present">
                    <input type="checkbox" onChange={setForm} className="custom-control-input" id="switch-present"
                      name="present" />
                    <label className="custom-control-label" htmlFor="switch-present"></label>
                  </div>
              </div>
            </div>
            <div className="form-inputs">
              <div className="form-row">
                <div className='col-12'>
                  
                </div>
                <div className="col-md-6 input-row">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>{t('start')}</span>
                    <ReactDatePicker className="wizard-required" selected={datedebut} onChange={(date) => setDatedebut(date)} />
                  </label>
                </div>
                <div className="col-md-6 input-row mb-4">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>{t('end')}</span>
                    <ReactDatePicker className="wizard-required" selected={datefin} onChange={(date) => setDatefin(date)} />
                  </label>
                </div>
                {/* <div className="col-md-2 input-row mb-4">
                  <label className='d-flex flex-column mb-0'> */}
                    
                    {/* <div>
                      <input type="checkbox" name="present" onChange={setForm} />
                      <span className="checkmark"></span>
                    </div> */}
                  {/* </label>
                </div> */}
                <div className="col-md-6 input-row mb-3">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>{t('school')}</span>
                    <input type="text" name="etablissement" defaultValue="" placeholder={t('school')} className="wizard-required" onChange={setForm} required />
                  </label>
                </div>
                <div className="col-md-6 input-row mb-3">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>{t('address')}</span>
                    <input type="text" name="lieu" defaultValue="" placeholder={t('address')} className="wizard-required" onChange={setForm} required />
                  </label>
                </div>
                <div className="col-md-6 input-row mb-3">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>{t('trainingDiploma')}</span>
                    <input type="text" name="diplome" defaultValue="" placeholder={t('trainingDiploma')} className="wizard-required" onChange={setForm} required />
                  </label>
                </div>
                <div className="col-md-6 input-row mb-3 input-select input-select-multi">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>{t('industry')}</span>
                    <Select
                              options={alloptions}
                              onChange={HandleChange}
                              value={optionSelected}
                              styles={SelectStyleWithScrollbar}
                              placeholder={t('industry')}
                              required={true}
                              className="Select"
                      />
                  </label>
                </div>
                <div className="col-md-12 input-row  mb-2">
                  <label className='d-flex flex-column mb-0'>
                    <span className='mb-2'>{t('description')}</span>
                    <textarea name="description" placeholder={t('description')} onChange={setForm}></textarea>
                  </label>
                </div>
              </div>
            </div>
            <div className="DadupaModal-Footer">
              <div className="w-100">
                <button type="button" className="DadupaModal-BTNSubmit w-100" onClick={() => { AddStudies(); handleCloseStudies() }}>{t('add')}</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default StudieModal;
