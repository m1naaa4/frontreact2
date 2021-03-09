import React, {useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {UploadFileAction} from "../../../../store/actions/User/Project/UploadFileAction";
import ProgressBar from "../../../../skeleton/ProgressBar";
import { Player } from 'video-react';






export default function Step2View({formData, setForm, navigation, props}) {

    const dispatch = useDispatch();
    const [file, setFile] = useState('');
    const [go, setgo] = useState('');
    const [start, setStart] = useState('');

    const {previous, next} = navigation;

    const [uploadPercentage, setUploadPercentage] = useState(0);

    const selectFile = e => {
        setFile({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
        setStart(e.target.files[0]);
    };
    const fileInput = useRef(null)

    const fileurl = useSelector(state => state.fileuploaded);

    const onChange = e => {
        getBase64(e.target.files[0]);
    };

    const onLoad = fileString => {
        formData.logo = fileString;
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
        const formData = new FormData();
        formData.append('file', file.raw);
        formData.append('action', "create");
        dispatch(UploadFileAction(formData, props));
        setStart('');
        setgo(true);
    }

    const project = useSelector(state => state.addproject);

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
                                                src={file.preview}
                                            />
                                            <label className="btn btn-default">
                                                <input style={{display:"none"}} ref={fileInput}
                                                       type="file" onChange={selectFile}/>
                                            </label>

                                            <ProgressBar percentage={uploadPercentage} />

                                            <div onClick={() => fileInput.current.click()} className="for-ProgressBar">upload</div>
                                            <button disabled={!start} onChange={handleUpload}   name="next" className="next action-button">Start upload</button>
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