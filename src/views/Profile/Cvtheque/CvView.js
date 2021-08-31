import React, {useEffect, useState } from 'react'
import SkillsModal from './Modals/SkillsModal'
import { Modal } from 'react-bootstrap';
import StudieModal from './Modals/StudieModal';
import ExperienceModal from './Modals/ExperienceModal';
import StudieGrid from './Collapse/StudieGrid';
import ExperienceGrid from './Collapse/ExperienceGrid';
import { useDispatch, useSelector } from 'react-redux';
import { CvdeleteAction, getCvthequeAction } from '../../../store/actions/Profile/UserActions';


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

    const dispatch = useDispatch();

    useEffect(() => {        
        dispatch(getCvthequeAction('', '', ''));
    },[dispatch])

    const cvtheque = useSelector(state => state.infoProfile?.cvtheque);

    const deleteSkill =(id) =>{
      let data = {
        skills : {index : id}
          }
      dispatch(CvdeleteAction(data, '', ''));
    }

    return (
        
        <div className="col-md-6">
            <div className="Center-Side">
            <div className="Profile-Sections">


              <div className="Profile-Section">
                <button type="button" className="UpdateInfos-BTN" onClick={handleShow} data-toggle="modal" data-target="#SkillsModal"><i className="uil uil-pen"></i></button>

                <Modal show={show} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <SkillsModal show={show} handleClose={handleClose}/>
                </Modal>

                <h3 className="Profile-Section-Title"><i className="uil uil-bag"></i> Skills</h3>
                <div className="Profile-Skills">
                  <ul>
                    {cvtheque?.skills &&
                        cvtheque.skills.map((skill, index) => (
                            <li key={index}><span>{skill.name}</span><button className="delete-skill" onClick={e => deleteSkill(skill.index)}><i className="uil uil-trash"></i></button></li>
                        ))
                    } 
                  </ul>
                </div>
              </div>
              <div className="Profile-Section">
                <button type="button" className="UpdateInfos-BTN" onClick={handleShowStudies} data-toggle="modal" data-target="#EtudeModal"><i className="uil uil-plus"></i></button>
                
                <Modal show={showstudies} onHide={handleCloseStudies} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <StudieModal showstudies={showstudies} handleCloseStudies={handleCloseStudies}/>
                </Modal>
                
                <h3 className="Profile-Section-Title"><i className="uil uil-graduation-cap"></i> Etudes</h3>
                <ul className="Section-Items">
                    {cvtheque?.etudes &&
                        cvtheque?.etudes.map((study, index) => (
                        <div key={index}>
                            <StudieGrid study={study}/>
                        </div>     
                    ))
                    }
                    
                </ul>
              </div>
              <div className="Profile-Section">
                <button type="button" className="UpdateInfos-BTN" onClick={handleShowExperience} data-toggle="modal" data-target="#ExperienceModal"><i className="uil uil-plus"></i></button>
                
                <Modal show={showexperience} onHide={handleCloseExperience} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <ExperienceModal showexperience={showexperience} handleCloseExperience={handleCloseExperience}/>
                </Modal>
                
                <h3 className="Profile-Section-Title"><i className="uil uil-bag"></i> Experiences</h3>
                <ul className="Section-Items">
                {cvtheque?.experiences &&
                        cvtheque.experiences.map((experience, index) => (
                        <div key={index}>
                            <ExperienceGrid experience={experience}/>
                        </div>     
                    ))
                    }
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
