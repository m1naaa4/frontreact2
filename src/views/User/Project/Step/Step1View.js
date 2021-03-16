import React, { useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import EtatDropFilter from "../../Fields/Filter/Porteur/EtatDropFilter";
import SectorDropFilter from "../../Fields/Filter/Porteur/SectorDropFilter";
import ZoneDropFilter from "../../Fields/Filter/Porteur/ZoneDropFilter";
import FinanceDropFilter from "../../Fields/Filter/Porteur/FinanceDropFilter";
import {AddProjectsAction} from "../../../../store/actions/User/Project/AddProjectAction";
import { displayErrorMessages } from '../../../../helpers/displayErr';

export default function Step1View({formData, setForm,navigation, props}) {


    const dispatch = useDispatch();
    const { project_status, project_area, funding_search, look_angel, name,  sector_id, url } = formData;
    const project = useSelector(state => state.addproject.addproject);

    const onChange = e => {
        getBase64(e.target.files[0]);
    };


    if (props.location.state){
        formData.project_id = props.location.state.id
    }
    // useEffect(() => {
    //     dispatch(AddProjectsAction(formData, props, '/create'));
    // }, [dispatch])

    const onLoad = fileString => {
        formData.logo = fileString;
        formData.action = 'create';
        formData.type = 'image';
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
        formData.project_id = project !== "loading" ? project.projectid: '';
        formData.action = 'create';
        dispatch(AddProjectsAction(formData, props, '/create', navigation));
    }


    const successMessage = (successMessage) => {
        return <div dangerouslySetInnerHTML=
          {{ __html: '<div class="alert alert-success add-padding">' + ' ' + successMessage + '</div>' }}
        />
    
      }

      const clearAuthErrDiv = () => {
        let authErr = document.querySelector("#authErr");
        authErr.innerHTML = "";
      }

    return (

        <div className="Page-Wrapper">
            <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 d-md-none d-lg-block">

                            <div className="page-header">
                                <h3>Détails de l'offre</h3>
                                <p>Enter details about the project <br/>to preceed further</p>

                                <div id="authErr"></div>
                                <div id="authResponse">

                                {
                                 project !== 0 && project.success === true ?
                                 project.message
                                    :
                                project.success === false ?
                                displayErrorMessages(project.errors, document.getElementById('authErr'))
                                : project

                                }

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
                                                <input type="text" name="name" onChange={setForm} value={name}
                                                       placeholder="Nom du projet" className="wizard-required" required/>
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                <EtatDropFilter value={project_status} onChange={setForm}/>
                                            </div>

                                            <div className="col-md-6 input-row input-select">
                                                <SectorDropFilter value={sector_id} onChange={setForm} />
                                            </div>
                                            <div className="col-md-12 input-row">
                                                <ZoneDropFilter value={project_area}  onChange={setForm}/>
                                            </div>
                                            <div className="col-md-12 input-row input-select">
                                                <FinanceDropFilter value={funding_search}  onChange={setForm}/>
                                            </div>
                                            <div className="col-md-12 input-row">
                                                <div className="custom-file">
                                                    <input type="file" onChange={onChange}
                                                    className="custom-file-input" id="customFile"/>
                                                    <label className="custom-file-label" htmlFor="customFile">Ajouter
                                                        le logo</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 input-row">
                                                <div className="custom-control custom-switch">
                                                    <input type="checkbox" value={look_angel} onChange={setForm}   className="custom-control-input" id="switch1"
                                                           name="angel"/>
                                                    <label className="custom-control-label" htmlFor="switch1">Je
                                                        cherche des mentors</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <input type="text" value={url} name="url" onChange={setForm}
                                                       placeholder="Ajouter un lien" className="wizard-required"
                                                       required/>
                                            </div>

                                        </div>
                                    </div>
                                    <button type="button" onClick={(event) => { handleSubmitValue(event);}} name="next" className="next action-button">Continue <i
                                        className="uil uil-arrow-right"></i></button>
                                </fieldset>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}