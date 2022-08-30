import React, { useEffect, useState, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Text } from "../../containers/Language";
import { Player } from 'video-react';
import VideoPlayer from 'simple-react-video-thumbnail'
import SharePopUp from '../../utils/SharePopUp'
import { countryName } from '../../helpers/Helpres'
import config from '../../Config'
import slugify from 'react-slugify';
import { useHistory } from "react-router-dom";
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';
import { useDispatch, useSelector } from 'react-redux';
import AvatarTooltip from '../../utils/AvatarTooltip';
import DialogWarning from '../../utils/DialogWarning';


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

    let url_to_share = slugify(project.name, { prefix: config.urls.front + '/project/show/' + project.id });

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
                        {project.owner && project.owner.map((value) => {
                            return <Link ref={ref} to={`/profile/${value.profile_id}`} data-toggle="tooltip" data-placement="top" title={value.username}>
                                {value.username.substring(0, 6)}
                                { (user?.profile_id != project.owner[0].profile_id) ? (<AvatarTooltip myRef={ref} data={value} styles={{marginTop:"67px",marginRight:"69px"}} />):("")}
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
                {
                    project.is_video ? (
                        <img src={project.media_link} alt="Project" />
                    ) : project.media_link === "https://dadupadisque.ams3.digitaloceanspaces.com/album/dadupadisque/project.png" ? <img style={{width:"340px",height:"268px"}} src="/assets/images/offer-thumbnail.svg" alt="Project" /> : <img style={{width:"350px",height:"268px"}} src={project.media_link} alt="Project" />
                }
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
                            <span className="meta-value">{project.funding_search}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="offer-reactions">
                <ul className="reactions-box">
                    <li className="reaction likes"><i className="dadupa-icon icon-clap"></i>
                        <span>{project.likeCount}</span></li>
                    <li className="reaction views"><i className="uil uil-eye"></i>
                        <span>1500</span></li>
                    <li className="reaction comments"><i
                        className="uil uil-comment-dots"></i> <span>{project.commentCount}</span>
                    </li>
                    <li className="reaction shares" onClick={() => setShareUrl(true)}>
                        <i className="uil uil-share-alt"></i>
                        <span>380 Shares</span>
                    </li>
                </ul>
            </div>
            <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
        </div>

    )
}

export default ProjectGridView;