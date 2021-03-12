import React, {useRef, useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {UploadFileAction} from "../../../../store/actions/User/Project/UploadFileAction";
import ProgressBar from "../../../../skeleton/ProgressBar";
import { Player } from 'video-react';
import UploadService from '../../../../helpers/FileUploadService';


export default function Step2View({formData, setForm, navigation, props}) {

    const dispatch = useDispatch();

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [file, setFile] = useState(undefined);
    const [media, setMedia] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const hiddenFileInput = React.useRef(null);

    useEffect(() => {
        if (project.fileuploaded.id) {
            console.log(project.fileuploaded.url !== 'loading')
            setFile(project.fileuploaded.url);
        }
        
    });

    const selectFile = (e) => {
     setSelectedFiles(e.target.files);
    };

    const handleClick = event => {
        hiddenFileInput.current.click();
      };


    const [go, setgo] = useState('');

    const {previous, next} = navigation;


    const onChange = e => {
        getBase64(e.target.files[0]);

        let currentFile = e.target.files[0];
        setCurrentFile(currentFile);
        
    };

    const onLoad = fileString => {
        formData.video = fileString;
        formData.action = 'upload';
        formData.type = 'video';
        formData.project_id = project.addproject.projectid;        
    };
    
    const getBase64 = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);

            handleUpload()
        };
    };

    const handleUpload = async e => {

        setProgress(0);

        // dispatch(UploadFileAction(formData, props));

        UploadService.upload(formData, (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));

        console.log(progress)
        })
        .then((response) => {
            setMessage(response.data.message);
            setFile(response.data.url);
            setMedia(response.data.type);

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

        setSelectedFiles(undefined);
        
        //dispatch(UploadFileAction(formData, props));
        setgo(true);
    }

    const project = useSelector(state => state);

    console.log("project2", project)
    // console.log("project2", project.addproject.projectid)

    // setgo(fileurl.url)

        

    return (

        <div className="Page-Wrapper">
            <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 d-md-none d-lg-block">

                            <div className="page-header">
                                <h3>Détails de l'offre</h3>
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
                                                    media === 'video' ? (
                                                        <Player width="100%" height="100%"
                                                            playsInline
                                                            poster="/assets/poster.png"
                                                            src={file}
                                                        />) : (<img width="100%" height="300" src={file} alt="Project"/>)
                                                }

                                                    {currentFile && (
                                                    <ProgressBar percentage={progress} />
                                                    )}

                                                    {/* <input type="file" onChange={onChange} /> */}
                                                    
                                                
                                                    {/* <button  onClick={handleUpload}   name="next" className="next action-button">Start upload</button> */}
                                                </div>
                                            </div>
                                    )}

                                    {!file && ( 
                                         <div className="form-inputs">
                                            <div  className="col-md-12 input-row" style={{ height: "350px" , width: "100%" , display: "grid", placeItems: "center"}} onClick={handleClick}>
                                                    {/* <input type="file" onChange={onChange} /> */}
                                                    <div  className="btn btn-default" style={{ margin: "auto", display: "block"}}>
                                                        <input ref={hiddenFileInput}
                                                            style={{display: 'none'}} type="file" onChange={onChange} /> Choose file
                                                    </div>
                                                
                                                    {/* <button  onClick={handleUpload}   name="next" className="next action-button">Start upload</button> */}
                                                </div>
                                            </div>
                                    )}
                                   
                                    <button  onClick={previous} name="previous" className="previous action-button">
                                        <i className="uil uil-arrow-left  "></i> Previous</button>

                                    <label className="btn btn-default">
                                        <input type="file" onChange={onChange} />
                                    </label>
                                    <button
                                        // disabled={fileurl.url.url === undefined ? true:false}
                                        onClick={next}

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