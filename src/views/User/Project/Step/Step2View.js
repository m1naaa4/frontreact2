import React, {useRef, useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {UploadFileAction} from "../../../../store/actions/User/Project/UploadFileAction";
import ProgressBar from "../../../../skeleton/ProgressBar";
import { Player } from 'video-react';






export default function Step2View({formData, setForm, navigation, props}) {

    const dispatch = useDispatch();


    const [selectedFile, setSelectedFiles] = useState(undefined);
    const [file, setFile] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);

    // useEffect(() => {
    //     dispatch(UploadFileAction(formData, props));
    // }, []);

    const selectFile = (e) => {
     setSelectedFiles(e.target.files);
    };


    const [go, setgo] = useState('');

    const {previous, next} = navigation;


    const onChange = e => {
        console.log(e.target.files[0])
        getBase64(e.target.files[0]);

        let currentFile = e.target.files[0];
        setCurrentFile(currentFile);
        
    };

    const onLoad = fileString => {
        formData.video = fileString;
        formData.action = 'upload';
        formData.project_id = project.id;
    };
    
    const getBase64 = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };

    const handleUpload = async e => {
        e.preventDefault();
        
        setProgress(0);

        dispatch(UploadFileAction(formData, props));
        setgo(true);
        setSelectedFiles(undefined);
    }

    const project = useSelector(state => state);

    console.log("project2", project)

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
                            <form id="form-wizard" onSubmit={handleUpload} className="form-wizard">
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
                                    <div className="form-inputs">
                                        <div className="col-md-12 input-row">
                                            <Player width="300" height="300"
                                                playsInline
                                                poster="/assets/poster.png"
                                                //src={file.preview}
                                            />
                                            {currentFile && (
                                                <div className="progress">
                                                <div
                                                    className="progress-bar progress-bar-info progress-bar-striped"
                                                    role="progressbar"
                                                    aria-valuenow={progress}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{ width: progress + "%" }}
                                                >
                                                    {progress}%
                                                </div>
                                                </div>
                                            )}
                                            {/* <ProgressBar percentage={progress} /> */}

                                            {/* <input type="file" onChange={onChange} /> */}
                                            <label className="btn btn-default">
                                                <input type="file" onChange={onChange} />
                                            </label>
                                            <button  onChange={onChange}   name="next" className="next action-button">Start upload</button>
                                        </div>
                                    </div>
                                    <button  onClick={previous} name="previous" className="previous action-button">
                                        <i className="uil uil-arrow-left  "></i> Previous</button>
                                    <button
                                        // disabled={fileurl.url.url === undefined ? true:false}
                                        onClick={next}

                                             name="next" className="next action-button">Continue
                                        <i className="uil uil-arrow-right"></i></button>

                                </fieldset>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}