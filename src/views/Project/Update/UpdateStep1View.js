import React, {useRef, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import EtatDropFilter from "../../User/Fields/Filter/Project/EtatDropFilter";
import SectorDropFilter from "../../User/Fields/Filter/Project/SectorDropFilter";
import ZoneDropFilter from "../../User/Fields/Filter/Project/ZoneDropFilter";
import FinanceDropFilter from "../../User/Fields/Filter/Project/FinanceDropFilter";
import {AddProjectsAction} from "../../../store/actions/User/Project/ProjectAction";
import { getProjectAction } from '../../../store/actions/User/Project/GetProjectActions';
import ProjectSkeleton from '../../../skeleton/ProjectSkeleton';
import { useTranslation } from 'react-i18next';

export default function UpdateStep1View({formData, setForm, navigation, props}) {


    const dispatch = useDispatch();    
    const getproject = useSelector(state => state.getproject.getproject);
    const { t } = useTranslation();
    const [picture, setPicture] = useState(null);

    console.log("here updateeeeeeeeeee", getproject)
    
    const nameForm = useRef(null)

    
    const data = {
        project_id  :  props.match.params.id,
        action      : "getProject",
    }
    useEffect(() => {
        console.log("here update", getproject)
        dispatch(getProjectAction(data, props));
        setPicture(getproject?.project?.logo_link)
    }, [dispatch])
    
    useEffect(() => {
        
    })

    const onChange = e => {
        getBase64(e.target.files[0]);
        setPicture(URL.createObjectURL(e.target.files[0]) );
    };


    const onLoad = fileString => {
        formData.logo = fileString;
        formData.type = 'logo';
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
        const form = nameForm.current

        formData.project_id = getproject.project !== "loading" ? getproject.projectid: '';
        formData.name = `${form['name'].value}`;
        formData.project_area   = `${form['project_area'].value}`;
        formData.project_status = `${form['project_status'].value}`;
        formData.funding_search = `${form['funding_search'].value}`;
        formData.sector_id = `${form['sector_id'].value}`;
        formData.medialink = getproject.project.media_link;
        formData.logolink  = getproject.project.logo_link;
        formData.mediatype = getproject.project.mediatype;
        formData.description = getproject.project.description;
        formData.tags = getproject.project.tags;
        formData.action = 'create';
        dispatch(AddProjectsAction(formData, props, '/create', navigation));
    }

    const {next} = navigation;

    return (

        <div className="Page-Wrapper">
            <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 d-md-none d-lg-block">

                            <div className="page-header">
                                <h3>Détails de l'offre</h3>
                                <p>Enter details about the project <br/>to preceed further</p>
                                <img src="/assets/images/offer-thumbnail.svg"/>
                            </div>
                        </div>
                        {   getproject === 'loading' ? (
                                         <ProjectSkeleton/>
                                     ) : getproject.success === true ? (                                                                            
                                            () => 
                                               <div className="col-md-12 col-lg-8">
                                                   <form ref={nameForm} id="form-wizard" className="form-wizard" action="" method="post">
                                   <ul id="wizardbar">
                                       <li className="active">
                                           <div className="Step-Number"><span>1</span><i className="uil uil-check"></i></div>
                                           <div className="Step-Title">Détails de l'offre</div>
                                       </li>
                                       <li>
                                           <div className="Step-Number"><span>2</span><i className="uil uil-check"></i></div>
                                           <div className="Step-Title">Upload vidéo</div>
                                       </li>
                                       <li>
                                           <div className="Step-Number"><span>3</span><i className="uil uil-check"></i></div>
                                           <div className="Step-Title">Description de l'offre</div>
                                       </li>
                                       <li>
                                           <div className="Step-Number"><span>4</span><i className="uil uil-check"></i></div>
                                           <div className="Step-Title">Review Details</div>
                                       </li>
                                   </ul>
   
                                   <fieldset className="wizard-fieldset">
                                       <div className="fieldset-header">
                                           <div className="Step-Title">Détails de l'offre</div>
                                           <p>Enter details about the project <br/>to preceed further</p>
                                       </div>
                                       <div className="form-inputs">
                                           <div className="form-row">
                                               <div className="col-md-12 input-row">
                                                   <input type="text" name="name" onChange={setForm} defaultValue={getproject.project.name}
                                                          placeholder="Nom du projet" className="wizard-required" required/>
                                               </div>
                                               <div className="col-md-6 input-row input-select">
                                                   <EtatDropFilter name="project_status" value={getproject.project.project_status} onChange={setForm}/>
                                               </div>
   
                                               <div className="col-md-6 input-row input-select">
                                                   <SectorDropFilter name="sector_id" value={getproject.project.sector_id} onChange={setForm} />
                                               </div>
                                               <div className="col-md-12 input-row">
                                                   <ZoneDropFilter field='project_area' name="project_area" value={getproject.project.project_area}  onChange={setForm}/>
                                               </div>
                                               <div className="col-md-12 input-row input-select">
                                                   <FinanceDropFilter name="funding_search" value={getproject.project.funding_search}  onChange={setForm}/>
                                               </div>
                                               <div className="col-md-12 input-row">
                                                   <div className="custom-file">
                                                       <input type="file"  onChange={onChange}
                                                       className="custom-file-input" id="customFile"/>  
                                                       <label className="custom-file-label" htmlFor="customFile">
                                                       {!picture ?( t('form.edit_logo')): ''}{picture ? (<img 
                                                    style={{width:"50px"}} alt={picture} src={picture && picture}></img>)
                                                    : (<img 
                                                        style={{width:"50px"}} alt={picture} src={getproject.project.logo_link}></img>)}
                                                       </label>
                                                   </div>
                                               </div>
   
                                               <div className="col-md-6 input-row">
                                                   <div className="custom-control custom-switch">
                                                       <input type="checkbox" onChange={setForm}   className="custom-control-input" id="switch1"
                                                              name="look_angel"/>
                                                       <label className="custom-control-label" htmlFor="switch1">Je
                                                           cherche des mentors</label>
                                                   </div>
                                               </div>
                                               <div className="col-md-6 input-row">
                                                   <input type="text" value={getproject.project.url} name="url" onChange={setForm}
                                                          placeholder="Ajouter un lien" className="wizard-required"
                                                          required/>
                                               </div>
   
                                           </div>
                                       </div>
                                       <button type="button" onClick={(event) => { handleSubmitValue(event); next();}} name="next" className="next action-button">Continue <i
                                           className="uil uil-arrow-right"></i></button>
                                   </fieldset>
   
                               </form>
                                               </div>                                       
                                            )
                                        ()
                                        //  <div data-testid="error-message">ERROR</div>
                                      : (
                                          
                                        <div data-testid="error-message">ERROR</div>
                                      )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}