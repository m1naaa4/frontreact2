import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import Skeleton from '@material-ui/lab/Skeleton';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AskforAccessAction } from '../store/actions/Setting/SettingActions';
import { Link } from 'react-router-dom';


const ProjectSkeletonGridOne = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [providername, setProvidername] = useState(localStorage.getItem('provider_name'));
    const [provider, setProvider] = useState(localStorage.getItem('provider'));
    const [ownerName, setOwner] = useState(localStorage.getItem('owner_of_provider'));
    const [ownerAvatar, setOwnerAvatar] = useState(localStorage.getItem('owner_avatar'));
    const [idOfOwner, setIdOfOwner] = useState(localStorage.getItem('id_of_owner'));
    const [provider_id, setProvider_id] = useState(window.location.href.split("/").pop());
    const [showmodal, setShowmodal] = useState(false);
    const handleShow = () => setShowmodal(true);
    const handleClose = () => setShowmodal(false);

    const goback = () => {
        history.push('/project/lists')
    }


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
                                <span style={{ fontSize: "14px !important", marginBottom: "30px" }} className="text-danger">You are not authorize to access this content contact the owner to get access</span>
                            </div>
                            <div className="Update-Post">
                                {/* <button type="button" onClick={handleShow} name="button" data-toggle="tooltip" data-placement="bottom"
                                    title="Edit Post" className="edit-button"><i className="uil-envelope-share"></i>
                                </button> */}
                                {/* <NavLink 
                                        title="Edit Post"  className="edit-button" to={`update/${data.project_id}`}><i className="uil uil-pen"></i></NavLink> */}
                            </div>
                        </div>
                        <div class="d-flex justify-content-start flex-column align-items-center">
                            <img style={{ height: '40vh', width: '60vh' }} src="/assets/images/no-permission.svg" alt="Auth needed to view project" />
                            <p style={{ padding: '10px' }}>
                                Ea rerum placeat sit dolores odio ad nostrum eligendi in veniam facere ex quia nulla sit neque iure.
                            </p>

                        </div>

                        <div>
                            <button onClick={goback} style={{ width: '200px' }} name="previous" className="previous action-button">
                                <i className="uil uil-arrow-left  "></i> Previous
                            </button>
                            <button onClick={handleShow} style={{ width: '200px', marginLeft: '20px' }} name="button" data-toggle="tooltip" data-placement="bottom"
                                title="Edit Post" className="previous action-button">
                                <i className="uil-envelope-share"></i> share
                            </button>
                        </div>
                    </div>
                    <Modal show={showmodal} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content" style={{ padding: "0 2em" }}>
                                <h2>providername</h2>
                                <h5>Contact the owner to get get access to this content</h5>
                                <img style={{ width: "50%", alignSelf: "center" }} src="/assets/images/ask-permission.svg" alt="ask for permission" />
                                <div className="d-flex justify-content-between">
                                    <div className="Contact mb-0 mr-4">
                                        <div class="d-flex align-items-start">
                                            <div className="Contact-Thumb"> <Link to={`/profile/${idOfOwner}`}><img src={ownerAvatar} alt={ownerName} /></Link></div>
                                            <div className="Contact-Infos">
                                                <Link to={`/profile/${idOfOwner}`}><h4>{ownerName}</h4></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" onClick={handleSend} name="button" data-toggle="tooltip" data-placement="bottom"
                                        title="Edit Post" className="edit-button permission-button"><i className="uil-fast-mail"></i>
                                    </button>
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