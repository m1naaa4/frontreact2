import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { useLocation } from 'react-router-dom';
import { displayErrorMessages } from '../../../helpers/displayErr';
import { useTranslation } from 'react-i18next';
import $ from "jquery";
import 'jquery-validation'
import Spinner from 'react-bootstrap/Spinner'
import ZoneDropFilterFunders from '../FilterFunders/ZoneDropFilterFunders';
import SectorDropFilterFunders from '../FilterFunders/SectorDropFilterFunders';
import DatePicker from "react-datepicker";
import { CreateFunderAction } from '../../../store/actions/Funder/FunderActions'


const FirstStepFunder = ( {formData, setForm, navigation, props} ) => {
    const dispatch = useDispatch();
    const { type, zone, sector_id, phone, url, date, proposition, finances } = formData;
    const [startDate, setStartDate] = useState(date);
    const { t } = useTranslation();
    const [is_loading, setIsLoading] = useState(false);
    const project = useSelector(state => state.addproject.addproject);
    const [changed, setChanged] = useState(false);

    const changeDate = (state) => {
        setStartDate(state);
        formData.date = state;
    }

    const location = useLocation();
    useEffect(()=>{
        setChanged(true)
    },[location])

    const handleSubmitValue = (e) => {
        e.preventDefault();
        if($("#form-wizard-funder").valid()){
            setIsLoading(true)
            formData.project_id = project !== "loading" ? project?.projectid: '';
            formData.action = 'create';
              dispatch(CreateFunderAction(formData, props, '/create', navigation));
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
                                <img src="/assets/images/offer-thumbnail.svg"/>
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
                                                <select className="bailleur-de-fonds" name="type" value={type} onChange={setForm}  required>
                                                    <option key='0' value='' >{ t('funder.form.you_are')}</option>
                                                    <option key='1' value="1">{ t('funder.form.you_are.business_angle')}</option>
                                                    <option key='2' value="2">{ t('funder.form.you_are.fonds')}</option>
                                                    <option key='3' value="3">{ t('funder.form.you_are.corporate')}</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                <SectorDropFilterFunders value={sector_id} required={true} onChange={setForm} />
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                <ZoneDropFilterFunders field='project_area' name="zone" value={zone} required={true}  onChange={setForm}/>
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <input type="text" name="phone" onChange={setForm} value={phone} placeholder={t('phone')} className="wizard-required" required/>
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <input type="url" name="url" value={url} placeholder={t('url')} className="wizard-required" onChange={setForm} />
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                <select value={finances} onChange={setForm} name="finances"  required>
                                                    <option key='0' >{ t('funder.form.financement') }</option>
                                                    <option key="2500" value="2500">{ t('filter.secteur.2500') }</option>
                                                    <option key="10000" value="10000">{ t('filter.secteur.10000') }</option>
                                                    <option key="25000" value="25000">{ t('filter.secteur.25000') }</option>
                                                    <option key="40000" value="40000">{ t('filter.secteur.40000') }</option>
                                                    <option key="55000" value="55000">{ t('filter.secteur.55000') }</option>
                                                    <option key="70000" value="70000">{ t('filter.secteur.70000') }</option>
                                                    <option key="85000" value="85000">{ t('filter.secteur.85000') }</option>
                                                    <option key="100000" value="100000">{ t('filter.secteur.100000') }</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 input-row"> 
                                                <DatePicker className="form-control" name="date" placeholderText={t('funder.form.date')} minDate={new Date()} selected={startDate} onChange={changeDate} value={startDate} />
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <div className="custom-control custom-switch">
                                                    <input type="checkbox" value={proposition} name="proposition" onChange={setForm} className="custom-control-input" id="switch1" />
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