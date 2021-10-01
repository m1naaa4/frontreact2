import React, { useEffect, useState }  from 'react'
import { Player } from 'video-react';
import sectors from '../../../data/sectors';
import { useTranslation } from 'react-i18next';
import etats from '../../../data/etats';
import countries from '../../../data/countries';
import finances from '../../../data/finances';
import { AddProjectsAction } from '../../../store/actions/User/Project/ProjectAction';
import { useDispatch } from 'react-redux';

export default function FinalView({formData, setFormData, navigation, props}) {

    const { project_status, project_area, funding_search, tags, descriptions, name,  sector_id, project_id, medialink, logolink, mediatype, visibility } = formData;
    const {previous} = navigation;
    const [sector, setSector] = useState();
    const [status, setStatus] = useState();
    const [country, setCountry] = useState();
    const [finance, setFinance] = useState();
    const [visibilitys, setVisibility] = useState(visibility);

    const goToShowproject = () => {
        props.history.push('/project/show/'+ project_id );
    };
    const [t] = useTranslation();

    const dispatch = useDispatch();
    const handleSubmit = async e => {
        e.preventDefault();
        formData.visibilitys   = visibilitys;
        formData.project_id = project_id;
        formData.action     = 'create';
        dispatch(AddProjectsAction (formData, props, '/create', navigation));
    };

    useEffect(() => {
        sectors.map((key) => 
        // console.log(key[0], sector_id)
          {if (key[0] === sector_id) {
            console.log(key[0], sector_id, key[1])
            setSector(key[1])
          }}
        );

        
        etats.map((key) => 
        // console.log(key[0], sector_id)
          {if (key[0] === project_status) {
            console.log(key[0], project_status, key[1])
            setStatus(key[1])
          }}
        );

        countries.map((key) => 
        {if (key.value === project_area) {
          console.log(key.label)
          setCountry(key.label)
        }}
      );
      
      finances.map((key) => 
        {if (key[0] === funding_search) {
          setFinance(key[1])
        }}
      );



      })

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

                                                {/* <Player width="300" height="300"
                                                        playsInline
                                                        poster="/assets/poster.png"
                                                        src={`${url}`}
                                                /> */}

                                                {
                                                    `${mediatype}` === 'video' ? (
                                                        <Player width="100%" height="100%"
                                                            playsInline
                                                            poster="/assets/poster.png"
                                                            src={medialink}
                                                        />) : (<img width="100%" height="300" src={medialink} alt="Project"/>)
                                                }


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
                                    <button onClick={previous} type="button" name="previous" className="previous action-button"><i
                                        className="uil uil-arrow-left  "></i> Previous
                                    </button>
                                    {/* <Form.Select aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select> */}
                                    <button type="button" onClick={goToShowproject}  className="submit action-button">Review <i
                                        className="uil uil-arrow-right"></i></button>
                                    
                                    {/* <NavLink className="submit action-button" to={`show/${project_id}`}>Review <i
                                    className="uil uil-arrow-right"></i></NavLink> */}
                                    <select className="post-status" name="visibility" onChange={(event) => {handleSubmit(event);}}  defaultValue={visibility} onChange={setVisibility}>
                                        <option disabled selected>Project status</option>
                                        <option value="public">Public</option>
                                        <option value="shared">Shared</option>
                                        <option value="team">Team</option>
                                        <option value="private">Private</option>
                                    </select>
                                </fieldset>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}