import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ProgressBar from "../../../skeleton/ProgressBar";
import { Player } from 'video-react';
import UploadService from '../../../helpers/FileUploadService';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const SecondStepFunder = ( {formData, setForm, navigation, props} ) => {
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

    const funderCreated = useSelector(state => state.createFunder);
    const getproject = useSelector(state => state.getproject);

    const [changed, setChanged] = useState(false);
    const { t } = useTranslation();
    const location = useLocation();
    useEffect(()=>{
        setChanged(true)
    },[location])

    useEffect(() => {
         if (funderCreated.funder) {
            if (getproject !== undefined && getproject.getproject  !== '') {
                if(getproject.getproject !== 'loading'){
                    const data = {
                        provider_id  : funderCreated.funderId,
                        action      : "getProject",
                    }
        
                    setProject_id(funderCreated.funderId);
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
        formData.provider = 'funder';
        formData.provider_id = funderCreated.funderId ? funderCreated.funderId : project_id; 
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
                                <h3>{t('project.add.desc1')} </h3>
                                <div id="authErr"></div>
                                <div id="authResponse">
                                </div>
                                <img src="/assets/images/offer-thumbnail.svg"/>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <div id="form-wizard"  className="form-wizard">
                                <ul id="wizardbar">
                                    <li className="active">
                                        <div className="Step-Number"><span>1</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('project.add.detail_offre')} </div>
                                    </li>
                                    <li className="active">
                                        <div className="Step-Number"><span>2</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('upload_video')}</div>
                                    </li>
                                    <li>
                                        <div className="Step-Number"><span>3</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('desc_offre')}</div>
                                    </li>
                                    <li>
                                        <div className="Step-Number"><span>4</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('review_detail')}</div>
                                    </li>
                                </ul>

                                <fieldset className="wizard-fieldset">
                                    {file && ( 
                                        <div className="form-inputs">
                                            <div  className="col-md-12 input-row text-center">
                                                {
                                                media ? (
                                                    <Player width="100%" height="100%"
                                                        playsInline
                                                        poster="/assets/poster.png"
                                                        src={file}
                                                    />) : (<img height="300" src={file} alt="Funder"/>)
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
                                                            style={{display: 'none'}} type="file" onChange={selectFile} /> {t('choose_file')}
                                                    </div>
                                                    {/* <button  onClick={handleUpload}   name="next" className="next action-button">Start upload</button> */}
                                                </div>
                                                {currentFile && (
                                                    <ProgressBar percentage={progress} />
                                                    )}
                                            </div>
                                            
                                    )}
                                   
                                    <button  onClick={previous} name="previous" className="previous action-button">
                                        <i className="uil uil-arrow-left  "></i> {t('previous')}</button>

                                        {file && ( 
                                            <label className="btn btn-default">Choose another file
                                                <input  ref={hiddenFileInput} style={{display: 'none'}} type="file" onChange={selectFile}/>
                                            </label>
                                        )}
                                    
                                    <button
                                        // disabled={fileurl.url.url === undefined ? true:false}
                                        onClick={next} disabled={!file}

                                             name="next" className="next action-button">{t('next')}
                                        <i className="uil uil-arrow-right"></i></button>

                                </fieldset>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SecondStepFunder;