import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import FileUploadService from '../../helpers/FileUploadService';
import { ProfileAction } from '../../store/actions/Profile/UserActions';



export default function HeaderProfileView({formData, setForm, props}) {

    const infoprofile = useSelector(state => state.userProfile);
    //const infoprofile = useSelector(state => state.userProfile.infoprofile);

    //console.log('userProfile', infoprofilee)
    console.log(infoprofile.infoprofile)

    

    const dispatch = useDispatch();
    const hiddenFileInput = useRef(null);
    const hiddenCoverInput = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileAvatar, setFileAvatar] = useState();
    const [fileCover, setFileCover]   = useState();

    useEffect(() => {  
        dispatch( ProfileAction(props.match.params.id)); 
        console.log("infoprofile", infoprofile.infoprofile);     
    }, [dispatch]);  
      
    const handleClick = e => {
        hiddenFileInput.current.click();
      };

    const selectFile = (e) => {   
        setSelectedFiles(e.target.files[0])     
        getBase64(e.target.files[0]); 
      };
    
    const selectFileCover = (e) => {   
        setSelectedFiles(e.target.files[0])     
        getBase64(e.target.files[0]); 
      };  

    const onLoad = fileString => {
        formData.append('video', fileString);
        formData.append('action', 'upload');
        formData.append('type', 'video');
    };
    
    const getBase64 = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
            handleUpload(file)
        };
    };

    const handleUpload = async e => {
        setProgress(0);
        setCurrentFile(e);
        FileUploadService.upload(formData, (e) => {
            console.log("progress", Math.round((100 * e.loaded) / e.total))
        setProgress(Math.round((100 * e.loaded) / e.total));
        
        })
        .then((response) => {
            setFileAvatar(response.data.url);
            formData.medialink = response.data.url;
            formData.mediatype = response.data.type;
            setSelectedFiles(undefined);
            dispatch({type:'File_UPLOADED_SUCCESS', response})
        })
        .then((files) => {
            setFileAvatar(files.data);
        })
        .catch(() => {
            setProgress(0);
            setMessage("Could not upload the file!");
            setCurrentFile(undefined);
        });        
    }


    return (
    
        <div className="Profile-Header">
            {
            infoprofile.infoprofile !== "" || infoprofile === undefined ?
            <div className="Profile-Cover" id="photoCover" style={{backgroundImage: `url(${ infoprofile.cover })`}}>
                <div className="container">
                    <div className="Profile-Wrap">
                        <div className="Profile-Infos">
                        <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" ref={hiddenFileInput} onChange={selectFile} />
                        <label htmlFor="imageUpload" style={{cursor: "pointer"}}>
                            <i className="uil uil-camera" />
                        </label>
                        <div className="Profile-Picture" id="imageProfile" style={{backgroundImage: `url(${ infoprofile.avatar })`}} />
                        <div className="Profile-Name">{infoprofile.username}</div>
                        </div>
                        <div className="Profile-Navigation">
                        <input type="file" id="coverUpload" accept=".png, .jpg, .jpeg" ref={hiddenCoverInput} onChange={selectFileCover} />
                        <label htmlFor="coverUpload" className="coverUpload"><i className="uil uil-camera" /> Edit cover photo</label>
                        <ul className="Profie-Menu">
                            {/* <li><NavLink href="offers.html" to={`/profile/${this.props.id}/offers`}><i className="uil uil-layer-group" /> Offres</NavLink></li>
                            <li><NavLink href="profile.html" to={`/profile/${this.props.id}/posts`}><i className="uil uil-apps" /> Publications</NavLink></li> */}
                            {/* <li><a href="reseaux.html"><i className="uil uil-share-alt" /> Réseaux</a></li>
                            <li><a href="#!"><i className="uil uil-comment-alt-lines" /> Discuter</a></li> */}
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            :
            infoprofile.success === false ?
            infoprofile.message: <span/>
            }
        </div>
        
    )
}
