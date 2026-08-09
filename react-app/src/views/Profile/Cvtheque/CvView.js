import React, { useEffect, useState } from 'react'
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
import { ClearProjectsAction, getMyOffresAction } from '../../../store/actions/User/Project/ProjectAction';
import { Link, useParams } from 'react-router-dom';
import BioSkeleton from '../../../skeleton/profile/BioSkeleton';
import { useTranslation } from 'react-i18next';

export default function CvView() {
  const [show, setShow] = useState(false);
  const [showstudies, setShowstudies] = useState(false);
  const [showexperience, setShowexperience] = useState(false);
  const [action, setAction] = useState(false);
  const { t } = useTranslation();
  const params = useParams();

  const settings = { dots: false, infinite: true, speed: 500, slidesToShow: 2, slidesToScroll: 1 };
  const cvtheque = useSelector(state => state.infoProfile?.cvtheque);
  const loading1 = useSelector(state => state.offres.loading);
  const loading2 = useSelector(state => state.infoProfile?.loading);
  const realizations = useSelector(state => state.offres.offres);
  const user = useSelector(state => state.userProfile.userProfile);
  const profile = useSelector(state => state.infoProfile?.infoprofile);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseStudies = () => setShowstudies(false);
  const handleShowStudies = () => setShowstudies(true);
  const handleCloseExperience = () => setShowexperience(false);
  const handleShowExperience = () => setShowexperience(true);

  useEffect(() => {
    dispatch(getCvthequeAction({ user_profile_id: params.id }, '', ''));
    dispatch(getMyOffresAction({ action: 'getmyprojectlist', user_profile_id: params.id }, '', ''));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (user?.profile_id) setAction(user.profile_id === params.id);
  }, [user?.profile_id, params.id]);

  const deleteSkill = (id) => dispatch(CvdeleteAction({ skills: { index: id } }, '', ''));
  const clearProject = () => dispatch(ClearProjectsAction());

  if (loading1 || loading2) return <BioSkeleton />;

  return (
    <div className="col-12">
      <div className="Center-Side">
        <div className="Profile-Bio-Split">
          <div className="Profile-Bio-Main">
            <div className="Profile-Sections">
              <div className="Profile-Section">
                {action && <button type="button" className="UpdateInfos-BTN" onClick={handleShow}><i className="uil uil-pen"></i></button>}
                <Modal show={show} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <SkillsModal show={show} handleClose={handleClose} centred />
                </Modal>
                <h3 className="Profile-Section-Title"><i className="uil uil-bag"></i> Skills</h3>
                <div className="Profile-Skills">
                  <ul>{cvtheque?.skills?.map((skill, index) => (
                    <li key={index}><span>{skill.name}</span>{action && <button className="delete-skill" onClick={() => deleteSkill(skill.index)}><i className="uil uil-trash"></i></button>}</li>
                  ))}</ul>
                </div>
              </div>
              <div className="Profile-Section">
                {action && <button type="button" className="UpdateInfos-BTN" onClick={handleShowStudies}><i className="uil uil-plus"></i></button>}
                <Modal show={showstudies} onHide={handleCloseStudies} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" centred aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <StudieModal showstudies={showstudies} handleCloseStudies={handleCloseStudies} centred />
                </Modal>
                <h3 className="Profile-Section-Title"><i className="uil uil-graduation-cap"></i> Etudes</h3>
                <ul className="Section-Items">{cvtheque?.etudes?.map((study, index) => <StudieGrid study={study} key={index} />)}</ul>
              </div>
              <div className="Profile-Section">
                {action && <button type="button" className="UpdateInfos-BTN" onClick={handleShowExperience}><i className="uil uil-plus"></i></button>}
                <Modal show={showexperience} onHide={handleCloseExperience} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <ExperienceModal showexperience={showexperience} handleCloseExperience={handleCloseExperience} centred />
                </Modal>
                <h3 className="Profile-Section-Title"><i className="uil uil-briefcase"></i> Experiences</h3>
                <ul className="Section-Items">{cvtheque?.experiences?.map((experience, index) => <ExperienceGrid key={index} experience={experience} />)}</ul>
              </div>
              <div className="Profile-Section">
                {action && <Link className="UpdateInfos-BTN" to={`/project/create`} onClick={clearProject}><i className="uil uil-plus"></i></Link>}
                <h3 className="Profile-Section-Title"><i className="uil uil-presentation"></i> Réalisations</h3>
                <Slider {...settings}>
                  {realizations?.projects?.map((realization, index) => (
                    <div className="Portfolio-Item" key={index}><RealizationGrid realization={realization} /></div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          <aside className="Profile-Bio-Side">
            <div className="Widget-BOX Profile-Info">
              <h3 className="Widget-Title">{t('profile') || 'Profil'}</h3>
              <div className="Profile-Side-Card">
                <div className="Profile-Side-Name">{profile?.firstname ? `${profile.firstname} ${profile.lastname}` : profile?.username}</div>
                <div className="Profile-Side-Line">{profile?.job}</div>
                <div className="Profile-Side-Line">{profile?.country || profile?.address}</div>
              </div>
            </div>

            <div className="Widget-BOX Profile-Info">
              <h3 className="Widget-Title">{t('bio')}</h3>
              <p className="Profile-Side-Text">{profile?.about || t('noresultfound')}</p>
            </div>

            <div className="Widget-BOX Profile-Info">
              <h3 className="Widget-Title">{t('contact') || 'Contact'}</h3>
              <ul className="Profile-Side-List">
                <li>{profile?.phone}</li>
                <li>{profile?.email}</li>
                <li>{profile?.sector}</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
