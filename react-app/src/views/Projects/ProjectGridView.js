import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Text } from "../../containers/Language";
import SharePopUp from '../../utils/SharePopUp'
import { countryName } from '../../helpers/Helpres'
import { useHistory } from "react-router-dom";
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';
import { useDispatch, useSelector } from 'react-redux';
import AvatarTooltip from '../../utils/AvatarTooltip';
import DialogWarning from '../../utils/DialogWarning';
import $ from 'jquery'
import {
    FacebookShareCount,
} from "react-share";
import ReactPlayer from 'react-player';
import VideoJS from '../../helpers/VideoJS';
import YouTube from 'react-youtube';


const ProjectGridView = ({ project }) => {
    const [shareUrl, setShareUrl] = useState(false);
    const [classe, setClasse] = useState(project?.favorite);
    const [open,setOpen] = useState(false);
    const [titleDialog,setTitleDialog] = useState("Confirm To add to Favorite");
    const [ContentDialog,setContentDialog] = useState("are you sure you want to add this post to favorite?");
    const dispatch = useDispatch();
    let history = useHistory();
    const user = useSelector(state => state.userProfile.userProfile);
    const ref = useRef();

    let url_to_share = [project.name, `${process.env.REACT_APP_FRONT_URL}` + '/project/show/' + project.id];

    const addTofavorite = (id) => {
        setClasse(!classe)
        let data = {
            'url': 'favorite/addToFavorite',
            'provider_id': id,
            'provider': 'project',
        }
        dispatch(AddFavoriteAction(data));
        setOpen(false);
    }

    useEffect(() => {
        if(classe){
            setTitleDialog("Confirm To Remove From Favorite");
            setContentDialog("are you sure you want to remove this post from favorite?");
        }else{
            setTitleDialog("Confirm To add to Favorite");
            setContentDialog("are you sure you want to add this post to favorite?");
        }
    })

    const goToShowproject = (id) => {
        localStorage.setItem('provider', 'project')
        localStorage.setItem('provider_name', project.name)
        localStorage.setItem('owner_of_provider', JSON.stringify(project.owner[0]))
        history.push('/project/show/' + id)
    };

    const HandleClose = ()=>{
        setOpen(false);
      }
      
    const HandleClickOpen = () =>{
    setOpen(true);
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

    const opts = {
        height: '300',
        width: '100%'
    };

    return (

        <div className="offer-box">
            <div className="offer-header" >
                <div className="offer-title">
                    {(project.logo_link === '/assets/images/porject-logo.png') ? <img src={project.logo_link} title="Nom du projet" alt="" /> :
                        <img src={project.logo_link} title="Nom du projet" alt="" />}

                    <h3><span onClick={() => goToShowproject(project.id)} data-toggle="tooltip" data-placement="top" title={project.name}>
                        {project.name.substring(0, 10)}</span></h3>
                    <div className='footer-title'>
                        <span className='mr-5'>{project.sector && (project.sector.charAt(0).toUpperCase() + project.sector.slice(1))}, </span>
                        {project.owner && project.owner.map((value, index) => {
                            return <Link key={index} ref={ref} to={`/profile/${value.profile_id}`} data-toggle="tooltip" data-placement="top" title={value.username}>
                                {value.username.substring(0, 6)}
                                {(user?.profile_id != project.owner[0].profile_id) ? (<AvatarTooltip myRef={ref} data={value} styles={{ marginTop: "67px", marginRight: "69px" }} />) : ("")}
                            </Link>
                        }
                        )}
                        <span>{project.visibility == 'public' ? <i className="uil uil-globe"></i> : ''}</span>
                    </div>
                </div>

                <div className="offer-logo">
                    <button className={`${classe ? 'near-deadline' : ''} offer-bookmark`} onClick={HandleClickOpen} type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer">
                        {console.log(classe)}
                        {/* <i className={classe ? 'uis uis-bookmark' : 'uil uil-bookmark'} ></i> */}
                        <i className="uil uil-bookmark"></i>
                    </button>
                    <DialogWarning 
                        title={titleDialog} 
                        ContentText={ContentDialog} 
                        open={open} 
                        HandleConfirmation={e => addTofavorite(project.id)}
                        HandleClose={HandleClose}
                    />
                </div>
            </div>
            <div className="offer-media">
               
                {(function() {
                    let link = $.isArray(project.media_link) ? project.media_link[0] : project.media_link;
                    if(getExtension(project.media_link) == 'youtube'){
                        return <ReactPlayer width='340' url={link} controls={true} />
                        // return <YouTube videoId={link} opts={opts} />
                    }else{
                        if(getExtension(project.media_link) == 'vimeo'){
                            return <ReactPlayer url={link} controls={true} />
                        }else{
                            if(getExtension(link) == 'mp4' || getExtension(link) == ('x-mpeg2') ||
                            getExtension(link) == ('x-msvideo') || getExtension(link) == ('quicktime')){
                                return <VideoJS options={
                                {
                                    autoplay: false,
                                    controls: true,
                                    responsive: true,
                                    fluid: true,
                                    sources: [{
                                        src: link,
                                        type: 'video/mp4'
                                    }]
                                }
                                }/>
                            }else{
                                return <img width="100%" height="300" src={link} alt="Project"/>
                            }
                        }
                    }
                })()}
            </div>
            <div className="offer-meta">
                <ul className="meta-items">
                    <li className="meta-item">
                        <div className="meta-icon">
                            <img src="/assets/images/icons/marker.svg" alt="" />
                        </div>
                        <div className="meta-details">
                            <span className="meta-title" onClick={() => goToShowproject(project.id)}><Text tid="targetAreas" /></span>
                            <span className="meta-value">{countryName(project.project_area)}</span>
                        </div>
                    </li>
                    <li className="meta-item">
                        <div className="meta-icon">
                            <img src="/assets/images/icons/cost.svg" alt="" />
                        </div>
                        <div className="meta-details">
                            <span className="meta-title"><Text tid="funding" /></span>
                            <span className="meta-value">${project.funding_search}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="offer-reactions">
                <ul className="reactions-box">
                    <li className="reaction likes"><i className="dadupa-icon icon-clap"></i>
                        <span>{project.likeCount}</span></li>
                    <li className="reaction views"><i className="uil uil-eye"></i>
                        <span>{project.visit}</span></li>
                    <li className="reaction comments"><i
                        className="uil uil-comment-dots"></i> <span>{project.commentCount}</span>
                    </li>
                    <li className="reaction shares" onClick={() => setShareUrl(true)}>
                        <i className="uil uil-share-alt"></i>
                        <FacebookShareCount url={shareUrl}>
                            {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                        </FacebookShareCount>
                        <span>{project.shared}</span>
                    </li>
                </ul>
            </div>
            <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
        </div>

    )
}

export default ProjectGridView;