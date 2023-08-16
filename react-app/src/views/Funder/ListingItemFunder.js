import React, { useEffect, useState} from 'react'
import SharePopUp from '../../utils/SharePopUp'
import { useHistory } from "react-router-dom";
import slugify from 'react-slugify';
import {countryName, financeLabel, sectorName} from '../../helpers/Helpres'
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import $ from 'jquery';
import sectors from '../../data/sectorsCreate';
import countries from '../../data/countries';
import finances from '../../data/financesCreate';
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';
import { useDispatch } from 'react-redux';
import DialogWarning from '../../utils/DialogWarning';


const ListingItemFunder = ({ project }) => {
    const [shareUrl, setShareUrl] = useState(false);
    let history = useHistory();
    const { t } = useTranslation();
    const [sector, setSector] = useState();
    const [country, setCountry] = useState();
    const [finance, setFinance] = useState();
    const [classe, setClasse] = useState(project?.favorite);
    const [titleDialog,setTitleDialog] = useState("Confirm To add to Favorite");
    const [ContentDialog,setContentDialog] = useState("are you sure you want to add this post to favorite?");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    let url_to_share = slugify(project.name, { prefix: `${process.env.REACT_APP_FRONT_URL}`+'/funder/'+project.id });

    const addTofavorite = (id) => {
        setClasse(!classe)
        let data = {
            'url': 'favorite/addToFavorite',
            'provider_id': id,
            'provider': 'funder',
        }
        dispatch(AddFavoriteAction(data));
        setOpen(false);
    }

    const showPage = (id) => {
         history.push('/funder/show/'+ id)
    };

    const getExtension = (file) => {
        if (/^(https?:\/\/)?((www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/.test(file)) {
            return 'youtube';
        } else if (/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/.test(file)) {
            return 'vimeo';
        } else {
            return file.split('.').pop().toLowerCase();
        }
    };

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

        countries.map((key) => {
            if (key.value === project?.zone) {
                setCountry(key.label)
            }
        });

        finances.map((key) => {
            if (key[0] == project?.finance) {
                setFinance(t(key[1]))
            }
        });
    });

    const HandleClose = ()=>{
        setOpen(false);
    }
      
    const HandleClickOpen = () =>{
        setOpen(true);
    }

    return (

             <div className="offer-box">
                    <div className="offer-header">
                        <div className="offer-title" onClick={() => showPage(project.id) } >
                            <h3><span data-toggle="tooltip" data-placement="top" title={project.name}>{project.name?.substring(0, 10)}</span></h3>
                            <span>{t(sectorName(sector))}</span>
                        </div>
                        <div className="offer-logo">
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
                            {project.date_limit ? (<label className="existe-deadline" data-toggle="tooltip" data-placement="bottom" title={`${t('has_deadline') + ' ' + project.date_limit}`}><i className="uil uil-bell"></i></label>) :
                            <label className="no-deadline" data-toggle="tooltip" data-placement="bottom" title={t('no_deadline')}><i className="uil uil-bell"></i></label>}

                            <img src={project.logo} style={{ height: "45" , width: "45"}}  title="Nom du projet" alt=""/>
                        </div>
                    </div>
                    <div className="offer-media">
                        {(function() {
                            let link = $.isArray(project.media) ? project.media[0] : project.media;
                            if(getExtension(link) == 'youtube'){
                                return <ReactPlayer width='340' url={link} controls={true} />
                            }else{
                                if(getExtension(link) == 'vimeo'){
                                    return <ReactPlayer width='340' height='275' url={link} controls={true} />
                                }else{
                                    if(getExtension(link) == 'mp4' || getExtension(link) == ('x-mpeg2') ||
                                        getExtension(link) == ('x-msvideo') || getExtension(link) == ('quicktime')){
                                        return <ReactPlayer width='350' height='234px' url={link} controls={true} />
                                    } else if (/\.(doc|docx|xls|xlsx|ppt|pptx|csv|pdf)$/i.test(link)) {
                                        return <div className="Doc-Wrap">
                                            <a href="#!">
                                                <div className="Doc-Icon" style={{width:'350px', height: '234px'}}><span className="Doc-Type">file</span><i className="uil uil-file-alt"></i></div>
                                            </a>
                                        </div>
                                    }
                                    else{
                                        return <img style={{width:'350px', height: '234px'}} src={link} alt="Project"/>
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
                                    <span className="meta-value">{countryName(country)}</span>
                                </div>
                            </li>
                            <li className="meta-item">
                                <div className="meta-icon">
                                    <img src="/assets/images/icons/value.svg" alt=""/>
                                </div>
                                <div className="meta-details">
                                    <span className="meta-value">{ t(financeLabel(finance)) }</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="offer-reactions">
                        <ul className="reactions-box">
                            <li className="reaction likes"><i className="dadupa-icon icon-clap"></i><span>{project.likeCount}</span></li>
                            <li className="reaction views"><i className="uil uil-eye"></i><span>{project.visit}</span></li>
                            <li className="reaction comments"><i className="uil uil-comment-dots"></i> <span>{project.commentCount}</span></li>
                            <li className="reaction shares" onClick={() => setShareUrl(true)}><i className="uil uil-share-alt"></i><span>{project.shared} {t('share')}</span></li>
                        </ul>
                    </div>
                    <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
                </div>

    )
}

export default ListingItemFunder;