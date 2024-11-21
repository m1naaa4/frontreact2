import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import $ from "jquery";
import 'jquery-validation'
import Spinner from 'react-bootstrap/Spinner'
import DatePicker from "react-datepicker";
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TypeFilterMentors from '../FilterMentors/TypeFilterMentors';
import SectorFilterMentors from '../FilterMentors/SectorFilterMentors';
import ZoneFilterMentors from '../FilterMentors/ZoneFilterMentors';
import AssistanceFilterMentors from '../FilterMentors/AssistanceFilterMentors';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { CreateMentorAction, GetMentor } from '../../../store/actions/Mentor/MentorActions';


const FirstStepMentor = ( {formData, setForm, navigation} ) => {
    const dispatch = useDispatch();
    const { date } = formData;
    const [startDate, setStartDate] = useState();
    const { t } = useTranslation();
    const [is_loading, setIsLoading] = useState(false);
    const project = useSelector(state => state.mentors.mentor);
    const [logo, setLogo] = useState();
    const [selectData, setselectData] = useState();
    const [picture, setPicture] = useState(null);

    const history = useHistory();
    const location = useLocation();

    const changeDate = (state) => {
        setStartDate(state);
        formData.date = state;
    };

    const changeAccompagnateur = (state) => {
        setselectData(state);
        let values = [];
        state.map((key) => {
            values.push(key.value)
        });
        formData.accompagnateurs = values;
    };

    const SelectStyleWithScrollbar = {
        indicatorSeparator: () => ({
            display: 'none',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#e8fbf1" : "white",
            color: "black",
            textAlign: 'center',
            "&:hover": {
                backgroundColor: "#e8fbf1",
            },
            '&:last-child ': {
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px',
            }
        }),

        menu: (provided) => ({
            ...provided,
            borderRadius: "15px",
            overflow: 'hidden',
            border: '0.5px solid #00b602',
            zIndex: '999'
        }),

        menuList: (provided, state) => ({
            ...provided,
            // border: '1px solid green',
            borderRadius: "15px",
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
            borderRadius: '15px',
            border: '1px solid #F5F5F5',
            fontSize: '12px',
            height: '50px',
            "&:hover": {
                boxShadow: "none",
            },
        }),
        valueContainer:(base) => ({
            ...base,
            height: '50px',
            padding: '2px 15px',
          })
    }

    const projectId = useMemo(
        () => location.pathname.split('/')[location.pathname.split('/').length - 1],
        [location.pathname]
    );

    const onChange = e => {
        setLogo(e.target.files[0]);
        setPicture(URL.createObjectURL(e.target.files[0]) );
    };

    useEffect(() => {
        if (projectId === "create" || project === "loading" || !project) {
            return;
        }
        setLogo('');

        const teams = project.accompagnateurs.map((value) => ({
            value: value,
            label: value
        }))
        setselectData(
            teams
        );

        setPicture(project.logo);
        formData.title = project.name;
        formData.type = project.type;
        formData.assistance = project.assistance;
        formData.sector_id = project.sector;
        formData.zone   = project.zone;
        formData.url = project.website ? project.website : '';
        formData.phone = project.phone;
        formData.date = project.date_limit;
        formData.project_id = project.id;
        formData.accompagnateurs = project.accompagnateurs;
    }, [projectId, project]);

    useEffect(() => {
        const { go } = navigation;
        const steps = ['step2', 'step3', 'final'];
        if (steps.includes(projectId)) {
            go(projectId)
        } else {
            go('step1')
        }
    }, []);

    useEffect(() => {
        if (projectId !== "create" && projectId !== "step2" && projectId !== "step3" && projectId !== "final") {
            dispatch(GetMentor('/' + projectId));
        }
    }, [dispatch]);

    async function callApi(value) {

      const _url = `${process.env.REACT_APP_API_URL}`+'/user/getusers';
      let _body = JSON.stringify({
          search: value,
      });
      const _headers = {
          'Authorization': localStorage.getItem('user-token'),
          'Content-type': 'application/json; charset=UTF-8',
      };
      const _options = { method: 'POST', headers: _headers, body: _body };

      const data = fetch(_url, _options)
          .then((res) => res.json())
          .then((json) => json.users)
          .then((response) => response.map(mapResponseToValuesAndLabels));
      return data;
    }

    const mapResponseToValuesAndLabels = (data) => ({
        value: data.email,
        label: <span><div>
                    <img style={{width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden'}} 
                    src={data.profile.avatar_link ? data.profile.avatar_link : '/assets/images/avatar.png'} className="uil uil-apps" alt=''/> {data.profile.username}</div>
                </span>
        
    });

    const handleSubmitValue = (e) => {
        e.preventDefault();
        if($("#form-wizard-funder").valid()){
            setIsLoading(true)
            dispatch(CreateMentorAction(formData, '/create', navigation, history, 'step2', logo));
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
                                </div>
                                < img src = "/assets/images/bailleur-thumb.svg" />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <form id="form-wizard-funder" className="form-wizard" action="" method="post">
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
                                                <input type="text" name="title" onChange={setForm} value={formData.title}
                                                        placeholder={t('title')} className="wizard-required" required/>
                                            </div>
                                            {/* <div className="col-md-6 input-row input-select">
                                                <AssistanceFilterMentors  formData={formData}/>
                                            </div> */}
                                            <div className="col-md-6 input-row input-select">
                                                <TypeFilterMentors formData={formData}/>
                                            </div>
                                            {/* <div className="col-md-6 input-row input-select">
                                                <SectorFilterMentors  formData={formData}/>
                                            </div> */}
                                            <div className="col-md-6 input-row input-select">
                                                <ZoneFilterMentors formData={formData}/>
                                            </div>
                                            {/* <div className="col-md-6 input-row"> 
                                                <DatePicker className="form-control" name="date" placeholderText={t('funder.form.date')} minDate={new Date()} selected={startDate} onChange={changeDate} value={formData.date} />
                                            </div> */}
                                            {/* <div className="col-md-6 input-row">
                                                <AsyncCreatableSelect
                                                    isMulti
                                                    cacheOptions
                                                    loadOptions={callApi}
                                                    placeholder="Search for a user"
                                                    styles={SelectStyleWithScrollbar}
                                                    onChange={(data) => {
                                                    changeAccompagnateur(data);
                                                    }}
                                                    value={selectData}
                                                />
                                            </div> */}
                                            <div className="col-md-6 input-row">
                                                <input type="text" name="phone" onChange={setForm} value={formData.phone} placeholder={t('phone')} className="wizard-required"/>
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <div className="custom-file">
                                                    <input type="file"  name="logolink" onChange={onChange}
                                                    className="custom-file-input" id="customFile"/>
                                                    <label className="custom-file-label" htmlFor="customFile">{!picture ?( t('form.add_logo')): ''}<img 
                                                    style={{width:"50px", height:"46px", border: "0px"}} alt={picture} className="playerProfilePic_home_tile"  src={picture && picture}></img></label>
                                                </div>
                                            </div>
                                            <div className="col-md-12 input-row">
                                                <input type="text" name="url" defaultValue={formData.url} placeholder={t('website')} className="wizard-required" onChange={setForm} />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" onClick={(event) => { handleSubmitValue(event);}} name="next" className="next action-button" disabled={is_loading ? "disbaled" : ""} >{t('next')}                                    
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
};

export default FirstStepMentor;