import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import InputTags from "../../../utils/tags/TagsInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useHistory } from "react-router-dom";
import { GetFunder, UpdateFunderAction } from '../../../store/actions/Funder/FunderActions';


export default function ThirdStepFunder({ navigation}) {
    const { next, go } = navigation;
    const location = useLocation();
    const history = useHistory();
    const project = useSelector(state => state.funders.funder);

    const dispatch = useDispatch();
    const [tags, setTags] = useState([]);
    const projectId = location.pathname.split('/')[location.pathname.split('/').length - 2];

    const [value, setValue] = useState('');

    const selectedTags = tags => {
        setTags(tags)
    };

    function previous() {
        history.push('/funder/create/' + projectId + '/' + 'step2');
        go('step2');
    }

    useEffect(() => {
        dispatch(GetFunder('/' + projectId));
    }, [dispatch])

    useEffect(() => {  
        console.log(project?.data);
        setValue(project?.data?.content?? '');
        setTags(project?.data?.tags ?? []);
    }, [project]);

    useEffect(() => {
        if (projectId !== "create" && projectId !== "step2" && projectId !== "step3" && projectId !== "final") {
            dispatch(GetFunder('/' + projectId));
        }
    }, [dispatch]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            'description': value,
            'tags': tags,
            'project_id': projectId
        }

        dispatch(UpdateFunderAction(data, '/update'));
        history.push('/funder/create/' + projectId + '/' + 'final');
    };
        
    return (
        <div className="Page-Wrapper">
            <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 d-md-none d-lg-block">

                            <div className="page-header">
                                <h3>Détails de l'offre</h3>
                                <p>Enter details about the project <br/>to preceed further</p>
                                <img src="/assets/images/offer-thumbnail.svg" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <form id="form-wizard"  className="form-wizard">
                                <ul id="wizardbar">
                                    <li className="active done">
                                        <div className="Step-Number"><span>1</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Détails de l'offre</div>
                                    </li>
                                    <li className="active done">
                                        <div className="Step-Number"><span>2</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">Upload vidéo</div>
                                    </li>
                                    <li className="active">
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
                                        <div className="Step-Title">Description de l'offre</div>
                                        <p>Enter details about the project <br/>to preceed further</p>
                                    </div>
                                    <div className="form-inputs">
                                        <div className="col-md-12 input-row">
                                        <ReactQuill
                                            theme="snow"
                                            value={value}
                                            onChange={setValue}
                                        />
                                        </div>
                                        <div className="col-md-12 input-tags">
                                            <InputTags  selectedTags={selectedTags}  tagss={tags}/>
                                        </div>
                                    </div>
                                    <button onClick={previous} type="button" name="previous" className="previous action-button"><i
                                        className="uil uil-arrow-left  "></i> Previous
                                    </button>
                                    <button onClick={(event) => {handleSubmit(event); next()}} type="button" name="next" className="next action-button">Continue <i
                                        className="uil uil-arrow-right"></i></button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}