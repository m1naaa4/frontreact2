import React, {useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import ModalAddPost from './ModalAddPost';




export default function AddPostView(props) {

    const [avatar, setAvatar] = useState();
    const infoprofile = useSelector(state => state.infoProfile);
    const newavatar = useSelector(state => state.updateavatar);
    const user = useSelector(state => state.userProfile.userProfile);

    const [user_visiter_avatar, setUserVisiterAvatar] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    
    useEffect(() => {  
        
    if (infoprofile.infoprofile.avatar !== undefined &&  newavatar.avatar !== undefined) {  
        if (newavatar.avatar !== infoprofile.infoprofile.avatar) {
            setAvatar(newavatar.avatar);                
            setUserVisiterAvatar(newavatar.avatar);
        }else{
            setAvatar(infoprofile.infoprofile.avatar);
            if(user.profile){
                setUserVisiterAvatar(user.profile.avatar_link);
            }
        }
    }     
    })


    return (
        <>
        {
            infoprofile.infoprofile !== "" && infoprofile.infoprofile !== 'loading' ?
                <div className="WritePost">
                    <div className="WritePost-Area">
                        <Link className="WritePost-UserThumb" to={"/profile/"+ infoprofile.infoprofile.id} >
                            <img src={user_visiter_avatar} alt="avatar" />
                        </Link>
                        {/* <!-- <button type="button" className="UpdateInfos-BTN" ><i className="uil uil-pen"></i></button> --> */}
                        <textarea className="WritePost-TextArea js-elasticArea" onClick={handleShow} 
                            data-toggle="modal" data-target="#CreatePost-Modal" name="name" placeholder="Write something">
                        </textarea>
                    </div>
                    <div className="WritePost-Options">
                        <button type="button" name="button"><i className="uil uil-camera"></i> Photo/Video</button>
                        <button type="button" name="button"><i className="uil uil-tag-alt"></i> Tag Friends</button>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <div  id="SharingModal" tabIndex="-1" role="dialog" aria-labelledby="SharingModalTitle" >
                                <div className="modal-content">
                                    <div className="DadupaModal-Header">
                                        <h4>Publier un historique</h4>
                                        <button type="button" className="close" data-dismiss="modal" onClick={handleClose} aria-label="Close"><i className="uil uil-times"></i></button>
                                    </div>
                                    <ModalAddPost  newavatar={user_visiter_avatar}/>
                                </div>
                        </div>
                    </Modal>
                    
                
                </div> 
            :
            infoprofile.success === false ?
            infoprofile.message: <span/>
        }
        </>
    )
}
