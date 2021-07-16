import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ProgressBar from "../../../skeleton/ProgressBar";
import { Player } from 'video-react';
import UploadService from '../../../helpers/FileUploadService';
import { getProjectAction } from '../../../store/actions/User/Project/GetProjectActions';
import { useLocation } from 'react-router-dom';


export default function Step2View({formData, setForm, navigation, props}) {

    const dispatch = useDispatch();
    const { medialink, mediatype } = formData;
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [file, setFile] = useState(medialink);
    const [media, setMedia] = useState(mediatype);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [project_id, setProject_id] = useState();
    const hiddenFileInput = useRef(null);

    const projectadd = useSelector(state => state.addproject);
    const getproject = useSelector(state => state.getproject);

    const [changed, setChanged] = useState(false);

    const location = useLocation();
    useEffect(()=>{
        console.log(location, 'changedddddd', )
        setChanged(true)
    },[location])

    useEffect(() => {
        if (projectadd.addproject) {
            if (getproject !== undefined && getproject.getproject  !== '') {
                if(getproject.getproject !== 'loading'){
                    const data = {
                        provider_id  : projectadd.addproject.projectid,
                        action      : "getProject",
                    }
        
                    setProject_id(projectadd.addproject.projectid);
        
                    dispatch( getProjectAction (data, props));
                        if (projectadd.addproject.projectid === getproject.getproject.projectid) {
                            setFile(getproject.getproject.project.media_link);
                            setMedia(getproject.getproject.project.is_video);
                        }
                        
                        setMedia(getproject.getproject.project.is_video);
                        formData.medialink = getproject.getproject.project.media_link;
                        formData.logolink = getproject.getproject.project.logolink;
                        formData.mediatype = getproject.getproject.project.is_video;
                        setProject_id(getproject.getproject.projectid);
                    } 
                } 
            }               
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
        setProgress(0);
        setCurrentFile(e);
        UploadService.upload(formData, (e) => {
            console.log("progress", Math.round((100 * e.loaded) / e.total))
        setProgress(Math.round((100 * e.loaded) / e.total));
        
        })
        .then((response) => {
            setFile(response.data.url);
            formData.medialink = response.data.url;
            formData.mediatype = response.data.type;
            setMedia(response.data.type);
            setSelectedFiles(undefined);
            dispatch({type:'File_UPLOADED_SUCCESS', response})
        })
        .then((files) => {
            setFile(files.data);
        })
        .catch(() => {
            setProgress(0);
            setMessage("Could not upload the file!");
            setCurrentFile(undefined);
        });        
    }
    
    return (

        <div className="Page-Wrapper">
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
                                    {file && ( 
                                        <div className="form-inputs">
                                            <div  className="col-md-12 input-row">
                                                {
                                                media ? (
                                                    <Player width="100%" height="100%"
                                                        playsInline
                                                        poster="/assets/poster.png"
                                                        src={file}
                                                    />) : (<img width="100%" height="300" src={file} alt="Project"/>)
                                                } 

                                                {currentFile && (
                                                    <ProgressBar percentage={progress} />
                                                    )}                                                                                               
                                            </div>                                            
                                        </div>
                                    )}                                    
                                      
                                    {!file && ( 
                                         <div className="form-inputs">
                                            <div  className="col-md-12 input-row" style={{ height: "350px" , width: "100%" , display: "grid", placeItems: "center"}} onClick={handleClick}>
                                                    {/* <input type="file" onChange={onChange} /> */}
                                                    <div  className="btn btn-default" style={{ margin: "auto", display: "block"}}>
                                                        <input ref={hiddenFileInput} accept=".png, .jpg, .jpeg"
                                                            style={{display: 'none'}} type="file" onChange={selectFile} /> Choose file
                                                    </div>
                                                    {/* <button  onClick={handleUpload}   name="next" className="next action-button">Start upload</button> */}
                                                </div>
                                                {currentFile && (
                                                    <ProgressBar percentage={progress} />
                                                    )}
                                            </div>
                                            
                                    )}
                                   
                                    <button  onClick={previous} name="previous" className="previous action-button">
                                        <i className="uil uil-arrow-left  "></i> Previous</button>

                                        {file && ( 
                                            <label className="btn btn-default">Choose another file
                                                <input  ref={hiddenFileInput} style={{display: 'none'}} type="file" onChange={selectFile}/>
                                            </label>
                                        )}
                                    
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