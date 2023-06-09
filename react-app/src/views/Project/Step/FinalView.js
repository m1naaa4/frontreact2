import React, { useEffect, useState }  from 'react'
import sectors from '../../../data/sectors';
import { useTranslation } from 'react-i18next';
import etats from '../../../data/etats';
import countries from '../../../data/countries';
import finances from '../../../data/finances';
import { useDispatch, useSelector } from 'react-redux';
import VideoJS from '../../../helpers/VideoJS';
import Select from 'react-select';
import ReactPlayer from 'react-player';
import { getProjectAction, UpdateProjectsAction } from '../../../store/actions/Project/ProjectAction';
import { useHistory, useLocation } from 'react-router-dom';

export default function FinalView({formData, setFormData, navigation, props}) {

    const {previous} = navigation;
    const [loadedProject, setLoadedProject] = useState();
    const [sector, setSector] = useState();
    const [status, setStatus] = useState();
    const [country, setCountry] = useState();
    const [finance, setFinance] = useState();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [t] = useTranslation();
    const projectId = location.pathname.split('/')[location.pathname.split('/').length - 2];
    const project = useSelector(state => state.getproject.getproject);

    const [optionSelected, setOptionSelected] = useState();

    const datas=[{value : 'public', label: 'Public'},{value : 'shared', label: 'Shared'},{value : 'team', label: 'Team'},{value : 'private', label: 'Private'}];
    let alloptions = datas.map((name, index) => (
        {value : name.value, label: t(name.label)}
    ));

    useEffect(() => {
        dispatch(getProjectAction(projectId, '/get'));
    }, [dispatch])

    const handleChange = (selected) => {
        setOptionSelected(selected);
        let data = {
            'visibility': selected.value,
            'project_id': projectId
        }
        dispatch(UpdateProjectsAction(data, '/update'));
    };

    const SelectStyleWithScrollbar = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#e8fbf1" : "white",
        color: "black",
        textAlign: 'center',
        "&:hover":{
        backgroundColor: "#e8fbf1",
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
            width:'150px',
            height: '50px',
            "&:hover":{
            boxShadow: "none",
            },
        }),
    }
        
    const goToShowproject = () => {
        history.push('/project/show/' + projectId);
    };

    useEffect(() => {
        if (projectId === "create" || project === "loading" || !project.project) {
          return;
        }
        setStatus(project.project.project_status);
        setSector(project.project.sector);
        setCountry(project.project.project_area);
        setOptionSelected(project.project.visibility)
    //     formData.website_url = getproject.project.website_url ? getproject.project.website_url : '';
        setFinance(project.project.funding_search);
    //     formData.look_mentor = getproject.project.look_angel;
        setLoadedProject(project.project);
        console.log(project.project.visibility);
    }, [projectId, project]);

    useEffect(() => {
        sectors.map((key) => 
          {if (key.value === sector) {
            setSector(key.label)
          }}
        );
        
        etats.map((key) => 
          {if (key.value === status) {
            setStatus(key.label)
          }}
        );

        countries.map((key) => 
            {if (key.value === country) {
            setCountry(key.label)
            }}
        );
      
        finances.map((key) => 
            {if (key.value === finance) {
            setFinance(key.label)
            }}
        );

        datas.map((key) => 
            {if (key.value === optionSelected) {
                console.log(optionSelected, key.label);
                setOptionSelected(key.label)
            }}
        );
    })

    const getExtension = (file) => {
        if (/^(https?:\/\/)?((www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/.test(file)){ 
            return 'youtube';
        }
        else if (/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/.test(file)){
            return 'vimeo';
        }
        else{
            return file.split('.').pop().toLowerCase();
        }
    };

    return (

        <div className="Page-Wrapper">
            <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 d-md-none d-lg-block">

                            <div className="page-header">
                                <h3>Détails de l'offre</h3>
                                <p>Enter details about the project <br/>to preceed further</p>
                                <img src="/assets/images/offer-thumbnail.svg" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <form id="form-wizard"  className="form-wizard">
                                <ul id="wizardbar">
                                    <li className="active done">
                                        <div className="Step-Number"><span>1</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Détails de l'offre</div>
                                    </li>
                                    <li className="active done">
                                        <div className="Step-Number"><span>2</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Upload vidéo</div>
                                    </li>
                                    <li className="active done">
                                        <div className="Step-Number"><span>3</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Description de l'offre</div>
                                    </li>
                                    <li className="active">
                                        <div className="Step-Number"><span>4</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Review Details</div>
                                    </li>
                                </ul>
                                <fieldset className="wizard-fieldset">
                                    <div className="fieldset-header">
                                        <div className="Step-Title">Review Details</div>
                                        <p>Enter details about the project <br/>to preceed further</p>
                                    </div>
                                    <div className="form-inputs review-box">
                                        {loadedProject && 
                                            <div className="review-fieldset">
                                            <div className="review-header">
                                                <h2 className="review-offer-title">{`${loadedProject.name}`}</h2>
                                                <h2 className="review-offer-title">
                                                    {loadedProject.website_url && <div className="Company-Name"><a href={loadedProject.website_url} target="_blanc"><i className="uil uil-globe"></i>website</a></div>}
                                                </h2>
                                                <div className="reeview-offer-logo">
                                                    <img src={`${loadedProject.logo_link}`} alt=""/>
                                                </div>
                                            </div>
                                            <div className="review-media">
                                                {loadedProject.media_link.map(item => (
                                                <div key={item} style={{ flex: `1 0 ${100/loadedProject.media_link.length}%` }}>
                                                    <div className="col-md-12 input-row">
                                                    {(function() {
                                                        if(getExtension(item) == 'youtube'){
                                                            return <ReactPlayer url={item} controls={true} />
                                                        }else{
                                                            if(getExtension(item) == 'vimeo'){
                                                                return <ReactPlayer url={item} controls={true} />
                                                            }else{
                                                                if(getExtension(item) == 'mp4'){
                                                                   return <VideoJS options={
                                                                    {
                                                                        autoplay: false,
                                                                        controls: true,
                                                                        responsive: true,
                                                                        fluid: true,
                                                                        sources: [{
                                                                          src: item,
                                                                          type: 'video/mp4'
                                                                        }]
                                                                    }
                                                                   }/>
                                                                }else{
                                                                   return <img width="100%" height="300" src={item} alt="Project"/>
                                                                }
                                                            }
                                                        }
                                                    })()}
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                            <div className="review-meta">
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Project Status</label>
                                                    <span>{t(`${status}`)}</span>
                                                </div>
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Secteurs d'activité</label>
                                                    <span>{t(`${sector}`)}</span>
                                                </div>
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Zones du projet</label>
                                                    <span>{t(`${country}`)}</span>
                                                </div>
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Financement</label>
                                                    <span>{t(`${finance}`)}</span>
                                                </div>
                                            </div>
                                            <div className="review-content" dangerouslySetInnerHTML={{ __html: loadedProject.description }}>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-6 input-row">
                                                    <div className="custom-control custom-switch">
                                                        <input type="checkbox" defaultChecked={loadedProject.look_angel} className="custom-control-input" id="switch1"
                                                            name="look_angel"/>
                                                        <label className="custom-control-label" htmlFor="switch1"><span>{t('form.want_mentors')}</span></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-tags">
                                                <h3>Tags</h3>
                                                <ul>
                                                    {
                                                       loadedProject.tags ?  loadedProject.tags.map((name, index) => (
                                                            <li key={index}>
                                                                {name}
                                                                </li>
                                                            )):''
                                                    }                                                   
                                                </ul>
                                            </div>
                                        </div>
                                        }                                        
                                    </div>
                                    <div className="d-flex justify-content-between">
                                    <div>
                                    <div className="d-flex justify-content-start">
                                       <div className="mr-2">
                                        <button onClick={previous} type="button" name="previous" className="previous action-button"><i
                                        className="uil uil-arrow-left  "></i> Previous
                                        </button>
                                       </div>
                                      <div>
                                        <Select
                                            options={alloptions}
                                            value={optionSelected}
                                            placeholder={optionSelected}
                                            onChange={handleChange}
                                            styles={SelectStyleWithScrollbar}
                                            className="Select"
                                        />
                                      </div>
                                    </div>
                                     </div> 
                                        <div>
                                            <button type="button" onClick={goToShowproject}  className="submit action-button">Review <i
                                        className="uil uil-arrow-right"></i></button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}