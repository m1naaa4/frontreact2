import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ProgressBar from "../../../skeleton/ProgressBar";
import { Player } from 'video-react';
import UploadService from '../../../helpers/FileUploadService';
import { GetProjectAction } from '../../../store/actions/User/Project/ProjectAction';
import { toast, ToastContainer } from 'react-toastify';
import VideoJS from '../../../helpers/VideoJS';


export default function UpdateStep2View({formData, setForm, navigation, props}) {
    const dispatch = useDispatch();
    const { medialink, mediatype } = formData;
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [editVideo, setEditVideo] = useState(false);
    const [file, setFile] = useState(medialink);
    const [media, setMedia] = useState(mediatype);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [project_id, setProject_id] = useState();
    const hiddenFileInput = React.useRef(null);
    const toastId = useRef(null);

    const mediaproject = useSelector(state => state.fileuploaded);
    const projectadd = useSelector(state => state.addproject);
    const getproject = useSelector(state => state.getproject);
    
    useEffect(() => {
            const data = {
                provider_id  : props.match.params.id,
                action      : "getProject",
            }
            setProject_id(projectadd.addproject.projectid);
        
            dispatch( GetProjectAction (data, props));
            
            setFile(getproject?.getproject?.project?.media_link);
            setMedia(getproject?.getproject?.project?.is_video);
            formData.medialink = getproject.getproject.project?.media_link;
            formData.logolink = getproject.getproject.project?.logolink;
            formData.mediatype = (getproject.getproject.project?.is_video) ? 'video' : getproject.getproject.project?.type;
            setProject_id(getproject.getproject.projectid);
             
    }, [dispatch]);  

    const handleClick = e => {
        hiddenFileInput.current.click();
      };

    const {previous, next} = navigation;

    const selectFile = (e) => {   
        setSelectedFiles(e.target.files[0])     
        getBase64(e.target.files[0]); 
      };

    const onLoad = fileString => {
        formData.file     = fileString;
        formData.action   = 'upload';
        formData.url      = 'video/upload';
        formData.type     = 'video';
        formData.provider = 'project';
        formData.provider_id = projectadd.addproject.projectid ? projectadd.addproject.projectid : project_id;       
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
        setCurrentFile(e);
        UploadService.upload(formData, (e) => {
            const progress = e.loaded / e.total;
            if (toastId.current === null) {
                toastId.current = toast('Upload in Progress', { progress });
            } else {
                toast.update(toastId.current, { progress });
            }
        })
        .then((response) => {
            setFile(response.data.url);
            formData.medialink = response.data.url;
            formData.mediatype = (response.data.is_video) ? 'video' : response.data.type;
            setSelectedFiles(undefined);
            dispatch({type:'File_UPLOADED_SUCCESS', response})
            toast.done(toastId.current);

            setMedia(response.data.is_video);
            setEditVideo(false)
        })
        .then((files) => {
           // setFile(files.data);
        })
        .catch(() => {
            setMessage("Could not upload the file!");
            setCurrentFile(undefined);
        });        
    }

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: file,
          type: 'video/mp4'
        }]
      };
    
    return (

        <div className="Page-Wrapper">
            <ToastContainer
                position="bottom-left"
                hideProgressBar={false}
            />
            <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 d-md-none d-lg-block">

                            <div className="page-header">
                                <h3>Détails de l'offre</h3>
                                <div id="authErr">{message}</div>
                                <p>Enter details about the project <br/>to preceed further</p>
                                <img src="/assets/images/offer-thumbnail.svg"/>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <div id="form-wizard"  className="form-wizard">
                                <ul id="wizardbar">
                                    <li className="active done">
                                        <div className="Step-Number"><span>1</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Détails de l'offre</div>
                                    </li>
                                    <li className="active">
                                        <div className="Step-Number"><span>2</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Upload vidéo</div>
                                    </li>
                                    <li>
                                        <div className="Step-Number"><span>3</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Description de l'offre</div>
                                    </li>
                                    <li>
                                        <div className="Step-Number"><span>4</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Review Details</div>
                                    </li>
                                </ul>

                                <fieldset className="wizard-fieldset">
                                    <div className="fieldset-header">
                                        <div className="Step-Title">Upload vidéo</div>
                                        <p>Enter details about the project <br/>to preceed further</p>
                                    </div>
                                    
                                    {(file && !editVideo) && ( 
                                        <div className="form-inputs">
                                            <button type="button" name="button"  onClick={() =>  setEditVideo(true)} className="edit-button edit-btn-video"><i className="uil uil-pen"></i></button>

                                            <div  className="col-md-12 input-row">
                                                {
                                                media ? (
                                                    <VideoJS options={videoJsOptions} />
                                                    ) : (<img width="100%" height="300" src={file} alt="Project"/>)
                                                } 
                                            </div>                                            
                                        </div>
                                    )}                                    
                                      
                                    

                                    {(!file || editVideo) && ( 
                                        <div className="form-inputs upload-videooz">
                                            <div className="row">
                                                <div className="col-lg-6 br-right">
                                                    <div className="video-file">
                                                        <i className="uil-upload-alt"></i>
                                                        <h3>Select video files to upload</h3>
                                                        <span>or drag &amp; drop video files</span>
                                                        <form>
                                                            <label htmlFor="file-upload" className="custom-file-upload">
                                                                Upload Video
                                                            </label>
                                                            <input ref={hiddenFileInput} onChange={selectFile} id="file-upload" type="file" />
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="youtube-dwn">
                                                        <i className="uil-download-alt"></i>
                                                        <h3>Import videos from YouTube or Vimeo</h3>
                                                        <span>Copy / Paste your video link here</span>
                                                        <form>
                                                            <input type="text" name="import_video" placeholder="Paste link here" />
                                                            <button onChange={selectFile}>Preview Video</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                   
                                    <button  onClick={previous} name="previous" className="previous action-button">
                                        <i className="uil uil-arrow-left  "></i> Previous</button>
                                    <button
                                        // disabled={fileurl.url.url === undefined ? true:false}
                                        onClick={next} disabled={!file}

                                             name="next" className="next action-button">Continue
                                        <i className="uil uil-arrow-right"></i></button>

                                </fieldset>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}