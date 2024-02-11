import React  from 'react'
import {useDispatch, useSelector} from "react-redux";
import SectorDropFilter from "../Fields/Filter/Project/SectorDropFilter";
import EtatDropFilter from "../Fields/Filter/Project/EtatDropFilter";
import FinanceDropFilter from "../Fields/Filter/Project/FinanceDropFilter";
import ZoneDropFilter from "../Fields/Filter/Project/ZoneDropFilter";
import {AddProjectsAction} from "../../../store/actions/Project/AddProjectAction";

export default function AddProject({filterInput, setFilterInput, props}) {


    const dispatch = useDispatch();
    const { etat, zone, financement, logo, look_angel, look_mentor, name,  sector, step, url } = filterInput;

    const handleSubmitValue = (e) => {
        e.preventDefault();
        dispatch(AddProjectsAction(filterInput, props));
    }

    const project = useSelector(state => state.aadproject);

    ///  if success go to 2 step  ( condiition on project after request    dont forget)


    return (

        <div className="Page-Wrapper">
            <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 d-md-none d-lg-block">

                            <div className="page-header">
                                <h3>{t('project.add.detail_offre')}</h3>
                                <p>Enter details about the project <br/>to preceed further</p>
                                <img src="/assets/images/offer-thumbnail.svg"/>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <form id="form-wizard" className="form-wizard" action="" method="post">
                                <ul id="wizardbar">
                                    <li className="active">
                                        <div className="Step-Number"><span>1</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('project.add.detail_offre')}</div>
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
                                                <input type="text" name="name" onChange={setFilterInput} value={name}
                                                       placeholder="Nom du projet" className="wizard-required" required/>
                                            </div>
                                            <div className="col-md-6 input-row input-select">
                                                <EtatDropFilter value={etat} onChange={setFilterInput}/>
                                            </div>

                                            <div className="col-md-6 input-row input-select">
                                                <SectorDropFilter value={sector} onChange={setFilterInput} />
                                            </div>
                                            <div className="col-md-12 input-row">
                                                <ZoneDropFilter field='project_area' value={zone}  onChange={setFilterInput}/>
                                            </div>
                                            <div className="col-md-12 input-row input-select">
                                                <FinanceDropFilter value={financement}  onChange={setFilterInput}/>
                                            </div>
                                            <div className="col-md-12 input-row">
                                                <div className="custom-file">
                                                    <input type="file"  onChange={setFilterInput} className="custom-file-input" id="customFile"/>
                                                        <label className="custom-file-label" htmlFor="customFile">Ajouter
                                                            le logo</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 input-row">
                                                <div className="custom-control custom-switch">
                                                    <input type="checkbox" onChange={setFilterInput}   className="custom-control-input" id="switch1"
                                                           name="angel"/>
                                                        <label className="custom-control-label" htmlFor="switch1">Je
                                                            cherche des mentors</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 input-row">
                                                <input type="text" value={url} name="url" onChange={setFilterInput}
                                                       placeholder="Ajouter un lien" className="wizard-required"
                                                       required/>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" onClick={handleSubmitValue} name="next" className="next action-button">Continue <i
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