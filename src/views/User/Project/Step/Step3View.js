import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import InputTags from "../../../../utils/tags/TagsInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AddProjectsAction } from '../../../../store/actions/User/Project/AddProjectAction';


export default function Step3View({formData, setForm, navigation, props}) {
    const {previous, next} = navigation;

    const { tags, descriptions } = formData;

    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [tag, setTags] = useState([]);
    console.log("taaaaaaaaaaaaaaaaaagggggggggggggggggggggggggggggggggggggggggosssssssssssssss",tags)


    const selectedTags = tags => {
        setTags(tags)
    };

    const project = useSelector(state => state.addproject);

    const handleSubmit = async e => {
        e.preventDefault();

        formData.tags           = tag;
        formData.descriptions   = description;
        // const formData = new FormData();
        // formData.append('description', description);
        // formData.append('tags', tags);
        formData.project_id = project.projectid;
        formData.action     = 'create';
        dispatch(AddProjectsAction (formData, props, '/create', navigation));

        next()
    };
    const projectt = useSelector(state => state.addproject);

    //console.log("project3", projectt)

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
                                            {/*<div id="editor">This is some sample content.</div>*/}
                                            <ReactQuill id="editor" style={{ height: "250px"}} theme="snow" name="description" defaultValue={descriptions} onChange={setDescription}/>
                                        </div>
                                        <div className="col-md-12 input-tags">
                                            {/*<input type="text" data-role="tagsinput" value="" placeholder="Ajouter Tag"/>*/}
                                            <InputTags  selectedTags={selectedTags}  tags={tags}/>
                                        </div>
                                    </div>
                                    <button onClick={previous} type="button" name="previous" className="previous action-button"><i
                                        className="uil uil-arrow-left  "></i> Previous
                                    </button>
                                    <button onClick={(event) => {handleSubmit(event);  next()}} type="button" name="next" className="next action-button">Continue <i
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