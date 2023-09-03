import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import $ from "jquery";
import 'jquery-validation'
import Spinner from 'react-bootstrap/Spinner'
import ZoneFilterFunders from '../FilterFunders/ZoneFilterFunders';
import SectorFilterFunders from '../FilterFunders/SectorFilterFunders';
import DatePicker from "react-datepicker";
import { CreateFunderAction, GetFunder } from '../../../store/actions/Funder/FunderActions'
import FinanceFilterFunders from '../FilterFunders/FinanceFilterFunders';
import TypeFilterFunder from '../FilterFunders/TypeFilterFunders';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const FirstStepFunder = ( {formData, setForm, navigation} ) => {
    const dispatch = useDispatch();
    const { date } = formData;
    const [startDate, setStartDate] = useState();
    const { t } = useTranslation();
    const [is_loading, setIsLoading] = useState(false);
    const project = useSelector(state => state.funders.funder);
    const [logo, setLogo] = useState();

    const history = useHistory();
    const location = useLocation();

    const changeDate = (state) => {
        setStartDate(state);
        formData.date = state;
    };

    const projectId = useMemo(
        () => location.pathname.split('/')[location.pathname.split('/').length - 1],
        [location.pathname]
    );

    useEffect(() => {
        if (projectId === "create" || project === "loading" || !project) {
            return;
        }
        setLogo('');
        formData.type = project.type;
        formData.sector_id = project.sector;
        formData.zone   = project.zone;
        formData.website = project.website ? project.website : '';
        formData.finance = project.finance;
        formData.look_mentor = project.look_mentor;
        formData.url = project.website ? project.website : '';
        formData.phone = project.phone ? project.phone: '';
        formData.date = project.date_limit;
        formData.project_id = project.id
    }, [projectId, project]);

    useEffect(() => {
        const {go} = navigation;
        const steps = ['step2', 'step3', 'final'];
        if (steps.includes(projectId)) {
            go(projectId)
        } else {
            go('step1')
        }
    }, []);

    useEffect(() => {
        if (projectId !== "create" && projectId !== "step2" && projectId !== "step3" && projectId !== "final") {
            dispatch(GetFunder('/' + projectId));
        }
    }, [dispatch]);

    const handleSubmitValue = (e) => {
        e.preventDefault();
        if($("#form-wizard-funder").valid()){
            setIsLoading(true)
              dispatch(CreateFunderAction(formData, '/create', navigation, history, 'step2'));
        }
    }
    
    return (
        <div className="Page-Wrapper">
            <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 d-md-none d-lg-block">
                            <div className="page-header">
                                <h3>{t('project.add.detail_offre')} </h3>
                                <div id="authErr"></div>
                                <div id="authResponse">
                                </div>
                                <img src="/assets/images/financement-thumb.svg"/>
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
                                            <div className="col-md-12 input-row input-select">
                                                <TypeFilterFunder formData={formData}/>
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                <SectorFilterFunders  formData={formData}/>
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                <ZoneFilterFunders formData={formData}/>
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <input type="text" name="phone" onChange={setForm} value={formData.phone} placeholder={t('phone')} className="wizard-required"/>
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <input type="text" name="url" value={formData.url} placeholder={t('website')} className="wizard-required" onChange={setForm} />
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                <FinanceFilterFunders formData={formData}/>
                                            </div>
                                            <div className="col-md-6 input-row"> 
                                                <DatePicker className="form-control" name="date" placeholderText={t('funder.form.date')} minDate={new Date()} selected={startDate} onChange={changeDate} value={formData.date} />
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <div className="custom-control custom-switch">
                        <input type="checkbox" defaultChecked={formData.look_mentor}  onChange={setForm} k={formData.look_mentor}   className="custom-control-input" id="switch1"
                                name="look_mentor"/>
                                                    <label className="custom-control-label" htmlFor="switch1"><span>{ t('funder.form.proposition')}</span></label>
                                                </div>
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

export default FirstStepFunder;