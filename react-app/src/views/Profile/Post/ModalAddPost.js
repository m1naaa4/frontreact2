import React, { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { AddPostAction, GetYoutubeAction } from "../../../store/actions/Post/PostAction";
import FileUploadService from "../../../helpers/FileUploadService";
// import PusherService from '../../../services/Pusher';
import Player from "video-react/lib/components/Player";
import { useParams } from "react-router";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from "../../../skeleton/ProgressBar";

export default function(newavatar) {
    const [show, setShow] = useState(false);
    const [avatar, setAvatar] = useState();
    const [body, setBody] = useState();
    const [medialink, setMedialink] = useState();
    const [type, setType] = useState('normal');
    const refbody = useRef(null);
    const hiddenImage = useRef(null);
    const hiddenVideo = useRef(null);
    const hiddenFile = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [youtube, setYoutube] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const toastId = React.useRef(null);

    const handleClose = () => setShow(false);
    //let formData = new FormData();
    const [formData, setForm] = useForm({file:'', provider_id:'', type:'', url:'', provider:'profile', action:'uploadPost'});

    const params = useParams();

    const infoprofile = useSelector(state => state.infoProfile);

    useEffect(() => {          
        if (infoprofile.infoprofile.avatar) {              
            setAvatar(infoprofile.infoprofile.avatar)            
        }     
    },[infoprofile.infoprofile.avatar])
    const dispatch = useDispatch();

    const data = {
        profile_post_id : params.id,
        body       : body,
        action     : 'addPost',
        type       : type,
        medialink : medialink,
    }
    console.log(type)

    const handleSubmitValue = (e) => {
        e.preventDefault();
        refbody.current.value = '';
        dispatch(AddPostAction(data));
              
    }
    
    useEffect(() => {
        // const pusher = new PusherService();        
        // var channel = pusher.config.subscribe('post_' + params.id);        
        // channel.bind('NewPost', function(res) {                
        //     let j = res.id;
        //     let feed = res[j]
        //     dispatch({type:'ADD_TO_COLLECTION_POST_SUCCESS', feed});            
        // });
        setYoutube(youtubee)
    
    })
    
    const selectFile = (e) => {   
        setSelectedFiles(e.target.files[0]); 
        setType('file')    
        getBase64(e.target.files[0]); 
    };

    const selectImage = (e) => {   
        setSelectedFiles(e.target.files[0]); 
        setType('image')    
        getBase64(e.target.files[0]); 
    };

    const selectVideo = (e) => {   
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

    const youtubee =  useSelector(state => state.youtube?.youtube?.message?.iframe);
    console.log('dfdfdfdfdfdjjjjjjjjjjjjj', youtubee)

    const getyoutube =(url)=>{
        console.log('llllllllllllllllllllllllllllllllllllllllllllllllllllllll', url, matchYoutubeUrl(url))
        const datayoutube = {
            profile_post_id : params.id,
            youtube_source  : url,
        }
        if (matchYoutubeUrl(url)){
            dispatch(GetYoutubeAction(datayoutube, 'post/getYoutubeVideo', ''));
        }
    }

    const matchYoutubeUrl = (url) => {
        return url.match(/youtube\.com/) ? true : false ;
    }
    

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
            setMessage("Could not upload the file!");
        });        
    }

  return (    
            <div className="modal-body">

                <div className="AddNewPost-Form">

                    <div className="CreatePost-Row">
                        <div className="CreatePost-ColLeft">
                            <div className="CreatePost-UserThumb">
                                {/* <img src={newavatar.newavatar} alt="avatar"/> */}
                                {newavatar.newavatar ? 
                                <img src={newavatar.newavatar} alt="avatar" />    
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
                                    <textarea name="post" onChange={e => {setBody(e.target.value); getyoutube(e.target.value)} } ref={refbody} placeholder="De quoi souhaitez-vous discuter ?"></textarea>
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
                                        youtube && 
                                        <div className="review-content"  width="100%" height="300"dangerouslySetInnerHTML={{ __html: youtube }}>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="CreatePost-Footer">
                            {/* <div className="CreatePost-FooterLeft">
                                <button type="button" className="CreatePost-AddTag"><i className="uil uil-plus"></i> Ajouter un tag</button>
                            </div> */}
                            <div className="CreatePost-FooterRight">
                                <button name="button" className="CreatePost-PublishBTN" onClick={handleSubmitValue} >Publish</button>
                            </div>
                        </div>
                </div>
            </div>         
  );
}
