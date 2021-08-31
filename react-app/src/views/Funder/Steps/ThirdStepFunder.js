import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import InputTags from "../../../utils/tags/TagsInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';
import { SaveDescriptionFunderAction } from '../../../store/actions/Funder/FunderActions'


const ThirdStepFunder = ( {formData, setForm, navigation, props} ) => {
  const {previous, next} = navigation;

  const { tags, description } = formData;

  const dispatch = useDispatch();
  const [descriptions, setDescription] = useState(description);
  const [tag, setTags] = useState(tags);
  const { t } = useTranslation();


  const selectedTags = tags => {
      setTags(tags)
  };

  const project = useSelector(state => state.createFunder);

  const handleSubmit = async e => {
      e.preventDefault();

      formData.tags           = tag;
      formData.description   = descriptions;
      // const formData = new FormData();
      // formData.append('description', description);
      // formData.append('tags', tags);
      formData.project_id = project.funderId;
      formData.action     = 'create';
      dispatch(SaveDescriptionFunderAction(formData, props, '/'+project.funderId+'/description', navigation));

      next()
  };
    
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
                            <form id="form-wizard"  className="form-wizard">
                                <ul id="wizardbar">
                                    <li className="active">
                                        <div className="Step-Number"><span>1</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('project.add.detail_offre')} </div>
                                    </li>
                                    <li className="active">
                                        <div className="Step-Number"><span>2</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('upload_video')}</div>
                                    </li>
                                    <li className="active">
                                        <div className="Step-Number"><span>3</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('desc_offre')}</div>
                                    </li>
                                    <li>
                                        <div className="Step-Number"><span>4</span><i className="uil uil-check"></i></div>
                                        <div className="Step-Title">{t('review_detail')}</div>
                                    </li>
                                </ul>

                                <fieldset className="wizard-fieldset">
                                    <div className="form-inputs">
                                        <div className="col-md-12 input-row">
                                            {/*<div id="editor">This is some sample content.</div>*/}
                                            <ReactQuill id="editor" style={{ height: "250px"}} theme="snow" name="description" defaultValue={description} onChange={setDescription}/>
                                        </div>
                                        <div className="col-md-12 input-tags">
                                            {/*<input type="text" data-role="tagsinput" value="" placeholder="Ajouter Tag"/>*/}
                                            <InputTags  selectedTags={selectedTags}  tags={tags}/>
                                        </div>
                                    </div>
                                    <button onClick={previous} type="button" name="previous" className="previous action-button"><i
                                        className="uil uil-arrow-left  "></i> {t('previous')}
                                    </button>
                                    <button onClick={(event) => {handleSubmit(event);  next()}} type="button" name="next" className="next action-button">{t('next')} <i
                                        className="uil uil-arrow-right"></i></button>
                                </fieldset>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ThirdStepFunder;