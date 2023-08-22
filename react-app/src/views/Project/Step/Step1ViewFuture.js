import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import EtatDropFilter from "../../User/Fields/Filter/Project/EtatDropFilter";
import SectorDropFilter from "../../User/Fields/Filter/Project/SectorDropFilter";
import ZoneDropFilter from "../../User/Fields/Filter/Project/ZoneDropFilter";
import FinanceDropFilter from "../../User/Fields/Filter/Project/FinanceDropFilter";
import {AddProjectsAction, ClearProjectsAction} from "../../../store/actions/User/Project/ProjectAction";
import { displayErrorMessages } from '../../../helpers/displayErr';
import { useTranslation } from 'react-i18next';
import $ from "jquery";
import 'jquery-validation'
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import AllMultiSelectCheckboxStatus from '../../../utils/Filters/AllMultiselectCheckboxStatus';
import AllMultiSelectCheckboxGeneral from '../../../utils/Filters/AllMultiselectCheckboxGeneral';
import etats from '../../../data/etats';
import finances from '../../../data/finances';
import sectors from '../../../data/sectors';
import countries from '../../../data/countries';
import Select from 'react-select'
import { default as StatusSelect } from "react-select";
import { default as FinanceSelect } from "react-select";
import { default as SectorSelect } from "react-select";

export default function Step1View({formData, setForm,navigation, props}) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { project_status, project_area, funding_search, look_angel, name,  sector_id, url, logolink, website_url } = formData;
    const project = useSelector(state => state.addproject.addproject);
    const [picture, setPicture] = useState(null);
    const onChange = e => {
        getBase64(e.target.files[0]);
        setPicture(URL.createObjectURL(e.target.files[0]) );
    };

    const [is_loading, setIsLoading] = useState(false);
    const [changed, setChanged] = useState(false);

    const location = useLocation();
    useEffect(()=>{
        setChanged(true)
    },[location])


    if (props.location.state){
        formData.project_id = props.location.state.id
    }
    // useEffect(() => {
    //     dispatch(AddProjectsAction(formData, props, '/create'));
    // }, [dispatch])

    const onLoad = fileString => {
        formData.logo   = fileString;
        formData.action = 'create';
        formData.type   = 'image';
    };
    
    const getBase64 = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };
    const handleSubmitValue = (e) => {

        e.preventDefault();
        clearAuthErrDiv();
        if($("#form-wizard").valid()){
            // if (changed) {
            //     if (location.pathname !== '/project/create') {
            //         console.log(project.projectid, 'entreddddd');
            //         formData.project_id = null;
            //     }else{
            //         formData.project_id =  project.projectid;
            //     }
                
            // }else{
                
            // }
            setIsLoading(true)
            formData.project_id = project !== "loading" ? project?.projectid: '';
            formData.action = 'create';
            dispatch(AddProjectsAction(formData, props, '/create', navigation));
        }  
    }

    const clearAuthErrDiv = () => {
    let authErr = document.querySelector("#authErr");
    authErr.innerHTML = "";
    }

    const checkparameters = () => {
        if (project == 0 && project.addproject ==0) {
          return "loading...";
        }else if(project?.success === false){
            displayErrorMessages(project.errors, document.getElementById('authErr'))
        }        
      }

    const  onDataChange =(value, action) => {       
       if (action.name === 'project_status') {
            formData.project_status = value.value
       } else if(action.name === 'project_area'){
            formData.project_area = value.value
       } else if(action.name === 'sector_id'){
            formData.sector_id = value.value
       } else if(action.name === 'funding_search'){
            formData.funding_search = value.value
       }

        
    }

    return (

        <div className="Page-Wrapper">
            <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 d-md-none d-lg-block">

                            <div className="page-header">
                                <h3>{t('project.add.desc1')} </h3>

                                <div id="authErr"></div>
                                <div id="authResponse">

                                {checkparameters()}

                            </div>
                                <img src="/assets/images/offer-thumbnail.svg"/>
                            </div>

                            <div id="authErr"></div>

                            <div id="authResponse">
                                
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <form id="form-wizard" className="form-wizard" action="" method="post">
                                <ul id="wizardbar">
                                    <li className="active">
                                        <div className="Step-Number"><span>1</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('project.add.detail_offre')} </div>
                                    </li>
                                    <li>
                                        <div className="Step-Number"><span>2</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('upload_video')}</div>
                                    </li>
                                    <li>
                                        <div className="Step-Number"><span>3</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('desc_offre')}</div>
                                    </li>
                                    <li>
                                        <div className="Step-Number"><span>4</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('review_detail')}</div>
                                    </li>
                                </ul>

                                <fieldset className="wizard-fieldset">
                                    <div className="form-inputs">
                                        <div className="form-row">
                                            <div className="col-md-12 input-row">
                                                <input type="text" name="name" onChange={setForm} value={name}
                                                       placeholder={t('form.prject_name')} className="wizard-required" required/>
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                {/* <EtatDropFilter value={project_status} required={true} onChange={setForm}/> */}
                                                <StatusSelect value={project_status} options={etats} name="project_status" onChange={onDataChange}  />
                                            </div>

                                            <div className="col-md-6 input-row input-select">
                                                {/* <SectorDropFilter value={sector_id} required={true} onChange={setForm} /> */}
                                                <SectorSelect value={sector_id} options={sectors} name="sector_id" onChange={onDataChange} />
                                            </div>
                                            <div className="col-md-12 input-row input-select">
                                                {/* <ZoneDropFilter field='project_area' value={project_area} required={true}  onChange={setForm}/> */}
                                                <Select options={countries} value={project_area} name="project_area" onChange={onDataChange}  />
                                            </div>
                                            <div className="col-md-12 input-row input-select">
                                                {/* <FinanceDropFilter value={funding_search} required={true}  onChange={setForm}/> */}
                                                <FinanceSelect options={finances} value={funding_search} name="funding_search" onChange={onDataChange} />
                                            </div>
                                            <div className="col-md-12 input-row">
                                                <div className="custom-file">
                                                    <input type="file" value={logolink} name="logolink" onChange={onChange}
                                                    className="custom-file-input" id="customFile"/>
                                                    <label className="custom-file-label" htmlFor="customFile">{!picture ?( t('form.add_logo')): ''}<img 
                                                    style={{width:"50px"}} alt={picture} className="playerProfilePic_home_tile"  src={picture && picture}></img></label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 input-row">
                                                <div className="custom-control custom-switch">
                                                    <input type="checkbox" defaultChecked={look_angel} onChange={setForm}   className="custom-control-input" id="switch1"
                                                           name="look_angel"/>
                                                    <label className="custom-control-label" htmlFor="switch1"><span>{t('form.want_mentors')}</span></label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <input type="text" value={website_url} name="website_url" onChange={setForm}
                                                       placeholder={t('form.add_url')} className="wizard-required" />
                                            </div>

                                        </div>
                                    </div>
                                    <button type="button" onClick={(event) => { handleSubmitValue(event);}} name="next" className="next action-button">{t('next')}                                    
                                        {!is_loading ? <i className="uil uil-arrow-right"></i> : <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        /> }
                                    </button>
                                </fieldset>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
