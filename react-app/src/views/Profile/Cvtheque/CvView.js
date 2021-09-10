import React, {useEffect, useState } from 'react'
import SkillsModal from './Modals/SkillsModal'
import { Modal } from 'react-bootstrap';
import StudieModal from './Modals/StudieModal';
import ExperienceModal from './Modals/ExperienceModal';
import StudieGrid from './Collapse/StudieGrid';
import ExperienceGrid from './Collapse/ExperienceGrid';
import { useDispatch, useSelector } from 'react-redux';
import { CvdeleteAction, getCvthequeAction } from '../../../store/actions/Profile/UserActions';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RealizationGrid from '../Realization/RealizationGrid';
import { getMyOffresAction } from '../../../store/actions/User/Project/ProjectAction';


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

    const realizations = useSelector(state => state.offres.offres);

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };

    const cvtheque = useSelector(state => state.infoProfile?.cvtheque);
    const infoProfile = useSelector(state => state.infoProfile);
    
    const dispatch = useDispatch();

    useEffect(() => {
        let data = {
            action : 'getmyprojectlist'
        }
        let dataa ={
          user_id : infoProfile.user_id
        }
        dispatch(getCvthequeAction(dataa, '', ''));
        dispatch(getMyOffresAction(data, '', ''));
    },[dispatch])

    
    console.log('ttttttttttttttttttt', useSelector(state => state.infoProfile))

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
                <Slider {...settings}>

                        {realizations?.projects &&
                            realizations?.projects.map((realization, index) => (
                              <div className="Portfolio-Item">
                                <RealizationGrid realization={realization}/>
                              </div>
                        ))
                        }

                    
                </Slider>
                
                
              
              </div>


            </div>
            </div>
          </div>
          
        
    )
}
