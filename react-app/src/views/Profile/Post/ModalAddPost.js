import React, { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { AddPostAction, GetYoutubeAction } from "../../../store/actions/Post/PostAction";
import FileUploadService from "../../../helpers/FileUploadService";
import { useParams } from "react-router";
import { useForm } from "react-hooks-helper";
import { toast } from 'react-toastify';
import YouTube from 'react-youtube';
import $ from 'jquery'
import { UploadMediaAction } from "../../../store/actions/Media/MediaAction";
import ReactPlayer from "react-player";
import VideoJS from "../../../helpers/VideoJS";

export default function({newavatar, handleClose}) {
    const [avatar, setAvatar] = useState();
    const [body, setBody] = useState();
    const [medialink, setMedialink] = useState();
    const [type, setType] = useState('normal');
    const refbody = useRef(null);
    const hiddenImage = useRef(null);
    const hiddenVideo = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [youtube, setYoutube] = useState(false);
    const [youtubeId, setYoutubeId] = useState();
    const [visibility, setVisibility] = useState('public');
    const toastId = React.useRef(null);

    const [formData, setForm] = useForm({file:'',visibility:'', provider_id:'', type:'', url:'', provider:'profile', action:'uploadPost'});

    const params = useParams();

    const infoprofile = useSelector(state => state.infoProfile);
    const uploadedLinks = useSelector(state => state.post);

    useEffect(() => {          
        if (infoprofile.infoprofile.avatar) {              
            setAvatar(infoprofile.infoprofile.avatar)            
        }     
    },[infoprofile.infoprofile.avatar])
    const dispatch = useDispatch();

    useEffect(() => {
        if (uploadedLinks.media_posts) {
            setSelectedFiles(uploadedLinks.media_posts.urls);
        }
    }, [uploadedLinks.media_posts?.urls])

    const handleSubmitValue = (e) => {
        e.preventDefault();
        const data = {
            profile_id : params.id,
            body       : body,
            type       : type,
            visibility : visibility,
            youtubeId  : youtubeId,
            medialink : selectedFiles,
        }
        refbody.current.value = '';
        dispatch(AddPostAction(data, '/create'));     
    }

    useEffect(() => {
        setYoutube(youtube_id);
        if (type ==='youtube') {
            setYoutubeId(youtube_id)
            setMedialink('')
        }
    })

    const selectImage = (e) => {
        const newFiles = Array.from(e.target.files);
        const formDataa = new FormData();
        newFiles.forEach((file) => {
            formDataa.append('attachments[]', file);
            formDataa.append("media_section", "post");
            formDataa.append("media_type", "image");
            formDataa.append("provider", "post");
            formDataa.append("visibility", 'public');
        });

        dispatch(UploadMediaAction(formDataa, '/upload'));
        setYoutubeId(null); 
        setType('image')    
        // getBase64(e.target.files[0]); 
    };

    const selectVideo = (e) => {
        const newFiles = Array.from(e.target.files);
        const formDataa = new FormData();
        newFiles.forEach((file) => {
            formDataa.append('attachments[]', file);
            formDataa.append("media_section", "post");
            formDataa.append("media_type", "video");
            formDataa.append("provider", "post");
            formDataa.append("visibility", 'public');
        });
        dispatch(UploadMediaAction(formDataa, '/upload'));
        setYoutubeId(null);
        setType('video');
        setBody('')
        // getBase64(e.target.files[0]); 
    };

    const youtube_id =  useSelector(state => state.youtube?.youtube?.message?.id);

    const getyoutube =(url)=>{
        const datayoutube = {
            user_profile_id : params.id,
            youtube_source  : url,
        }
        if (matchYoutubeUrl(url)){
            dispatch(GetYoutubeAction(datayoutube, 'post/getYoutubeVideo', ''));
            setType('youtube');
            $('#textbody').val('')
            setBody('')
        }
    }

    const matchYoutubeUrl = (url) => {
        return url.match(/youtube\.com/) ? true : false ;
    }

    useEffect(() => {
        if(refbody.current) refbody.current.focus(); 
    }, [refbody]);

    const opts = {
        height: '100%',
        width: '380',
    };

    const handleUpload = async e => {
        FileUploadService.upload(formData, (e) => {
            toastId.current = toast('Upload in Progress', Math.round((100 * e.loaded) / e.total));
        })
        .then((response) => {
            setMedialink(response.data.url)
            setType(response.data.type)
            setSelectedFiles(undefined);
        })
        .catch(() => {
        });        
    }

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
            <div className="modal-body">

                <div className="AddNewPost-Form">

                    <div className="CreatePost-Row">
                        <div className="CreatePost-ColLeft">
                            <div className="CreatePost-UserThumb">
                                {/* <img src={newavatar.newavatar} alt="avatar"/> */}
                                {newavatar ? 
                                <img src={newavatar} alt="avatar" />    
                            : <img src="/assets/images/avatar.png" alt="avatar" />}
                            </div>
                                <div className="CreatePost-OptionsRow">
                                    <div className="CreatePost-Options">
                                        {/* <button type="button" className="CreatePost-Option CreatePost-OptionDate" data-toggle="tooltip" data-placement="right" title="Add date"><i className="uil uil-calendar-alt"></i></button> */}
                                        <button type="button" className="CreatePost-Option CreatePost-OptionImage" data-toggle="tooltip" data-placement="right" title="Add Image">
                                            <input type="file" ref={hiddenImage} onChange={selectImage} multiple accept="image/jpeg, image/x-png" /><i className="uil uil-image"></i>
                                        </button>
                                        <button type="button" className="CreatePost-Option CreatePost-OptionVideo" data-toggle="tooltip" data-placement="right" title="Add Video">
                                            <input type="file" ref={hiddenVideo} onChange={selectVideo} accept="video/x-mpeg2, video/x-msvideo, video/quicktime, video/mp4" /><i className="uil uil-video"></i>
                                        </button>
                                        {/* <button type="button" className="CreatePost-Option CreatePost-OptionFile" data-toggle="tooltip" data-placement="right" title="Add File">
                                            <input type="file" ref={hiddenFile} onChange={selectFile} accept="file" /><i className="uil uil-file-alt"></i>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                            <div className="CreatePost-ColRight">
                                <div className="CreatePost-Body">
                                    <textarea id="textbody" name="post" onChange = {e => {setBody(e.target.value); getyoutube(e.target.value)} } ref={refbody} placeholder="What in your mind ?"></textarea>
                                    {selectedFiles && <>
                                    {selectedFiles.map(item => (
                                        <div key = {item} style = {{ flex: `1 0 ${100/selectedFiles.length}%` }}>
                                            <div className="col-md-12 input-row">
                                            {(function() {
                                                    if(getExtension(item) == 'youtube'){
                                                        return <ReactPlayer url = {item} controls = {true} />
                                                    }else{
                                                        if(getExtension(item) == 'vimeo'){
                                                            return <ReactPlayer url = {item} controls = {true} />
                                                        }else{
                                                            if(getExtension(item) == 'mp4' || getExtension(item) == ('x-mpeg2') ||
                                                            getExtension(item) == ('x-msvideo') || getExtension(item) == ('quicktime')){
                                                                return <VideoJS options = {
                                                                {
                                                                    autoplay: false,
                                                                    controls: true,
                                                                    responsive: true,
                                                                    fluid: true,
                                                                    sources: [{
                                                                        src: item,
                                                                        type: 'video/mp4'
                                                                    }]
                                                                }
                                                                }/>
                                                            }else{
                                                                return <img width="100%" height="300" src = {item} alt="post"/>
                                                            }
                                                        }
                                                    }
                                            })()}
                                            </div>
                                        </div>
                                    ))}
                                    </>
                                    }
                                    {youtubeId &&
                                        <YouTube videoId= {youtubeId} opts = {opts} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="CreatePost-Footer">
                            <div className="CreatePost-FooterLeft">
                            <div className="Send-Message input-row input-select">
                                    <select className="CreatePost-AddTag" name="visibility" onChange={(e) => setVisibility(e.target.value)}>
                                        <option defaultValue="public"> Public </option>
                                        {/* <option value="shared">Shared</option> */}
                                        {/* <option value="team">Team</option> */}
                                        <option value="friends"> Friends </option>
                                        <option value="private"> Only me </option>
                                    </select>
                                </div>
                                {/* <button type="button" className="CreatePost-AddTag"><i className="uil uil-plus"></i> Ajouter un tag</button> */}
                            </div>
                            <div className="CreatePost-FooterRight">
                                <button name="button" className="CreatePost-PublishBTN" onClick={(e)=>{handleSubmitValue(e); handleClose()}} >Publish</button>
                            </div>
                        </div>
                </div>
            </div>         
    );
}
