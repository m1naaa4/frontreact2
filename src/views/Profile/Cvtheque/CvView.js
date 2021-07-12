import React, { useState } from 'react'
import SkillsModal from './Modals/SkillsModal'
import { Modal } from 'react-bootstrap';
import StudieModal from './Modals/StudieModal';
import ExperienceModal from './Modals/ExperienceModal';


export default function CvView(props) {
    const [show, setShow] = useState(false);
    const [showstudies, setShowstudies] = useState(false);
    const [showexperience, setShowexperience] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseStudies = () => setShowstudies(false);
    const handleShowStudies = () => setShowstudies(true);

    
    const handleCloseExperience = () => setShowexperience(false);
    const handleShowExperience = () => setShowexperience(true);


    console.log('i am here now')
    return (
        
        <div className="col-md-6">
            <div className="Center-Side">
            <div className="Profile-Sections">


              <div className="Profile-Section">
                <button type="button" className="UpdateInfos-BTN" onClick={handleShow} data-toggle="modal" data-target="#SkillsModal"><i className="uil uil-pen"></i></button>

                <Modal show={show} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <SkillsModal/>
                </Modal>

                <h3 className="Profile-Section-Title"><i className="uil uil-bag"></i> Skills</h3>
                <div className="Profile-Skills">
                  <ul>
                    <li><span>Skill 1</span><button className="delete-skill"><i className="uil uil-trash"></i></button></li>
                    <li><span>Skill 2</span><button className="delete-skill"><i className="uil uil-trash"></i></button></li>
                    <li><span>Skill 3</span><button className="delete-skill"><i className="uil uil-trash"></i></button></li>
                    <li><span>Skill 4</span><button className="delete-skill"><i className="uil uil-trash"></i></button></li>
                    <li><span>Skill 5</span><button className="delete-skill"><i className="uil uil-trash"></i></button></li>
                  </ul>
                </div>
              </div>
              <div className="Profile-Section">
                <button type="button" className="UpdateInfos-BTN" onClick={handleShowStudies} data-toggle="modal" data-target="#EtudeModal"><i className="uil uil-plus"></i></button>
                
                <Modal show={showstudies} onHide={handleCloseStudies} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <StudieModal/>
                </Modal>
                
                <h3 className="Profile-Section-Title"><i className="uil uil-graduation-cap"></i> études</h3>
                <ul className="Section-Items">
                  <li className="Section-Item">
                    <label>2012 - Bac G2</label>
                    <span>Lycée Technique BAF Cameroun</span>
                    <button type="button" className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
                    <div className="CollapsUpdate">
                        
                      <form className="" action="index.html" method="post">
                        <div className="form-inputs">
                          <div className="form-row">
                            <div className="col-md-6 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Date début" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row input-flex">
                              <input type="text" name="project-areas" value="" placeholder="Date fin" className="wizard-required" required/>
                              <label className="container-checkbox">
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                                <span>Présent</span>
                              </label>
                            </div>
                            <div className="col-md-12 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Établissement" className="wizard-required" required/>
                            </div>
                            <div className="col-md-12 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Lieu" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Diplôme obtenu" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row input-select input-select-multi">
                              <select className="project-status" name="project-status" required >
                                <option selected disabled>Catégorie</option>
                                <option value="Porteur de projet">Porteur de projet</option>
                                <option value="Bailleurs de fonds">Bailleurs de fonds</option>
                                <option value="Mentor">Mentor</option>
                              </select>
                            </div>
                            <div className="col-md-12 input-row">
                              <textarea name="name" placeholder="Description "></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="DadupaModal-Footer">
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">

                          </div>
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                            <button type="button" className="DadupaModal-BTNSubmit">Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  <li className="Section-Item">
                    <label>2015 - Master</label>
                    <span>EMI Rabat</span><button type="button" className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
                    <div className="CollapsUpdate">
                      <form className="" action="index.html" method="post">
                        <div className="form-inputs">
                          <div className="form-row">
                            <div className="col-md-6 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Date début" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row input-flex">
                              <input type="text" name="project-areas" value="" placeholder="Date fin" className="wizard-required" required/>
                              <label className="container-checkbox">
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                                <span>Présent</span>
                              </label>
                            </div>
                            <div className="col-md-12 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Établissement" className="wizard-required" required/>
                            </div>
                            <div className="col-md-12 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Lieu" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Diplôme obtenu" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row input-select input-select-multi">
                              <select className="project-status" name="project-status" required >
                                <option selected disabled>Catégorie</option>
                                <option value="Porteur de projet">Porteur de projet</option>
                                <option value="Bailleurs de fonds">Bailleurs de fonds</option>
                                <option value="Mentor">Mentor</option>
                              </select>
                            </div>
                            <div className="col-md-12 input-row">
                              <textarea name="name" placeholder="Description "></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="DadupaModal-Footer">
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                          </div>
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                            <button type="button" className="DadupaModal-BTNSubmit">Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="Profile-Section">
                <button type="button" className="UpdateInfos-BTN" onClick={handleShowExperience} data-toggle="modal" data-target="#ExperienceModal"><i className="uil uil-plus"></i></button>
                
                <Modal show={showexperience} onHide={handleCloseExperience} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <ExperienceModal/>
                </Modal>
                
                <h3 className="Profile-Section-Title"><i className="uil uil-bag"></i> éxperiences</h3>
                <ul className="Section-Items">
                  <li className="Section-Item">
                    <label>2015 - 2016</label>
                    <span>Chargé développement Tech Agency - Cameroun</span>
                    <button type="button" className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
                    <div className="CollapsUpdate">
                      <form className="" action="index.html" method="post">
                        <div className="form-inputs">
                          <div className="form-row">
                            <div className="col-md-6 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Date début" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row input-flex">
                              <input type="text" name="project-areas" value="" placeholder="Date fin" className="wizard-required" required/>
                              <label className="container-checkbox">
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                                <span>Présent</span>
                              </label>
                            </div>
                            <div className="col-md-12 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Entreprise" className="wizard-required" required/>
                            </div>
                            <div className="col-md-12 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Poste" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Lieu" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row input-select input-select-multi">
                              <select className="project-status" name="project-status" required >
                                <option selected disabled>Catégorie</option>
                                <option value="Porteur de projet">Porteur de projet</option>
                                <option value="Bailleurs de fonds">Bailleurs de fonds</option>
                                <option value="Mentor">Mentor</option>
                              </select>
                            </div>
                            <div className="col-md-12 input-row">
                              <textarea name="name" placeholder="Description "></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="DadupaModal-Footer">
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                          </div>
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                            <button type="button" className="DadupaModal-BTNSubmit">Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  <li className="Section-Item">
                    <label>Depuis Juin 2016</label>
                    <span>Freelance à mon compte Maroc</span>
                    <button type="button" className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
                    <div className="CollapsUpdate">
                      <form className="" action="index.html" method="post">
                        <div className="form-inputs">
                          <div className="form-row">
                            <div className="col-md-6 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Date début" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row input-flex">
                              <input type="text" name="project-areas" value="" placeholder="Date fin" className="wizard-required" required/>
                              <label className="container-checkbox">
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                                <span>Présent</span>
                              </label>
                            </div>
                            <div className="col-md-12 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Entreprise" className="wizard-required" required/>
                            </div>
                            <div className="col-md-12 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Poste" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row">
                              <input type="text" name="project-areas" value="" placeholder="Lieu" className="wizard-required" required/>
                            </div>
                            <div className="col-md-6 input-row input-select input-select-multi">
                              <select className="project-status" name="project-status" required >
                                <option selected disabled>Catégorie</option>
                                <option value="Porteur de projet">Porteur de projet</option>
                                <option value="Bailleurs de fonds">Bailleurs de fonds</option>
                                <option value="Mentor">Mentor</option>
                              </select>
                            </div>
                            <div className="col-md-12 input-row">
                              <textarea name="name" placeholder="Description "></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="DadupaModal-Footer">
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                          </div>
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                            <button type="button" className="DadupaModal-BTNSubmit">Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="Profile-Section">
                <button type="button" className="UpdateInfos-BTN" data-toggle="modal" data-target="#ProjectModal"><i className="uil uil-plus"></i></button>
                <h3 className="Profile-Section-Title"><i className="uil uil-presentation"></i> réalisations</h3>
                <div id="Portfolio" className="Portfolio">
                  <div className="Portfolio-Item">
                    <button type="button" className="UpdateInfos-BTN CollapseUpdate-BTN" data-toggle="modal" data-target="#ProjectUpdateModal"><i className="uil uil-pen"></i></button>
                    <div className="Project-Thumb">

                    </div>
                    <div className="Project-Name">
                      <a href="#!" target="_blank">Project Name</a>
                    </div>
                  </div>
                  <div className="Portfolio-Item">
                    <button type="button" className="UpdateInfos-BTN CollapseUpdate-BTN" data-toggle="modal" data-target="#ProjectUpdateModal"><i className="uil uil-pen"></i></button>
                    <div className="Project-Thumb">

                    </div>
                    <div className="Project-Name">
                      <a href="#!" target="_blank">Project Name</a>
                    </div>
                  </div>
                  <div className="Portfolio-Item">
                    <button type="button" className="UpdateInfos-BTN CollapseUpdate-BTN" data-toggle="modal" data-target="#ProjectUpdateModal"><i className="uil uil-pen"></i></button>
                    <div className="Project-Thumb">

                    </div>
                    <div className="Project-Name">
                      <a href="#!" target="_blank">Project Name</a>
                    </div>
                  </div>
                  <div className="Portfolio-Item">
                    <button type="button" className="UpdateInfos-BTN CollapseUpdate-BTN" data-toggle="modal" data-target="#ProjectUpdateModal"><i className="uil uil-pen"></i></button>
                    <div className="Project-Thumb">

                    </div>
                    <div className="Project-Name">
                      <a href="#!" target="_blank">Project Name</a>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            </div>
          </div>
          
        
    )
}
