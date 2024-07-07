import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';
import { CvdeleteAction, CvUpdateAction } from '../../../../store/actions/Profile/UserActions';
import DropType from '../../../../utils/DropType';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import sectors from "../../../../data/sectors"
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import DialogWarning from '../../../../utils/DialogWarning';



const ExperienceGrid = ({ experience }) => {
  const { t } = useTranslation();
  const [datedebut, setDatedebut] = useState(new Date(experience.datedebut));
  const [datefin, setDatefin] = useState(new Date(experience.datefin));
  const titleDialog = "Confirm to delete experience";
  const ContentDialog = "are you sure you want to delete this experience content?";

  const dispatch = useDispatch();
  const [formData, setForm] = useForm({ present: experience.present, post: experience.post, sector: experience.sector, entreprise: experience.entreprise, lieu: experience.lieu, description: experience.description });

  const params = useParams();
  const user = useSelector(state => state.userProfile.userProfile);
  const [action, setAction] = useState(false);

  useEffect(() => {
    if (user?.profile_id) {
      user?.profile_id === params.id ? setAction(true) : setAction(false);
    }
  })

  const data = {
    experiences: {
      datedebut: datedebut,
      datefin: datefin,
      present: formData.present,
      entreprise: formData.entreprise,
      sector: formData.sector,
      lieu: formData.lieu,
      post: formData.post,
      description: formData.description,
      index: experience.index,
    }
  }

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const UpdateExperience = (id) => {
    dispatch(CvUpdateAction(data, '', ''));
  }

  const deleteExperience = () => {
    let data = {
      experiences: { index: experience.index }
    }
    dispatch(CvdeleteAction(data, '', ''));
    setOpen(false);
  }

  const alloptions = sectors.map((item) => (
    { value: item.value, label: t(item.label) }
  ))

  const [optionSelected, setOptionSelected] = useState();

  const HandleChange = (selected) => {
    setOptionSelected(selected);
    formData.sector = selected.value;
  }


  const SelectStyleWithScrollbar = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#e8fbf1" : "white",
      color: "black",
      textAlign: 'center',
      "&:hover": {
        backgroundColor: "#e8fbf1",
      },
      // '&:nth-child(1) ': {
      //   disable: true,
      //   marginTop: '0px',
      //   borderTopLeftRadius: '30px',
      //   borderTopRightRadius: '20px',
      // },
      '&:last-child ': {
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '20px',
      }
    }),

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
      boxShadow: state.isFocused ? "0px 1px 15px -3px #00b60 " : "0px 0px 20px 0px #e7e7e7",
      borderRadius: '30px',
      border: '1px solid #e7e7e7',
      height: '50px',
      "&:hover": {
        boxShadow: "none",
      },
    }),
  }

  const [open,setOpen] = useState(false);

  const HandleClickOpen = ()=>{
    setOpen(true);
  }

  const HandleClose = ()=>{
    setOpen(false);
  }


  return (
    <>
      <li className="Section-Item">
        <div className="section-header">
          <label>{moment(experience.datedebut).format('MMMM y')} - {experience.present ? 'Present' : moment(experience.datefin).format('MMMM y')}</label>
          <div className='section-actions'>
          {
            action &&
            <div className="Contact">
              <div className="Add-Contact">
                <div className='Invitation-Options'>
                <button type="button" name="button" onClick={handleShow} className="Invitation-Option_Confirm"><i className="uil uil-pen"></i></button>
                <button type="button" name="button" onClick={HandleClickOpen} className="Invitation-Option_Delete"><i className="uil uil-times"></i></button>
                  <DialogWarning 
                    title={titleDialog} 
                    ContentText={ContentDialog} 
                    open={open} 
                    HandleConfirmation={deleteExperience}
                    HandleClose={HandleClose}
                  />
                </div>
              </div>
              {/* <button type="button" onClick={handleShow} className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
                <button type="button" style={{marginLeft:'10px'}} className=" Profile-Skills delete-skill" onClick={ deleteStudy}><i className="uil uil-trash"></i></button> */}
            </div>
          }
          </div>
        </div>
        <span className='section-sector text-uppercase'>{experience.post}<br/> {experience.entreprise}- {experience.lieu}</span>
        {/* <br/> */}
        <span className='section-description'>{experience.description}</span>
        <div className="CollapsUpdate" style={{ display: show ? 'block' : 'none' }}>
          <form className="" action="index.html" method="post">
            <div className="form-inputs">
              <div className="form-row">
                <div className="col-md-4 input-row">
                  <ReactDatePicker className="wizard-required" selected={datedebut} onChange={(date) => setDatedebut(date)} />
                </div>
                <div className="col-md-4 input-row">
                  <ReactDatePicker className="wizard-required" selected={datefin} onChange={(date) => setDatefin(date)} />
                </div>
                <div className="col-md-4 input-row input-flex">
                  <label className="container-checkbox">
                    <input type="checkbox" defaultChecked={formData.present} />
                    <span className="checkmark"></span>
                    <span>{t('ongoing')}</span>
                  </label>
                </div>
                <div className="col-md-12 input-row">
                  <input type="text" name="entreprise" defaultValue={formData.entreprise} placeholder={t('company')} className="wizard-required" onChange={setForm} required />
                </div>
                <div className="col-md-12 input-row">
                  <input type="text" name="post" defaultValue={formData.post} placeholder={t('job')} className="wizard-required" onChange={setForm} required />
                </div>
                <div className="col-md-6 input-row">
                  <input type="text" name="lieu" defaultValue={formData.lieu} placeholder={t('address')} className="wizard-required" onChange={setForm} required />
                </div>
                <div className="col-md-6 input-row input-select input-select-multi">
                  <Select
                    options={alloptions}
                    onChange={HandleChange}
                    value={optionSelected}
                    styles={SelectStyleWithScrollbar}
                    placeholder={(formData?.sector === '') ? t('industry') : formData?.sector}
                    required={true}
                    className="Select"
                  />
                </div>
                <div className="col-md-12 input-row">
                  <textarea name="description" placeholder={t('description')} defaultValue={formData.description} onChange={setForm}></textarea>
                </div>
              </div>
            </div>
            <div className="DadupaModal-Footer">
              <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
              </div>
              <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                <button type="button" className="DadupaModal-BTNSubmit" onClick={UpdateExperience}>{t('update')}</button>
              </div>
            </div>
          </form>
        </div>
      </li>
    </>
  )
}
export default ExperienceGrid;
