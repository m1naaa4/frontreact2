import React, { useEffect, useState }  from 'react'
import { Player } from 'video-react';
import sectors from '../../../data/sectors';
import { useTranslation } from 'react-i18next';
import etats from '../../../data/etats';
import countries from '../../../data/countries';
import finances from '../../../data/finances';
import { AddProjectsAction } from '../../../store/actions/User/Project/ProjectAction';
import { useDispatch } from 'react-redux';
import VideoJS from '../../../helpers/VideoJS';
import Vimeo from '@u-wave/react-vimeo';
import YouTube from 'react-youtube';
import Select from 'react-select';

export default function FinalView({formData, setFormData, navigation, props}) {

    const { project_status, project_area, funding_search, tags, descriptions, name,  sector_id, project_id, medialink, logolink, mediatype, visibility } = formData;
    const {previous} = navigation;
    const [sector, setSector] = useState();
    const [status, setStatus] = useState();
    const [country, setCountry] = useState();
    const [finance, setFinance] = useState();
    const [visibilitys, setVisibility] = useState(visibility);

    const [optionSelected, setOptionSelected] = useState({value : 'private', label: 'Private'});

    const datas=[{value : 'public', label: 'Public'},{value : 'shared', label: 'Shared'},{value : 'team', label: 'Team'},{value : 'private', label: 'Private'}];
    let alloptions = datas.map((name, index) => (
        {value : name.value, label: name.label}
      ));

      const handleChange = (selected) => {
        setOptionSelected(selected);
        formData.visibility   = selected.value;
        formData.project_id = project_id;
        formData.action     = 'create';
        dispatch(AddProjectsAction (formData, props, '/create'));

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
          '&:nth-child(1) ': {
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
        
    const goToShowproject = () => {
        props.history.push('/project/show/'+ project_id );
    };
    const [t] = useTranslation();

    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.visibility   = e.target.value;
        formData.project_id = project_id;
        formData.action     = 'create';
        dispatch(AddProjectsAction (formData, props, '/create'));
    };

    useEffect(() => {
        sectors.map((key) => 
          {if (key.value === sector_id) {
            setSector(key.label)
          }}
        );
        
        etats.map((key) => 
          {if (key.value === project_status) {
            setStatus(key.label)
          }}
        );

        countries.map((key) => 
            {if (key.value === project_area) {
            setCountry(key.label)
            }}
        );
      
       finances.map((key) => 
            {if (key.value === funding_search) {
            setFinance(key.label)
            }}
        );
    })

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: medialink,
          type: 'video/mp4'
        }]
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
                                        <div className="review-fieldset">
                                            <div className="review-header">
                                                <h2 className="review-offer-title">{`${name}`}</h2>
                                                <div className="review-offer-logo">
                                                    <img src={`${logolink}`} alt=""/>
                                                </div>
                                            </div>
                                            <div className="review-media">
                                                {(function() {
                                                    if(mediatype == 'youtube'){
                                                        return <YouTube videoId={medialink} />;
                                                    }else{
                                                        if(mediatype == 'vimeo'){
                                                            return <Vimeo width={640} height={380} video={medialink} />
                                                        }else{
                                                            if(mediatype == 'video'){
                                                               return <VideoJS options={videoJsOptions}/>
                                                            }else{
                                                               return <img width="100%" height="300" src={medialink} alt="Project"/>
                                                            }
                                                        }
                                                    }
                                                })()}
                                   

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
                                            <div className="review-content" dangerouslySetInnerHTML={{ __html: descriptions }}>
                                            </div>
                                            <div className="review-tags">
                                                <h3>Tags</h3>
                                                <ul>
                                                    {
                                                       tags ?  tags.map((name, index) => (
                                                            <li key={index}>
                                                                {name}
                                                                </li>
                                                            )):''
                                                    }                                                   
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                    <div>
                                        <button onClick={previous} type="button" name="previous" className="previous action-button"><i
                                        className="uil uil-arrow-left  "></i> Previous
                                        </button>
                                    </div>
                                        

                                     <div className="w-25 h-100">
                                        <Select
                                                    options={alloptions} 
                                                    value={optionSelected}
                                                    onChange={handleChange}
                                                    styles={SelectStyleWithScrollbar}
                                                    className="Select"
                                            />
                                     </div>
                                            
                                    
                                        
                                    {/* <Form.Select aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select> */}
                                        <div>
                                            <button type="button" onClick={goToShowproject}  className="submit action-button">Review <i
                                        className="uil uil-arrow-right"></i></button>
                                        </div>
                                        
                                    
                                    {/* <NavLink className="submit action-button" to={`show/${project_id}`}>Review <i
                                    className="uil uil-arrow-right"></i></NavLink> */}
                                   

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