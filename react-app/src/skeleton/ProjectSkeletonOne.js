import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Skeleton from '@material-ui/lab/Skeleton';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AskforAccessAction } from '../store/actions/Setting/SettingActions';
import { Link } from 'react-router-dom';
import AvatarTooltip from '../utils/AvatarTooltip';
import { useTranslation } from 'react-i18next';


const ProjectSkeletonGridOne = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [providername, setProvidername] = useState(localStorage.getItem('provider_name'));
    const [provider, setProvider] = useState(localStorage.getItem('provider'));
    const [owner, setOwner] = useState(JSON.parse(localStorage.getItem('owner_of_provider')));
    const [provider_id, setProvider_id] = useState(window.location.href.split("/").pop());
    const [showmodal, setShowmodal] = useState(false);
    const handleShow = () => setShowmodal(true);
    const handleClose = () => setShowmodal(false);
    const user = useSelector(state => state.userProfile.userProfile);
    const {t} = useTranslation();


    const goback = () => {
        history.push('/project/lists')
    }

    const ref = useRef();

    const handleSend = () => {
        let data = {
            'url': 'permission/askforaccess',
            'provider_id': provider_id,
            'provider': provider,
            'providername': providername,
        }
        dispatch(AskforAccessAction(data));
    }

    return (
        <div className="">
            <div className="row">
                <div className="col-12">
                    <div className="single-header text-center align-items-center">
                        <div className="single-offer-header">
                            <div className="offer-title" >
                                <h4 style={{ fontSize: "16px !important" }} className="single-offer-name">{providername}</h4>
                                <span style={{ fontSize: "18px !important", marginBottom: "30px" , fontWeight: 900}} className="text-danger">{t('no_access_to_content_alert')} </span>
                            </div>
                            <div className="Update-Post">
                                <button type="button" onClick={handleShow} name="button" data-toggle="tooltip" data-placement="bottom"
                                    title="Edit Post" className="edit-button"><i className="uil-envelope-share"></i>
                                </button>
                                {/* <NavLink 
                                        title="Edit Post"  className="edit-button" to={`update/${data.project_id}`}><i className="uil uil-pen"></i></NavLink> */}
                            </div>
                        </div>
                        <div className="d-flex justify-content-start flex-column align-items-center">
                            <img style={{ height: '40vh', width: '60vh' }} src="/assets/images/no-permission.svg" alt="Auth needed to view project" />
                            <p style={{ padding: '10px' }}>
                                {/* Ea rerum placeat sit dolores odio ad nostrum eligendi in veniam facere ex quia nulla sit neque iure. */}
                            </p>

                        </div>

                        <div>
                            <button onClick={goback} style={{ width: '200px' }} name="previous" className="previous action-button">
                                <i className="uil uil-arrow-left  "></i> {t('previous')}
                            </button>
                            <button onClick={handleShow} style={{ width: '200px', marginLeft: '20px' }} name="button" data-toggle="tooltip" data-placement="bottom"
                                title="Edit Post" className="previous action-button">
                                <i className="uil-envelope-share"></i> {t('share')}
                            </button>
                        </div>
                    </div>
                    <Modal show={showmodal} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content" style={{ padding: "0 2em" }}>
                                <div className='d-flex'>
                                    <img style={{ width: "50%", alignSelf: "center" }} src="/assets/images/ask-permission.svg" alt="ask for permission" />
                                    <div className='d-flex flex-column ml-5'>
                                        <h2>{providername}</h2>
                                        <div className="Contact mb-4">
                                            <div class="d-flex align-items-center">
                                                <div className="Contact-Thumb" ref={ref}> <Link to={`/profile/${owner.profile_id}`}><img src={owner.avatar} alt={owner.username} /></Link></div>
                                                <div className="Contact-Infos pt-0">
                                                    <Link to={`/profile/${owner.profile_id}`}><h4>{owner.username}</h4></Link>
                                                    {(user?.profile_id != owner.profile_id) && <AvatarTooltip myRef={ref} data={owner} styles={{ marginTop: "10px", marginRight: "0" }} />}
                                                </div>
                                            </div>
                                        </div>
                                        <h5>{t('no_access_to_content_popup')}</h5>
                                        <button type="button" onClick={handleSend} name="button" data-toggle="tooltip" data-placement="bottom"
                                            title="Edit Post" className="edit-button permission-button mt-auto"><i className="uil-fast-mail"></i>
                                        </button>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </Modal>
                    {/* <div className="Company-Infos">
                            <div className="Company-Left">
                                <div className="single-offer-logo">
                                    <Skeleton variant="rect" height={45} width={45} />
                                </div>
                                <div className="Company-Name"></div>
                                <div className="Company-Email"><Skeleton height={20} width={200} /></div>
                                <div className="Company-Addresse"><Skeleton height={20} width={200} /></div>
                            </div>
                            <div className="Company-Right">
                                <div className="Company-Phone"><Skeleton height={20} width={100} /></div>
                            </div>
                        </div>
                        <div className="Content-Wrap">
                            <div className="Signle-Offer-Media">
                                <Skeleton height={400}  /> 
                            </div>
            
                            <div className="Signle-Offer-Content">
                                <div className="reactions-wrap">
                                    <div className="reactions-box">
                                        
                                    </div>
                                </div>
                                <div className="reactions-buttons">
                                    
                                </div>
                                <div className="Signle-Offer-Text">
                                    <Skeleton height={20}  />
                                    <Skeleton height={20}  />
                                    <Skeleton height={20}  />
                                    <Skeleton height={20} />
                                    <Skeleton height={20} width={500} />
                                </div>
            
                            </div>
                        </div> */}
                </div>
                {/* <div className="col-md-4">
                        <div className="Single-Offer-Details">
                            <ul className="Offer-Details-List">
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}  /></label>
                                    <span> <Skeleton height={20} width={150} /></span>
                                </li>
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}   /></label>
                                    <span> <Skeleton height={20}  width={150} /></span>
                                </li>
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}   /></label>
                                    <span> <Skeleton height={20}  width={150} /></span>
                                </li>
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}   /></label>
                                    <span> <Skeleton height={20}  width={150} /></span>
                                </li>
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}   /></label>
                                    <span> <Skeleton height={20}  width={150} /></span>
                                </li>
                            </ul>
                        </div>
                    </div> */}
            </div>
        </div>
    )
}
export default ProjectSkeletonGridOne