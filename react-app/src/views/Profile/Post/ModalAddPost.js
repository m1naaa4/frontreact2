import React, { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { AddPostAction, GetYoutubeAction } from "../../../store/actions/Post/PostAction";
import FileUploadService from "../../../helpers/FileUploadService";
// import PusherService from '../../../services/Pusher';
import Player from "video-react/lib/components/Player";
import { useParams } from "react-router";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from 'react-toastify';
import YouTube from 'react-youtube';
import $ from 'jquery'

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

    console.log(newavatar)
    const [formData, setForm] = useForm({file:'',visibility:'', provider_id:'', type:'', url:'', provider:'profile', action:'uploadPost'});

    const params = useParams();

    const infoprofile = useSelector(state => state.infoProfile);

    useEffect(() => {          
        if (infoprofile.infoprofile.avatar) {              
            setAvatar(infoprofile.infoprofile.avatar)            
        }     
    },[infoprofile.infoprofile.avatar])
    const dispatch = useDispatch();

    const data = {
        user_profile_id : params.id,
        body       : body,
        action     : 'addPost',
        type       : type,
        visibility : visibility,
        youtubeId  : youtubeId,
        medialink : medialink,
    }
    console.log(type)

    const handleSubmitValue = (e) => {
        e.preventDefault();
        refbody.current.value = '';
        dispatch(AddPostAction(data));
              
    }

    useEffect(() => {
        setYoutube(youtube_id);
        if (type ==='youtube') {
            setYoutubeId(youtube_id)
            setMedialink('')
        }
    })
    
    const selectFile = (e) => {   
        setSelectedFiles(e.target.files[0]); 
        setType('file')    
        getBase64(e.target.files[0]); 
    };

    const selectImage = (e) => {  
        setYoutubeId(null); 
        setSelectedFiles(e.target.files[0]); 
        setType('image')    
        getBase64(e.target.files[0]); 
    };

    const selectVideo = (e) => {
        setYoutubeId(null);
        setSelectedFiles(e.target.files[0]);
        setType('video')     
        getBase64(e.target.files[0]); 
    };

    const onLoad = (fileString) => {
        formData.file =  fileString;
        formData.provider_id = params.id;
        formData.type =  type;
        formData.url =  'video/upload';
    };
    
    const getBase64 = (file, type) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result, type);
            handleUpload(file)
        };
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
       }, [refbody])

    const opts = {
        height: '100%',
        width: '380',
        // playerVars: {
        //   // https://developers.google.com/youtube/player_parameters
        //   autoplay: 1,
        // },
      };
    

    const handleUpload = async e => {
        FileUploadService.upload(formData, (e) => {
            toastId.current = toast('Upload in Progress', {
                progress: Math.round((100 * e.loaded) / e.total)
            });
        })
        .then((response) => {
            setMedialink(response.data.url)
            setType(response.data.type)
            setSelectedFiles(undefined);
            toast.done(toastId.current);
        })
        .then((files) => {
            //setFileAvatar(files.data);
            toast.done(toastId.current);
        })
        .catch(() => {
        });        
    }

  return (    
            <div className="modal-body">

                <div className="AddNewPost-Form">

                    <div className="CreatePost-Row">
                        <div className="CreatePost-ColLeft">
                            <div className="CreatePost-UserThumb">
                                { console.log(newavatar)}
                                {/* <img src={newavatar.newavatar} alt="avatar"/> */}
                                {newavatar ? 
                                <img src={newavatar} alt="avatar" />    
                            : <img src="/assets/images/avatar.png" alt="avatar" />}
                            </div>
                                <div className="CreatePost-OptionsRow">
                                    <div className="CreatePost-Options">
                                        {/* <button type="button" className="CreatePost-Option CreatePost-OptionDate" data-toggle="tooltip" data-placement="right" title="Add date"><i className="uil uil-calendar-alt"></i></button> */}
                                        <button type="button" className="CreatePost-Option CreatePost-OptionImage" data-toggle="tooltip" data-placement="right" title="Add Image">
                                            <input type="file" ref={hiddenImage} onChange={selectImage}  accept="image/jpeg, image/x-png" /><i className="uil uil-image"></i>
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
                                    <textarea id="textbody" name="post" onChange={e => {setBody(e.target.value); getyoutube(e.target.value)} } ref={refbody} placeholder="What in your mind ?"></textarea>
                                    {
                                        medialink? (type === "video" ? (
                                            <Player width="100%" height="100%"
                                                playsInline
                                                poster="/assets/poster.png"
                                                src={medialink}
                                            />
                                            ) : (<img width="100%" height="300" src={medialink} alt="media"/>)): '' 
                                    }
                                    {
                                        youtubeId && 
                                        <YouTube videoId={youtubeId} opts={opts} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="CreatePost-Footer">
                            <div className="CreatePost-FooterLeft">
                            <div className="Send-Message input-row input-select">
                                    <select className="CreatePost-AddTag" name="visibility" onChange={(e) => setVisibility(e.target.value)}  defaultValue="public">
                                        <option value="public" selected> Public </option>
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
