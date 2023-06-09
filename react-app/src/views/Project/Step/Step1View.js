import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector} from "react-redux";
import EtatDropFilter from "../../User/Fields/Filter/Project/EtatDropFilter";
import SectorDropFilter from "../../User/Fields/Filter/Project/SectorDropFilter";
import ZoneDropFilter from "../../User/Fields/Filter/Project/ZoneDropFilter";
import FinanceDropFilter from "../../User/Fields/Filter/Project/FinanceDropFilter";
import { AddProjectsAction, getProjectAction } from "../../../store/actions/Project/ProjectAction";
import { displayErrorMessages } from '../../../helpers/displayErr';
import { useTranslation } from 'react-i18next';
import $ from "jquery";
import 'jquery-validation'
import { useLocation, useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
export default function Step1View({formData, setForm, navigation, props}) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        project_status,
        project_area,
        funding_search,
        look_angel,
        project_name,
        sector_id,
        url,
        logolink,
        website_url,
    } = formData;
    const project = useSelector(state => state.addproject.addproject);
    const [picture, setPicture] = useState(null);
    const [logo, setLogo] = useState();
    const history = useHistory();
    const location = useLocation();

    const projectId = useMemo(
        () => location.pathname.split('/')[location.pathname.split('/').length - 1],
        [location.pathname]
    );

    const onChange = e => {
        setLogo(e.target.files[0]);
        setPicture(URL.createObjectURL(e.target.files[0]) );
    };

    const [is_loading, setIsLoading] = useState(false);
    const [changed, setChanged] = useState(false);
    const getproject = useSelector(state => state.getproject.getproject);
    
    useEffect(()=>{
        setChanged(true)
    },[location])

    useEffect(()=>{
        const { go } = navigation;
        const steps = ['step2', 'step3', 'final'];
        if (steps.includes(projectId)) {
            go(projectId)
        }
        else{
            go('step1')
        }
    },[]);

    useEffect(() => {
        if (projectId !== "create" && projectId !== "step2" && projectId !== "step3" && projectId !== "final") {
            dispatch(getProjectAction(projectId, '/get'));
        }
    }, [dispatch]);

    useEffect(() => {
        if (projectId === "create" || getproject === "loading" || !getproject.project) {
          return;
        }
        setPicture(getproject.project.logo_link);
        setLogo('');
        formData.project_name = getproject.project.name;
        formData.project_status = getproject.project.project_status;
        formData.sector_id = getproject.project.sector;
        formData.project_area = getproject.project.project_area;
        formData.website_url = getproject.project.website_url ? getproject.project.website_url : '';
        formData.funding_search = getproject.project.funding_search;
        formData.look_mentor = getproject.project.look_angel;
        
    }, [projectId, getproject]);

    const handleSubmitValue = (e) => {
        e.preventDefault();
        clearAuthErrDiv();
        if($("#form-wizard").valid()){
            setIsLoading(true)
            if (projectId !== "create") {
                formData.project_id = projectId;
            }
            formData.action = 'create';
            dispatch(AddProjectsAction(formData, props, '/create', navigation, logo, history, 'step2'));
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
                                                <input type="text" name="project_name" onChange={setForm} value={project_name}
                                                       placeholder={t('form.prject_name')} className="wizard-required" required/>
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                <EtatDropFilter formData={formData}/>
                                            </div>

                                            <div className="col-md-6 input-row input-select">
                                                <SectorDropFilter formData={formData} />
                                            </div>
                                            <div className="col-md-12 input-row input-select">
                                                <ZoneDropFilter formData={formData}/>
                                            </div>
                                            <div className="col-md-12 input-row input-select">
                                                <FinanceDropFilter formData={formData}/>
                                            </div>
                                            <div className="col-md-12 input-row">
                                                <div className="custom-file">
                                                    <input type="file"  name="logolink" onChange={onChange}
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