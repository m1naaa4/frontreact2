import React, { useEffect, useState} from 'react'
import SharePopUp from '../../utils/SharePopUp'
import { useHistory } from "react-router-dom";
import slugify from 'react-slugify';
import {countryName, sectorName} from '../../helpers/Helpres'
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import DialogWarning from '../../utils/DialogWarning';
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';
import sectors from '../../data/sectorsCreate';


const ListingItemMentor = ({ project }) => {
    const [shareUrl, setShareUrl] = useState(false);
    let history = useHistory();
    const { t } = useTranslation();
    const [sector, setSector] = useState();
    const [classe, setClasse] = useState(project?.favorite);
    const [titleDialog,setTitleDialog] = useState("Confirm To add to Favorite");
    const [ContentDialog,setContentDialog] = useState("are you sure you want to add this post to favorite?");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    let url_to_share = slugify(project.name, { prefix: `${process.env.REACT_APP_FRONT_URL}` + '/mentor/' + project.id });

    const showPage = (id) => {
         history.push('/mentor/show/'+ id)
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

    const addTofavorite = (id) => {
        setClasse(!classe)
        let data = {
            'url': 'favorite/addToFavorite',
            'provider_id': id,
            'provider': 'mentor',
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
    });

    const HandleClose = ()=>{
        setOpen(false);
    }
      
    const HandleClickOpen = () =>{
        setOpen(true);
    }

    const goToSearch = (data) => {
        history.push('/mentor/lists');
        let tagss = [];
        dispatch({ type: 'TAG', res: [...tagss, data.innerText] });
    }

    let tags;
    if (project) {
        tags = <ul className="Tags-List">
        {project.tags.map((name, index) => (
            <li className="Tag-Item" key={index}>
                <span onClick={(e) => goToSearch(e.target)}># {name}</span>
            </li>
        ))}
    </ul>;
    } else {
        tags = <ul className="Tags-List">
                    <li className="Tag-Item">
                    </li>
                </ul>;
    }

    const handleImageError = (event) => {
        event.target.src = '/assets/images/offer-thumbnail.svg';
    };

    return (

             <div className="offer-box bailleur">
                    <div className="offer-header">
                        <div className="offer-title" onClick={() => showPage(project.id) } >
                            <div className='offer-company-name'>
                                <span>{project.name}</span>
                            </div>
                            <div className='footer-title'>
                                <div className='footer-item footer-item-name'><span>{t(sectorName(sector))}</span></div>
                                {!project.date_limit && <div className='footer-item footer-item-name'><label className="no-deadline" data-toggle="tooltip" data-placement="bottom" title={t('has_deadline')}><i className="uil uil-bell"></i></label></div>}
                            </div>
                            
                        </div>
                        <div className="offer-logo">
                            {project.owner ? (<a href={`/profile/${project.owner[0].profile_id}`}>
                                <img src={project.logo ? project.logo: '/assets/images/porject-logo.png'} style={{ height: "45" , width: "45"}}  title="Nom du projet" alt=""/>
                            </a>) : <a href={`/profile/${project.profile_id}`}>
                                <img src={project.logo ? project.logo: '/assets/images/porject-logo.png'} style={{ height: "45" , width: "45"}}  title="Nom du projet" alt=""/>
                            </a>}
                        </div>
                    </div>
                    <div className="offer-media">
                        {(function() {
                            let link = $.isArray(project.media) ? project.media[0] : project.media;
                            if(getExtension(link) == 'youtube'){
                                return <ReactPlayer width='340' height='234px' url={link} controls={true} />
                            }else{
                                if(getExtension(link) == 'vimeo'){
                                    return <ReactPlayer width='340' height='234px' url={link} controls={true} />
                                }else{
                                    if(getExtension(link) == 'mp4' || getExtension(link) == ('x-mpeg2') ||
                                        getExtension(link) == ('x-msvideo') || getExtension(link) == ('quicktime')){
                                        return <ReactPlayer width='350' height='234px' url={link} controls={true} />
                                    } else if (/\.(doc|docx|xls|xlsx|ppt|pptx|csv|pdf)$/i.test(link)) {
                                        return <div className="Doc-Wrap">
                                            <a href="#!">
                                                <div className="Doc-Icon" style={{width:'350px', height: '234px'}}><span className="Doc-Type">{t('file')}</span><i className="uil uil-file-alt"></i></div>
                                            </a>
                                        </div>
                                    }
                                    else{
                                        return <img onError={handleImageError}   width='350' style={{width:'350px', height: '234px'}} src={link} alt="Project"/>
                                    }
                                }
                            }
                        })()}
                    </div>
                    <div className="offer-meta">
                        <ul className="meta-items">
                            <li className="meta-item">
                                <div className="meta-icon">
                                    <img src="/assets/images/icons/marker.svg" alt=""/>
                                </div>
                                <div className="meta-details">
                                    <span className="meta-title">{t('targetAreas')}</span>
                                    <span className="meta-value">{countryName(project.zone)}</span>
                                </div>
                            </li>
                        </ul>
                        {tags}
                        
                    </div>
                    <div className="offer-reactions">
                        <ul className="reactions-box">
                            <li className="reaction likes"><i className="dadupa-icon icon-clap"></i><span>{project.likeCount}</span></li>
                            <li className="reaction views"><i className="uil uil-eye"></i><span>{project.visit}</span></li>
                            <li className="reaction comments"><i className="uil uil-comment-dots"></i> <span>{project.commentCount}</span></li>
                            <li className="reaction shares" onClick={() => setShareUrl(true)}><i className="uil uil-share-alt"></i><span>{project.shared} {t('share')}</span></li>
                        </ul>
                        <button className={`${classe ? 'near-deadline' : ''} offer-bookmark`} onClick={HandleClickOpen} type="button" name="button" data-toggle="tooltip" data-placement="bottom" title="Enregistrer">
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
                    <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
                </div>

    )
}

export default ListingItemMentor;