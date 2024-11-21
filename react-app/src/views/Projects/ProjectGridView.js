import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import SharePopUp from '../../utils/SharePopUp'
import { countryName } from '../../helpers/Helpres'
import { useHistory } from "react-router-dom";
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';
import { useDispatch, useSelector } from 'react-redux';
import AvatarTooltip from '../../utils/AvatarTooltip';
import DialogWarning from '../../utils/DialogWarning';
import finances from '../../data/financesCreate';
import etats from '../../data/etatsCreate';
import sectors from '../../data/sectorsCreate';
import { useTranslation } from 'react-i18next';
import $ from 'jquery'
import {
    FacebookShareCount,
} from "react-share";
import ReactPlayer from 'react-player';


const ProjectGridView = ({ project }) => {
    const [shareUrl, setShareUrl] = useState(false);
    const [classe, setClasse] = useState(project?.favorite);
    const [sector, setSector] = useState();
    const [finance, setFinance] = useState();
    const [project_status, setProject_status] = useState();
    const [open, setOpen] = useState(false);
    const [titleDialog, setTitleDialog] = useState("Confirm To add to Favorite");
    const [ContentDialog, setContentDialog] = useState("are you sure you want to add this post to favorite?");
    const dispatch = useDispatch();
    let history = useHistory();
    const { t } = useTranslation();
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

        sectors.map((key) =>
        {
            if (key[0] === project?.sector) {
                setSector(t(key[1]))
            }
        });

        etats.map((key) => {
            if (key[0] == project?.project_status) {
                setProject_status(t(key[1]))
            }
        });
    })

    const goToShowproject = (id) => {
        localStorage.setItem('provider', 'project')
        localStorage.setItem('provider_name', project.name)
        localStorage.setItem('owner_of_provider', JSON.stringify(project.owner))
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

    const handleImageError = (event) => {
        event.target.src = '/assets/images/offer-thumbnail.svg';
    };

    function getYouTubeVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    return (

        <div className="offer-box">
            <div className="offer-header" >
                <div className="offer-title">
                    <div className='offer-company-name' onClick={() => goToShowproject(project.id)}>
                            <span  data-toggle="tooltip" data-placement="top" title={project.name}>
                            {project.name?.substring(0, 10)}</span>
                        <span className='offer-sector-name'>{t(sector)} </span>
                    </div>

                    <div className='footer-title'>
                        {/* <div className='footer-item'> */}
                            {/* <span data-toggle="tooltip" data-placement="top" title='Public'> */}
                            {/* </span> */}
                        {/* </div> */}
                        <div className='footer-item footer-item-name'>
                            {project.owner && 
                                <Link  ref={ref} to={`/profile/${project.owner.profile_id}`} data-toggle="tooltip" data-placement="top" title={project.owner.username}>
                                    <span style={{color: '#78909C'}}>{project.owner?.username?.substring(0, 12)} </span>
                                    {(user?.profile_id != project.owner.profile_id) ? (<AvatarTooltip myRef={ref} data={project.owner}  />) : ("")}
                                </Link>
                            }
                        </div>
                        <div className='footer-item  footer-item-flex'>
                            <span>{project.created_at.for_humans}</span>
                            {project.visibility == 'public' ? <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10S4.477 0 10 0Zm0 1.395a8.605 8.605 0 1 0 0 17.21a8.605 8.605 0 0 0 0-17.21Zm2.048 2.093a6.702 6.702 0 0 1 1.802 1.024c.125.096.245.198.363.307c.022.019.041.039.062.06c.328.303.626.644.89 1.01c.037.051.076.098.11.147c.064.094.124.192.184.29a6.024 6.024 0 0 1 .285.51c.053.1.1.209.149.315c.033.073.07.148.1.226c.073.182.138.365.197.552c.019.062.034.128.052.19a6.726 6.726 0 0 1 .215 1.087c.007.066.017.136.022.201c.02.215.033.432.033.65a7.186 7.186 0 0 1-.117 1.27c-.014.073-.026.147-.04.217c-.04.19-.086.376-.14.56c-.509-.233-1.107-.576-1.263-.953c-.284-.68-1.04-1.02-1.348-1.896c-.507-1.45.166-1.412.26-2.312c.044-.422-.26-.51-.661-.338c-.936.393-1.253.242-1.442-.463c-.189-.703 0-.899 0-.899c-.638.07-.662-.707-.331-.903c.23-.132.425-.537.618-.852ZM9.374 7.797c.59-.27 1.135-.367 1.063-.831c-.07-.459-.236-.801-1.158-.801c-.922 0-.52 1.265-1.276.51c-.756-.75.165-.556.543-.727c.379-.172.757-.877.095-.927c-.661-.047-.52.292-1.04.1c-.52-.196-.756.679-1.088.557c-.218-.082-.803-.532-1.191-.975a7 7 0 0 0-1.834 2.51c.113 1.307.804 1.993.804 1.993s.355.851 2.483 1.897c0 0 .4.024-.072-.461c-.472-.487-.993-1.095-.402-1.41c.59-.319.757-.292.899.293c.141.584.615.24.661-.319c.048-.557.922-1.14 1.513-1.41Zm-.45 2.94c1.018 0 .923.317 1.727 1.025c.803.704.378 1.409-.025 1.945c-.401.534-.756 1.14-.945 2.238c-.19 1.094-.686.314-.85.047c-.166-.269-.426-.511-.354-1.63c.07-1.118-.687-.46-.946-1.92c-.26-1.458.378-1.704 1.394-1.704Zm4.977.964c.271-.173.92.278.78.753c-.143.475-.591.207-.816 0c-.225-.206-.237-.583.036-.753Z"/></svg> : ''}

                        </div>
                    </div>
                </div>

                <div className="offer-logo">
                    {(project.logo_link === '/assets/images/porject-logo.png') ? <img src={project.logo_link} title="Nom du projet" alt="" /> :
                        <img src={project.logo_link ? project.logo_link: '/assets/images/porject-logo.png'} title="Nom du projet" alt="" />}
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
                    if(getExtension(link) == 'youtube'){
                        let videoId = getYouTubeVideoId(link);
                        return <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="Thumbnail Video" />
                    }else{
                        if(getExtension(link) == 'vimeo'){
                            let videoId = link.split('/').pop();
                            return <img src={`https://vumbnail.com/${videoId}_large.jpg`} alt="Thumbnail Video" />
                        }else{
                            if(getExtension(link) == 'mp4' || getExtension(link) == ('x-mpeg2') ||
                            getExtension(link) == ('x-msvideo') || getExtension(link) == ('quicktime')){
                                return <ReactPlayer width='350' height='234px' url={link}  controls={true} />
                            } else if (/\.(doc|docx|xls|xlsx|ppt|pptx|csv|pdf)$/i.test(link)) {
                                return <div className="Doc-Wrap">
                                    <a href="#!">
                                        <div className="Doc-Icon" style={{width:'350px', height: '234px'}}><span className="Doc-Type">file</span><i className="uil uil-file-alt"></i></div>
                                    </a>
                                </div>
                            }
                            else{
                                return <img onError={handleImageError} style={{width:'350px', height: '234px'}} src="image.gif" alt="Project"/>
                            }
                        }
                    }
                })()}
            </div>
            <div className="offer-meta">
                <ul className="meta-items">
                    <li className="meta-item meta-col-1">
                        <div className="meta-icon">
                            <img src="/assets/images/icons/marker.svg" alt="" />
                        </div>
                        <div className="meta-details">
                            <span className="meta-title" onClick={() => goToShowproject(project.id)}>{t('targetAreas')}</span>
                            <span className="meta-value">{countryName(project.project_area)}</span>
                        </div>
                    </li>
                    <li className="meta-item meta-col-2">
                        <div className="meta-icon">
                            <img src="/assets/images/icons/cost.svg" alt="" />
                        </div>
                        <div className="meta-details">
                            <span className="meta-title">{t('funding.venture')}</span>
                            <span className="meta-value" title={ project_status }>{ project_status }</span>
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
                        <FacebookShareCount url={shareUrl  || undefined}>
                            {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                        </FacebookShareCount>
                        <span>{project.shared}</span>
                    </li>
                </ul>
                <button className={`${classe ? 'near-deadline' : ''} offer-bookmark`} onClick={HandleClickOpen} type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer">
                    <i className="uil uil-bookmark"></i>
                </button>
            </div>
            <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
        </div>

    )
}

export default ProjectGridView;