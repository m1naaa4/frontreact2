import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import FileUploadService from '../../helpers/FileUploadService';
import { toast, ToastContainer } from 'react-toastify';
import { loadUserAction, ProfileAction } from '../../store/actions/Profile/UserActions';
import { LoadUser } from '../../services/User/Profile/ProfileService';


export default function HeaderProfileView({formData, setForm, props}) {

    const infoprofile = useSelector(state => state.infoProfile);
    const infouser = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const hiddenFileInput = useRef(null);
    const hiddenCoverInput = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    // const [progress, setProgress] = useState(0);
    // const [message, setMessage] = useState("");
    const [fileAvatar, setFileAvatar] = useState();
    const [fileCover, setFileCover]   = useState();
    const [ newAvatar, setNewAvatar ] = useState()
    const [ newCover, setNewCover ] = useState()
    const [ user_id, setUserId ] = useState()
    const params = useParams();
    
    const toastId = useRef(null);
    
    
     useEffect(() => {        
        if (newAvatar && infoprofile.infoprofile.avatar !== newAvatar) {
            setFileAvatar(newAvatar)
            dispatch({type:'UPDATE_AVATAR_SUCCESS', newAvatar});
        }else{
            setFileAvatar(infoprofile.infoprofile.avatar)
            let newAvatar = infoprofile.infoprofile.avatar;
            dispatch({type:'UPDATE_AVATAR_SUCCESS', newAvatar});
        }
        
        if (newCover && infoprofile.infoprofile.cover !== newCover) {
            setFileCover(newCover)
        }else{
            setFileCover(infoprofile.infoprofile.cover)
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
        formData.file =  fileString;
        formData.action = 'upload';
        formData.type =  type;
        formData.url =  'profile/upload';
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

            toastId.current = toast('Upload in Progress', {
                progress: Math.round((100 * e.loaded) / e.total)
            });
                    
        })
        .then((res) => {
            formData.type === 'avatar' ? setNewAvatar(res.data.profile.avatar) : setNewCover(res.data.profile.cover)
            // dispatch({type:'LOAD_PROFILE_SUCCESS'}, res);
            console.log('ressssssssssssssssssssssss',res.data.profile)
            dispatch(loadUserAction()); 
            setSelectedFiles(undefined);
            toast.done(toastId.current);
        })
        .then((files) => {
            //setFileAvatar(files.data);
        })
        .catch(() => {
            // setProgress(0);
            // setMessage("Could not upload the file!");
            setCurrentFile(undefined);
        });        
    }

    useEffect(() => {
        if(infouser.userProfile && infouser.userProfile !== 'loading'){
            setUserId(infouser.userProfile.profile_id);
        };    
    });

    return (
        <>       
        {
            infoprofile.infoprofile !== "" && infoprofile.infoprofile !== 'loading' ?
            <div className="Profile-Cover" id="photoCover" style={{backgroundImage: `url(${ fileCover })`}}>
                <ToastContainer
                    position="bottom-left"
                    hideProgressBar={false}
                />
                <div className="container">
                    <div className="Profile-Wrap">
                        <div className="Profile-Infos">
                        {user_id === params.id && <> <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" ref={hiddenFileInput} onChange={selectFile} />
                            <label htmlFor="imageUpload" style={{cursor: "pointer"}}>
                                <i className="uil uil-camera" />
                            </label></>
                        }
                        
                        {fileAvatar ? <div className="Profile-Picture" id="imageProfile"  style={{backgroundImage: `url(${fileAvatar})`}} /> :
                            <div className="Profile-Picture" id="imageProfile"  style={{backgroundImage: `url('/assets/images/avatar.png')`}} />
                        }
                        
                        <div className="Profile-Name">{infoprofile.infoprofile.username}</div>
                        </div>
                        <div className="Profile-Navigation">
                        {user_id === params.id && <>
                            <input type="file" id="coverUpload" accept=".png, .jpg, .jpeg" ref={hiddenCoverInput} onChange={selectFileCover} />
                            <label htmlFor="coverUpload" className="coverUpload"><i className="uil uil-camera" /> Edit cover photo</label>
                            </>
                        }
                        <ul className="Profie-Menu">
                            <li><Link to={`/profile/${params.id}/cvtheque`}><i className="uil uil-user-square"></i> Bio</Link></li>
                            <li><Link to={`/profile/${params.id}/meoffre`}><i className="uil uil-layer-group"></i> Offres</Link></li>
                            <li><Link to={`/profile/${params.id}/me`}><i className="uil uil-apps"></i> Historique</Link></li>
                            <li><Link to={`/profile/${params.id}/friends`}><i className="uil uil-share-alt" /> Réseaux</Link></li>
                            {/*<li><Link to={`/messages/${params.id}`}><i className="uil uil-comment-alt-lines" /> Discuter</Link></li> */}
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            :
            infoprofile.success === false ?
            infoprofile.message: <span/>
            }
        </>
    
           
        
    )
}
