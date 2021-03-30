import React, { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Modal } from 'react-bootstrap';
import { AddPostAction } from "../../../store/actions/Post/AddPostAction";
import FileUploadService from "../../../helpers/FileUploadService";

export default function(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [avatar, setAvatar] = useState();
    const [post, setPost] = useState();
    const [medialink, setMedialink] = useState();
    const [type, setType] = useState('normal');
    const refbody = useRef(null);
    const hiddenImage = useRef(null);
    const hiddenVideo = useRef(null);
    const hiddenFile = useRef(null);
    const [image, setImage] = useState();
    const [video, setVideo]   = useState();
    const [file, setFile]   = useState();
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    let formData = new FormData();

    const infoprofile = useSelector(state => state.infoProfile);

    useEffect(() => {          
        if (infoprofile.infoprofile.avatar) {              
            setAvatar(infoprofile.infoprofile.avatar)            
        }     
    })
    const dispatch = useDispatch();

    const data = {
        profile_id : props.match.params.id,
        body       : post,
        action     : 'addPost',
        type       : type,
        medialink : medialink,
    }

    const handleSubmitValue = (e) => {
        e.preventDefault();
        refbody.current.value = ''
        dispatch(AddPostAction(data, props));
        handleClose();       
    }
    
    const selectFile = (e) => {   
        setSelectedFiles(e.target.files[0]); 
        setType('file')    
        getBase64(e.target.files[0]); 
    };

    const selectImage = (e) => {   
        setSelectedFiles(e.target.files[0]); 
        setType('image')    
        getBase64(e.target.files[0]); 
    };

    const selectVideo = (e) => {   
        setSelectedFiles(e.target.files[0]);
        setType('video')     
        getBase64(e.target.files[0]); 
    };

    const onLoad = (fileString) => {
        formData.file =  fileString;
        formData.profile_id = props.match.params.id;
        formData.type =  type;
        formData.url =  'video/upload';
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
        setProgress(0);
        setCurrentFile(e);
        const data = {
            file  : formData.file,
            provider_id : formData.profile_id,
            action      : 'uploadPost',
            type        : formData.type,
            url         : formData.url,
        }
        FileUploadService.upload(data, (e) => {
            console.log("progress", Math.round((100 * e.loaded) / e.total))
        setProgress(Math.round((100 * e.loaded) / e.total));
        
        })
        .then((response) => {
            setMedialink(response.data.url)
            setSelectedFiles(undefined);            
        })
        .then((files) => {
            //setFileAvatar(files.data);
        })
        .catch(() => {
            setProgress(0);
            setMessage("Could not upload the file!");
            setCurrentFile(undefined);
        });        
    }

  return (    
            <div className="modal-body">

                <form className="AddNewPost-Form" onSubmit={ handleSubmitValue}>

                    <div className="CreatePost-Row">
                        <div className="CreatePost-ColLeft">
                            <div className="CreatePost-UserThumb"><img src={avatar} alt="avatar"/></div>
                                <div className="CreatePost-OptionsRow">
                                    <div className="CreatePost-Options">
                                        <button type="button" className="CreatePost-Option CreatePost-OptionDate" data-toggle="tooltip" data-placement="right" title="Add date"><i className="uil uil-calendar-alt"></i></button>
                                        <button type="button" className="CreatePost-Option CreatePost-OptionImage" data-toggle="tooltip" data-placement="right" title="Add Image">
                                            <input type="file" ref={hiddenImage} onChange={selectImage}  accept="image/jpeg, image/x-png" /><i className="uil uil-image"></i>
                                        </button>
                                        <button type="button" className="CreatePost-Option CreatePost-OptionVideo" data-toggle="tooltip" data-placement="right" title="Add Video">
                                            <input type="file" ref={hiddenVideo} onChange={selectVideo} accept="video/x-mpeg2, video/x-msvideo, video/quicktime, video/mp4" /><i className="uil uil-video"></i>
                                        </button>
                                        <button type="button" className="CreatePost-Option CreatePost-OptionFile" data-toggle="tooltip" data-placement="right" title="Add File">
                                            <input type="file" ref={hiddenFile} onChange={selectFile} accept="" /><i className="uil uil-file-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="CreatePost-ColRight">
                                <div className="CreatePost-Body">
                                    <textarea name="post" onChange={e => setPost(e.target.value)} ref={refbody} placeholder="De quoi souhaitez-vous discuter ?"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="CreatePost-Footer">
                            <div className="CreatePost-FooterLeft">
                                <button type="button" className="CreatePost-AddTag"><i className="uil uil-plus"></i> Ajouter un tag</button>
                            </div>
                            <div className="CreatePost-FooterRight">
                                <button name="button" className="CreatePost-PublishBTN">Publish</button>
                            </div>
                        </div>
                </form>
            </div>         
  );
}
