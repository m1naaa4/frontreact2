import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { useLocation, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { GetFunder } from "../../../store/actions/Funder/FunderActions";
import { UpdateService } from "../../../services/Funder/FunderServices";

export default function Step2View({ formData, setForm, navigation, props }) {
  const dispatch = useDispatch();
  const { medialink, mediatype } = formData;
  const [editVideo, setEditVideo] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [file, setFile] = useState(medialink);
  const [media, setMedia] = useState(mediatype);
  const [show,setShow] = useState(false);
  const [isLink, setLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const [message, setMessage] = useState("");
  const hiddenFileInput = useRef(null);

  const project = useSelector(state => state.funders.funder);

  const [changed, setChanged] = useState(false);
  const [disable, setDisabled] = useState(true);
  const toastId = useRef(null);

  //files 
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const location = useLocation();
  const history = useHistory();
  const projectId = useMemo(
    () => location.pathname.split('/')[location.pathname.split('/').length - 2],
    [location.pathname]
  );

  useEffect(() => {
    setChanged(true);
  }, [location]);

  useEffect(() => {
    if (projectId === "create" || project === "loading" || !project) {
      return;
    }
    setFile(project.media);

    setMedia(project.is_video);
    formData.media_link = project.media;
    formData.mediatype = project.is_video;
  }, [projectId, project]);

  useEffect(() => {
    if (projectId !== "create" && projectId !== "step2" && projectId !== "step3" && projectId !== "final") {
        dispatch(GetFunder('/' + projectId));
    }  
}, [dispatch]);

  const { go } = navigation;

  function previous() {
    history.push('/funder/create/' + projectId);
    go('step1');
  }

  function handleUpload (e) {
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles);

    const formDataa = new FormData();
    newFiles.forEach((file) => {
      formDataa.append('attachments[]', file);
      formDataa.append("media_section", "funder");
      formDataa.append("media_type", checkFileType(file));
      formDataa.append("provider", "funder");
      formDataa.append("visibility", 'public');
      formDataa.append("provider_id", projectId);
    });

    let url = `${process.env.REACT_APP_MEDIA_UPLOAD}` + '/upload';
    axios.defaults.withCredentials = false;

    axios.post(url, formDataa, {
      onUploadProgress: progressEvent => {
        if (progressEvent.loaded > 0) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress.toFixed(2));
            toastId.current = toast.loading("Uploading Please wait...");
        }
      },
    })
    .then((response) => {
      const urls = response.data.urls;
      toast.update(toastId.current, { 
          render: 'Upload successful!', 
          type: toast.TYPE.SUCCESS, 
          isLoading: false,
          autoClose: 3000,
      });
      setFiles([]);
      setFile(urls);
      setEditVideo(false);
      let data = {
          'media_link' : urls,
          'project_id' : projectId,
      }
      UpdateService(data, '/update-media');

    });
  };

  const  checkFileType = (file) => {
    if (file) {
      var fileName = file.name; // Or file.url if available
  
      // Get the file extension
      var fileExtension = fileName.split('.').pop().toLowerCase();
    
      // List of supported image extensions
      var imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    
      // List of supported document extensions
      var documentExtensions = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv', 'pdf'];
    
      // List of supported video extensions
      var videoExtensions = ['mp4', 'm4v', 'mov', 'avi', 'flv', 'wmv', 'mkv', 'webm'];
    
      if (imageExtensions.indexOf(fileExtension) !== -1) {
        return 'image';
      } else if (documentExtensions.indexOf(fileExtension) !== -1) {
        return 'document';
      } else if (videoExtensions.indexOf(fileExtension) !== -1) {
        return 'video';
      } else {
        return 'image';
      }
    }
  }  

  function next() {
    history.push('/funder/create/' + projectId + '/' + 'step3');
    go('step3');
  }

  useEffect(() => {
    if (projectId !== "create" && projectId !== "step2" && projectId !== "step3" && projectId !== "final") {
      dispatch(GetFunder('/' + projectId));
    }
  }, [dispatch]);

  const HandlePreview = (e) => {
    e.preventDefault();
    if (linkUrl.includes("youtube.com")) {
      setFile(linkUrl);
      setSelectedFiles(undefined);
      dispatch({ type: "GET_YOUTUBE_SUCCESS", linkUrl });
      setMedia("youtube");
      setEditVideo(false);
      setLink(true);
      setShow(false);

      let data = {
        'media_link' : [linkUrl],
        'project_id' : projectId,
      }
      UpdateService(data, '/update-media');

    }else if(linkUrl.includes("vimeo.com")){
      setFile(linkUrl);
      setSelectedFiles(undefined);
      setMedia("vimeo");
      setEditVideo(false);
      setLink(true);
      setShow(false);

      let data = {
        'media_link' : [linkUrl],
        'project_id' : projectId,
      }
      UpdateService(data, '/update-media');

    }else{
      setShow(true);
    }
  };

  const getExtension = (file) => {
    if (/^(https?:\/\/)?((www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/.test(file))
    { 
        return 'youtube';
    }
    else if (/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/.test(file))
    {
        return 'vimeo';
    }
    else
    {
        return file.split('.').pop().toLowerCase();
    }
    
  };

  return (
    <div className="Page-Wrapper">
      <ToastContainer position="bottom-left" hideProgressBar={false} />
      <div className="container">
        <div className="offer-wizard-wrapper">
          <div className="row">
            <div className="col-md-4 col-lg-4 d-md-none d-lg-block">
              <div className="page-header">
                <h3>Détails de l'offre</h3>
                <div id="authErr">{message}</div>
                <p>
                  Enter details about the project <br />
                  to preceed further
                </p>
                <img src="/assets/images/offer-thumbnail.svg" />
              </div>
            </div>
            <div className="col-md-12 col-lg-8">
              <div id="form-wizard" className="form-wizard">
                <ul id="wizardbar">
                  <li className="active done">
                    <div className="Step-Number">
                      <span>1</span>
                      <i className="uil uil-check"></i>
                    </div>
                    <div className="Step-Title">Détails de l'offre</div>
                  </li>
                  <li className="active">
                    <div className="Step-Number">
                      <span>2</span>
                      <i className="uil uil-check"></i>
                    </div>
                    <div className="Step-Title">Upload vidéo</div>
                  </li>
                  <li>
                    <div className="Step-Number">
                      <span>3</span>
                      <i className="uil uil-check"></i>
                    </div>
                    <div className="Step-Title">Description de l'offre</div>
                  </li>
                  <li>
                    <div className="Step-Number">
                      <span>4</span>
                      <i className="uil uil-check"></i>
                    </div>
                    <div className="Step-Title">Review Details</div>
                  </li>
                </ul>

                <fieldset className="wizard-fieldset">
                  <div className="fieldset-header">
                    <div className="Step-Title">Upload vidéo</div>
                    <p>
                      Enter details about the project <br />
                      to preceed further
                    </p>
                  </div>
                  {file && !editVideo && !isLink && (
                    <div className="form-inputs">
                      <button
                        type="button"
                        name="button"
                        onClick={() => setEditVideo(true)}
                        className="edit-button edit-btn-video"
                      >
                        <i className="uil uil-pen"></i>
                      </button>
                      <div className="wizard-fieldset-row">
                            
                        {file.map(item => (
                          <div key={item} className="wizard-fieldset-item">
                            <div className="col-md-12 input-row">
                            {(function() {
                                  if(getExtension(item) == 'youtube'){
                                      return <ReactPlayer url={item} controls={true} />
                                  }else{
                                      if(getExtension(item) == 'vimeo'){
                                          return <ReactPlayer url={item} controls={true} />
                                      }else{
                                          if(getExtension(item) == 'mp4' || getExtension(item) == 'ogg'
                                          || getExtension(item) == 'webm'|| getExtension(item) == 'x-msvideo'
                                          || getExtension(item) == 'quicktime'
                                          ){
                                              return <ReactPlayer url = {item} controls = {true} />
                                          }else if (getExtension(item) == 'doc' || getExtension(item) == 'docx'
                                          || getExtension(item) == 'xls'|| getExtension(item) == 'xlsx'
                                          || getExtension(item) == 'ppt' || getExtension(item) == 'pptx'
                                          || getExtension(item) == 'csv' || getExtension(item) == 'pdf'
                                          ){
                                            return <div className="Doc-Wrap">
                                                                <a href="#!">
                                                                  <div className="Doc-Icon"><span className="Doc-Type"></span><i className="uil uil-file-alt"></i></div>
                                                                  <div className="Doc-Name"><i className="uil uil-paperclip"></i> </div>
                                                                </a>
                                                              </div>
                                          } else {
                                            return <img width="100%" height="300" src={item} alt="Project"/>
                                          }
                                      }
                                  }
                              })()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {file && !editVideo && isLink && (
                    <div className="form-inputs">
                      <button
                        type="button"
                        name="button"
                        onClick={() => {
                          setEditVideo(true);
                          setLink(false);
                        }}
                        className="edit-button edit-btn-video"
                      >
                        <i className="uil uil-pen"></i>
                      </button>

                      <div className="col-md-12 input-row">
                        {
                          <ReactPlayer
                            url={formData.medialink}
                            controls={true}
                          />
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
                            <form encType='multipart/form-data'>
                              <label
                                htmlFor="file-upload"
                                className="custom-file-upload"
                              >
                                Upload Media
                              </label>
                              <input
                                ref={hiddenFileInput}
                                onChange={handleUpload}
                                multiple
                                id="file-upload"
                                type="file"
                              />
                            </form>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="youtube-dwn">
                            <i className="uil-download-alt"></i>
                            <h3>Import videos from YouTube or Vimeo</h3>
                            <span>Copy / Paste your video link here</span>
                            <form onSubmit={HandlePreview}>
                              <input
                                type="text"
                                name="import_video"
                                placeholder="Paste link here"
                                onChange={(e) => {
                                  setLinkUrl(e.target.value);
                                  setDisabled(false);
                                }}
                              />
                              <button disabled={disable}>Preview Video</button>
                            </form>
                            
                            {(show) && (<div class="alert alert-danger" style={{marginTop:"5px",borderRadius:"30px"}}> <span style={{fontSeize:"12px"}}>Only youtube or vimeo links are allowed!</span> </div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={previous}
                    name="previous"
                    className="previous action-button"
                  >
                    <i className="uil uil-arrow-left  "></i> Previous
                  </button>
                  <button
                    onClick={next}
                    disabled={!file}
                    name="next"
                    className="next action-button"
                  >
                    Continue
                    <i className="uil uil-arrow-right"></i>
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
