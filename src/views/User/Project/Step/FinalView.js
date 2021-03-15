import React  from 'react'
import { Player } from 'video-react';




export default function FinalView({formData, setFormData, navigation, props}) {

    const { project_status, project_area, funding_search, tag, descriptions, name,  sector_id, url, media, project_id } = formData;
    const {previous} = navigation;

    const goToShowproject = () => {
        props.history.push('/project/show', { id: project_id });
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
                                <img src="/assets/images/offer-thumbnail.svg"/>
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
                                                    <img src="assets/images/porject-logo.png" alt=""/>
                                                </div>
                                            </div>
                                            <div className="review-media">

                                                {/* <Player width="300" height="300"
                                                        playsInline
                                                        poster="/assets/poster.png"
                                                        src={`${url}`}
                                                /> */}

                                                {
                                                    `${media}` === 'video' ? (
                                                        <Player width="100%" height="100%"
                                                            playsInline
                                                            poster="/assets/poster.png"
                                                            src={url}
                                                        />) : (<img width="100%" height="300" src={url} alt="Project"/>)
                                                }


                                            </div>
                                            <div className="review-meta">
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Project Status</label>
                                                    <span>{`${project_status}`}</span>
                                                </div>
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Secteurs d'activité</label>
                                                    <span>{`${sector_id}`}</span>
                                                </div>
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Zones du projet</label>
                                                    <span>{`${project_area}`}</span>
                                                </div>
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Financement</label>
                                                    <span>{`${funding_search}`}</span>
                                                </div>
                                            </div>
                                            <div className="review-content">
                                                <p>{`${descriptions}`}</p>

                                            </div>
                                            <div className="review-tags">
                                                <h3>Tags</h3>
                                                <ul>
                                                    {
                                                       tag ?  tag.map((name, index) => (
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
                                    <button type="button" onClick={goToShowproject}  className="submit action-button">Review <i
                                        className="uil uil-arrow-right"></i></button>
                                    {/*<select className="post-status" name="">
                                        <option disabled selected>Statut de l’offre</option>
                                        <option value="publish">Publier</option>
                                        <option value="darft">Brouillon</option>
                                    </select>*/}
                                </fieldset>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}