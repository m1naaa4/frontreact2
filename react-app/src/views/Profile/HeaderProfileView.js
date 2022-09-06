import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import FileUploadService from '../../helpers/FileUploadService';
import { toast, ToastContainer } from 'react-toastify';
import { loadUserAction, ProfileAction } from '../../store/actions/Profile/UserActions';
import { LoadUser } from '../../services/User/Profile/ProfileService';
import HeaderProfileSkeleton from '../../skeleton/profile/HeaderProfileSkeleton';
import { FriendsAction, MyFriendsAction, SendRequestFriendAction } from '../../store/actions/Friend/FriendsAction';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogContentText } from '@material-ui/core';
import Button from '@mui/material/Button';


export default function HeaderProfileView({ formData, setForm, props }) {

    const infoprofile = useSelector(state => state.infoProfile);
    const infouser = useSelector(state => state.userProfile);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const myfriends = useSelector(state => state.userProfile.myfriends);
    const [show,setShow] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [open,setOpen] = useState(false);

    const hiddenFileInput = useRef(null);
    const hiddenCoverInput = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    // const [progress, setProgress] = useState(0);
    // const [message, setMessage] = useState("");
    const [fileAvatar, setFileAvatar] = useState();
    const [fileCover, setFileCover] = useState();
    const [newAvatar, setNewAvatar] = useState()
    const [newCover, setNewCover] = useState()
    const [user_id, setUserId] = useState()
    const params = useParams();

    const toastId = useRef(null);

    const location = useLocation();
    const currentLocation = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const [currentPage, setCurrentPage] = useState('historique')

    useEffect(() => {
        if (newAvatar && infoprofile.infoprofile.avatar !== newAvatar) {
            setFileAvatar(newAvatar)
            dispatch({ type: 'UPDATE_AVATAR_SUCCESS', newAvatar });
        } else {
            setFileAvatar(infoprofile.infoprofile.avatar)
            let newAvatar = infoprofile.infoprofile.avatar;
            dispatch({ type: 'UPDATE_AVATAR_SUCCESS', newAvatar });
        }

        if (newCover && infoprofile.infoprofile.cover !== newCover) {
            setFileCover(newCover)
        } else {
            setFileCover(infoprofile.infoprofile.cover)
        }

        if (currentLocation === 'cvtheque') {
            setCurrentPage('bio')
        } else if (currentLocation === 'meoffre') {
            setCurrentPage('offres')
        } else if (currentLocation === 'friends') {
            setCurrentPage('friends')
        } else {
            setCurrentPage('historique')
        }
    })

    const selectFile = (e) => {
        setSelectedFiles(e.target.files[0])
        getBase64(e.target.files[0], 'avatar');
    };

    const selectFileCover = (e) => {
        setSelectedFiles(e.target.files[0])
        getBase64(e.target.files[0], 'cover');
    };

    const onLoad = (fileString, type) => {
        formData.file = fileString;
        formData.action = 'upload';
        formData.type = type;
        formData.url = 'profile/upload';
    };

    const getBase64 = (file, type) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result, type);
            handleUpload(file)
        };
    };

    const handleUpload = async e => {
        // setProgress(0);
        setCurrentFile(e);
        FileUploadService.upload(formData, (e) => {

            toastId.current = toast('Upload in Progress',Math.round((100 * e.loaded) / e.total));

        })
            .then((res) => {
                formData.type === 'avatar' ? setNewAvatar(res.data.profile.avatar) : setNewCover(res.data.profile.cover)
                // dispatch({type:'LOAD_PROFILE_SUCCESS'}, res);
                let data = {
                    'url': 'user'
                }
                dispatch(loadUserAction(data, history));
                setSelectedFiles(undefined);
            })
            .catch(() => {
                // setProgress(0);
                // setMessage("Could not upload the file!");
                setCurrentFile(undefined);
            });
    }

    useEffect(() => {
        if (infouser.userProfile && infouser.userProfile !== 'loading') {
            setUserId(infouser.userProfile.profile_id);
            console.log(user_id)
        };

    });

    const SendRequest = ()=>{
        setOpen(true);
        let data ={
            'friend_id' : infoprofile?.infoprofile.user_id,
            'url' : 'friend/sendRequest',
        }
        dispatch(SendRequestFriendAction(data));
        setShow(false); 
    }

    useEffect(()=>{
        let data = {
          'url' : 'friend/getmyfriends',
          }
        dispatch(MyFriendsAction(data));
      },[])

    useEffect(()=>{
        if(myfriends){
                let find = myfriends.some( (data) => {return (data.profile_id === infoprofile.infoprofile.id) });
                if(find){
                    setShow(false);
                }else{
                    setShow(true);
                }
        }
    });

    const HandleClose = ()=>{
        setOpen(false);
    }

    return (
        <>
            {
                infoprofile.infoprofile !== "" && infoprofile.infoprofile !== 'loading' ?
                    <div className="Profile-Cover" id="photoCover" style={{ backgroundImage: `url(${fileCover})` }}>
                        <ToastContainer
                            position="bottom-left"
                            hideProgressBar={false}
                        />
                        <div className="container">
                            <div className="Profile-Wrap">
                                <div className="Profile-Infos" style={{top:"5px"}}>
                                    {user_id === params.id && <> <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" ref={hiddenFileInput} onChange={selectFile} />
                                        <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                                            <i className="uil uil-camera" />
                                        </label></>
                                    }
                                    {fileAvatar ? <div className="Profile-Picture" id="imageProfile" style={{ backgroundImage: `url(${fileAvatar})` }} /> :
                                        <div className="Profile-Picture" id="imageProfile" style={{ backgroundImage: `url('/assets/images/avatar.png')` }} />
                                    }

                                    <div className="Profile-Name">
                                        <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                                        <span style={{color:"white",fontSize:"20px"}}>{(infoprofile.infoprofile.firstname && infoprofile.infoprofile.lastname)? (infoprofile.infoprofile.firstname+" "+infoprofile.infoprofile.lastname): infoprofile.infoprofile.username}</span>
                                    </div>
                                </div>
                                {user_id === params.id && <>
                                    <input type="file" id="coverUpload" accept=".png, .jpg, .jpeg" ref={hiddenCoverInput} onChange={selectFileCover} />
                                    <label htmlFor="coverUpload" className="coverUpload"><i className="uil uil-camera" /> Edit cover photo</label>
                                </>
                                }
                                <div className="Profile-Navigation" style={{top:"5px"}}>
                                    <ul className="Profie-Menu">
                                        { (infoprofile?.infoprofile.user_id!==userProfile.id && show)  && (<li><div className="form-submit" style={{backgroundColor:"white",borderRadius:"32px"}} ><button onClick={SendRequest} style={{border:"0px",height:"40px",width:"50px"}}><i className="uil uil-user-plus" style={{fontSize:"20px",paddingLeft:"3px"}}></i></button></div></li>)}
                                        <Dialog
                                            open={open}
                                            onClose={HandleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            >
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    <span style={{fontWeight:"bold",top:"50px"}}>Request Sent...Other person needs to accept your invite!</span>
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={HandleClose} autoFocus>
                                                    Ok
                                                </Button>
                                                </DialogActions>
                                        </Dialog>
                                        <li><NavLink className={currentPage === 'bio' ? 'active-profile-link': ''} to={`/profile/${params.id}/cvtheque`}><i className="uil uil-user-square"></i> Bio</NavLink></li>
                                        <li><NavLink className={currentPage === 'offres' ? 'active-profile-link' : ''} to={`/profile/${params.id}/meoffre`}><i className="uil uil-layer-group"></i> Offres</NavLink></li>
                                        <li><NavLink className={currentPage === 'historique' ? 'active-profile-link' : ''} to={`/profile/${params.id}`}><i className="uil uil-apps"></i> Historique</NavLink></li>
                                        <li><NavLink className={currentPage === 'friends' ? 'active-profile-link' : ''} to={`/profile/${params.id}/friends/friends`}><i className="uil uil-share-alt" /> Réseaux</NavLink></li>
                                        {/*<li><Link to={`/messages/${params.id}`}><i className="uil uil-comment-alt-lines" /> Discuter</Link></li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    infoprofile.success === false ?
                        infoprofile.message : <HeaderProfileSkeleton />
            }
        </>



    )
}
