import React  from 'react'
import { Player } from 'video-react';
import {useSelector} from "react-redux";




export default function FinalView({filterInput, setFilterInput, navigation, props}) {

    const {previous, next} = navigation;
    const project = useSelector(state => state.addproject);
    const fileurl = useSelector(state => state.fileuploaded);
    console.log("here", fileurl.url.url)



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
                                                <h2 className="review-offer-title">Offer title</h2>
                                                <div className="review-offer-logo">
                                                    <img src="assets/images/porject-logo.png" alt=""/>
                                                </div>
                                            </div>
                                            <div className="review-media">

                                                <Player width="300" height="300"
                                                        playsInline
                                                        poster="/assets/poster.png"
                                                        src={fileurl.url.url}
                                                />
                                            </div>
                                            <div className="review-meta">
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Project Status</label>
                                                    <span>Public</span>
                                                </div>
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Secteurs d'activité</label>
                                                    <span>Agri</span>
                                                </div>
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Zones du projet</label>
                                                    <span>Maroc</span>
                                                </div>
                                                <div className="review-meta-item">
                                                    <label htmlFor="">Financement</label>
                                                    <span>$100.000</span>
                                                </div>
                                            </div>
                                            <div className="review-content">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                    labore et dolore magna aliqua. In hac habitasse platea dictumst vestibulum rhoncus est. Nibh
                                                    tortor id aliquet lectus proin nibh nisl condimentum id. Interdum velit laoreet id donec
                                                    ultrices tincidunt arcu non sodales. Eget felis eget nunc lobortis mattis aliquam faucibus purus
                                                    in. Cras adipiscing enim eu turpis egestas pretium. Ornare suspendisse sed nisi lacus. Nibh
                                                    venenatis cras sed felis. Elementum tempus egestas sed sed risus pretium quam vulputate. Cursus
                                                    eget nunc scelerisque viverra mauris in aliquam sem fringilla. Id diam vel quam elementum.
                                                    Mattis rhoncus urna neque viverra. Ut aliquam purus sit amet. Vulputate odio ut enim blandit
                                                    volutpat maecenas. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Interdum
                                                    posuere lorem ipsum dolor sit amet consectetur. Nisl suscipit adipiscing bibendum est ultricies
                                                    integer quis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis.</p>

                                                <p>Sed augue lacus viverra vitae congue eu consequat. Viverra vitae congue eu consequat ac felis
                                                    donec et odio. Faucibus purus in massa tempor nec. Egestas fringilla phasellus faucibus
                                                    scelerisque eleifend donec pretium. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras
                                                    fermentum odio. Dolor magna eget est lorem ipsum dolor sit amet. Sed arcu non odio euismod
                                                    lacinia. Facilisis volutpat est velit egestas dui id ornare arcu odio. In fermentum posuere urna
                                                    nec tincidunt praesent semper. Morbi tristique senectus et netus et.</p>
                                            </div>
                                            <div className="review-tags">
                                                <h3>Tags</h3>
                                                <ul>
                                                    <li>Tag</li>
                                                    <li>Tag</li>
                                                    <li>Tag</li>
                                                    <li>Tag</li>
                                                    <li>Tag</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={previous} type="button" name="previous" className="previous action-button"><i
                                        className="uil uil-arrow-left  "></i> Previous
                                    </button>
                                    <button type="submit" name="submit" className="submit action-button">Review <i
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