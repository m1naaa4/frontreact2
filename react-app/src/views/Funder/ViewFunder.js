import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import AddComment from '../Comment/AddComment';
import { Link, useHistory, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { useTranslation } from 'react-i18next';
import sectors from '../../data/sectorsCreate';
import typeusersCreate from '../../data/typeusersCreate';
import countries from '../../data/countries';
import finances from '../../data/financesCreate';
import { AddFavoriteAction } from '../../store/actions/Favorite/FavoritesAction';
import { Modal, Spinner } from 'react-bootstrap';
import Modale from '../Project/Share/Modale';
import { GeneraleAction } from '../../store/actions/Generale/GeneraleAction';
import ReportModal from '../Admin/Report/ReportModal';
import useOutsideClick from '../../helpers/useOutsideClick';
import $ from "jquery";
import slugify from 'react-slugify';
import SharePopUp from '../../utils/SharePopUp'
import ReactPlayer from 'react-player';
import Select from 'react-select';
import DialogWarning from '../../utils/DialogWarning';
import { LikeAction } from '../../store/actions/Like/LikeAction';
import AvatarTooltip from '../../utils/AvatarTooltip';

export default function ViewFunder(props) {
    const [shareUrl, setShareUrl] = useState(false);
    const project = useSelector(state => state.funders.funder);
    const loading = useSelector(state => state.funders.loading);
    const visibility = useSelector(state => state.generale.visibility);
    const user = useSelector(state => state.userProfile.userProfile);

    const ref = useRef();
    const params = useParams();
    const history = useHistory();
    const [initialFavorite, setInitialFavorite] = useState(true);
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [countcomment, setCountcomment] = useState();
    const [classe, setClasse] = useState();
    const [sector, setSector] = useState();
    const [type, setType] = useState();
    const [country, setCountry] = useState();
    const [finance, setFinance] = useState();
    const [showmodal, setShowmodal] = useState(false);
    const [options_List, SetOptions_List] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [optionSelected, setOptionSelected] = useState();
    const [open, setOpen] = useState(false);
    const [titleDialog, setTitleDialog] = useState("Confirm To add to Favorite");
    const [ContentDialog, setContentDialog] = useState("are you sure you want to add this post to favorite?");

    const dispatch = useDispatch();
    const handleShow = () => setShowmodal(true);
    const handleClose = () => setShowmodal(false);

    const handleShowReport = () => setShowReport(true);
    const handleCloseReport = () => setShowReport(false);

    const [t] = useTranslation();
    const [is_loading, setIsLoading] = useState(false);

    const datas = [{ value: 'public', label: 'Public' }, { value: 'shared', label: 'Shared' }, { value: 'team', label: 'Team' }, { value: 'private', label: 'Private' }];

    var url_to_share = false;

    const datatype = {
        'provider_name': localStorage.getItem('provider_name'),
        'provider': 'funder',
        'content_id': params.id,
    }

    useEffect(() => {
        if (visibility === false) {
            setIsLoading(visibility)
        }
    }, [visibility]);

    let alloptions = datas.map((name, index) => (
        { value: name.value, label: name.label }
    ));

    const SelectStyleWithScrollbar = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#e8fbf1" : "white",
            color: "black",
            textAlign: 'center',
            "&:hover": {
                backgroundColor: "#e8fbf1",
            },
            '&:last-child ': {
                borderBottomLeftRadius: '30px',
                borderBottomRightRadius: '20px',
            }
        }),

        menu: (provided) => ({
            ...provided,
            borderRadius: "35px",
            overflow: 'hidden',
            border: '0.5px solid #00b602',
        }),

        menuList: (provided, state) => ({
            ...provided,
            // border: '1px solid green',
            borderRadius: "32px",
            padding: '0',
            "&::-webkit-scrollbar": {
                width: "5px",

            },
            "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                background: "#888",
            },
            "&::-webkit-scrollbar-thumb:hover": {
                background: "#555"
            }
        }),
        control: (base, state) => ({
            ...base,
            boxShadow: state.isFocused ? "0px 1px 15px -3px #00b60 " : "0px 0px 20px 0px #e7e7e7",
            borderRadius: '30px',
            border: '1px solid #e7e7e7',
            height: '30px',
            width: '106px',
            align: ' center',
            "&:hover": {
                boxShadow: "none",
            },
        }),
        indicatorSeparator: (base, state) => ({
            ...base,
            height: '20px',
        }),
        placeholder: (base, state) => ({
            ...base,
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            paddingBottom: '25px',
        }),
        valueContainer: (base, state) => ({
            ...base,
            height: '30px',
            marginBottom: '20px',
        }),
        singleValue: (base, state) => ({
            ...base,
            marginTop: '7px',
        }),
    }
    
    /////////// counters//////////
    useEffect(() => {
        if (project != 'loading' && project) {
            setLikeCount(project.likeCount);
            setLike(project.is_liked);
            setCountcomment(project.commentCount);
        }
    }, [project]);
    
    useEffect(() => {
        $('.reaction-comment').click(function () {
            $(this).toggleClass('comments-clicked');
        });

        $('.reaction-comment').click(function (e) {
            e.preventDefault();
            var target = $($(this).attr('href'));
            if (target.length) {
                var scrollTo = target.offset().top - 80;
                $('body, html').animate({ scrollTop: scrollTo + 'px' }, 800);
            }
        });

        if (initialFavorite) {
            setClasse(project?.favorite)
        }

        sectors.map((key) =>
        {
            if (key[0] === project?.sector) {
                setSector(t(key[1]))
            }
        }
        );

        typeusersCreate.map((key) =>
        {
            if (key[0] === project?.type) {
                setType(t(key[1]))
            }
        }
        );

        countries.map((key) => {
            if (key.value === project?.zone) {
                setCountry(key.label)
            }
        }
        );

        finances.map((key) => {
            if (key[0] == project?.finance) {
                setFinance(t(key[0]))
            }
        }
        );
    })

    const goToSearch = (data) => {
        history.push('/funders/lists');
        let tagss = [];
        dispatch({ type: 'TAG', res: [...tagss, data.innerText] });
    }

    let tags;
    if (project) {
        url_to_share = slugify(project.name, { prefix: `${process.env.REACT_APP_FRONT_URL}` + '/funder/show/' + params.id });

        tags = <ul className="Tags-List">
            {project.tags.map((name, index) => (
                <li className="Tag-Item" key={index}>
                    <span onClick={(e) => goToSearch(e.target)}>{name}</span>
                </li>
            ))}
        </ul>;
    } else {
        tags = [];
    }

    const goToEditproject = () => {
        history.push('/funder/create/' + params.id);
    };

    const goToDocuments = () => {
        history.push('/funder/show/' + params.id + '/docs');
    };

    const likeAction = () => {
        setLike(!like);
        const data = {
            provider_id: params.id,
            provider: 'funder',
            type: like ? 'dislike' : 'like',
        };
        dispatch(LikeAction(data, '/like'));
    }

    useEffect(() => {
        window.pusher.pusher.subscribe(`new-like`).bind('like', function (data) {
            if (params.id == data.provider_id) {
                if (data.value == 1) {
                    setLikeCount((prevCount) => prevCount + 1);
                } else if (data.value == 0) {
                    setLikeCount((prevCount) => prevCount > 0 ? prevCount -1 : 0);
                }
            }
        });
    }, [params.id])

    useEffect(() => {
        window.pusher.pusher.subscribe(`funder-comment`).bind('new-comment', function (data) {
            if (params.id == data.commentable_id) {
                setCountcomment((prevCount) => prevCount + 1);
            }
        });
    }, [params.id]);

    const addTofavorite = (id) => {
        setClasse(!classe)
        setInitialFavorite(false)
        let data = {
            'url': 'favorite/addToFavorite',
            'provider_id': id,
            'provider': 'funder',
        }
        dispatch(AddFavoriteAction(data));
        setOpen(false);
    }

    const handleChange = async (selected) => {
        setOptionSelected(selected);
        setIsLoading(true)
        let data = {
            'url': 'creation/visibility',
            'visibility': selected.value,
            'provider_id': params.id,
            'provider': 'funder',
            'type': {
                'success': 'UPDATE_VISIBILITY_SUCCESS',
                'error': 'UPDATE_VISIBILITY_ERROR',
                'upload': 'LOADING_UPDATE_VISIBILITY',
            },
        }
        dispatch(GeneraleAction(data, props));
    };

    const showOptions = () => {
        SetOptions_List(!options_List)
    }

    useOutsideClick(ref, () => {
        SetOptions_List(false)
    });

    const HandleClose = () => {
        setOpen(false);
    }

    const HandleClickOpen = () => {
        setOpen(true);
    }

    useEffect(() => {
        if (classe) {
            setTitleDialog("Confirm To Remove From Favorite");
            setContentDialog("are you sure you want to remove this post from favorite?");
        } else {
            setTitleDialog("Confirm To add to Favorite");
            setContentDialog("are you sure you want to add this post to favorite?");
        }
    })

    const getExtension = (file) => {
        if (/^(https?:\/\/)?((www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/.test(file)){ 
            return 'youtube';
        }
        else if (/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/.test(file)){
            return 'vimeo';
        }
        else{
            return file.split('.').pop().toLowerCase();
        }
    };

    return (
        <>
            {/* <!-- SINGLE -->*/}
            {
                loading  ? (
                    <div></div>
                    // <ProjectSkeletonGrid/>
                ): !loading && project != '' ? (
                    <div className="row">
                        <div className="col-md-8">
                            {/*!--PAGE HEADER --*/}
                            <div className="Company-Infos">
                                <div className="Company-Left">
                                    <div className="single-offer-logo">
                                        <img src={project.logo ? project.logo: '/assets/images/porject-logo.png'} title="Nom du projet" alt="" />
                                        <button className="offer-bookmark" type="button" name="button"><i className="uil uil-bookmark"></i>
                                            <DialogWarning
                                                    title={titleDialog}
                                                    ContentText={ContentDialog}
                                                    open={open}
                                                    HandleConfirmation={e => addTofavorite(project.id)}
                                                    HandleClose={HandleClose}
                                                />
                                        </button>
                                        <label className="near-deadline" data-toggle="tooltip" data-placement="bottom" title="Deadline est proche"><i className="uil uil-bell"></i></label>
                                    </div>
                                    <div className="Company-Name">{project.name}</div>
                                    <div className="Company-Email">{project.email}</div>
                                    <div className="Company-Addresse">{project.address}</div>
                                </div>
                                {user.id !== project.user_id && (<div className="Company-Right">
                                        <div className="Company-Phone">
                                            <a href={`tel:`+project.phone}>
                                            <i className="uil uil-phone-alt"></i> {project.phone}
                                        </a>
                                            <button type="button" className="PostOptions-BTN" onClick={showOptions}><i className="uil uil-ellipsis-h"></i></button>
                                            {
                                                options_List && (
                                                    <ul className="PostOptions-List PostOptions-ListShow" ref={ref} >
                                                        <li className="PostDelete">
                                                            <button onClick={handleShowReport}><i className="uil uil-ban"></i>{t(`report`)}</button>
                                                        </li>
                                                    </ul>
                                                )
                                            }
                                            <Modal show={showReport} onHide={handleCloseReport} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <ReportModal providerObject={project} provider='funder' showReport={showReport} handleCloseReport={handleCloseReport} />
                                            </Modal>
                                        </div>
                                        <br />
                                    </div>
                                )}
                            </div>

                            <div className="Content-Wrap">
                                <div className="Signle-Offer-Media">
                                {(Array.isArray(project.media)? project.media : [project?.media]).map(item => (
                                                <div key={item} style={{ flex: `1 0 ${100/project.media.length}%` }}>
                                                    <div className="col-md-12 input-row">
                                                    {(function() {
                                                        if(getExtension(item) == 'youtube'){
                                                            return <ReactPlayer url={item} controls={true} />
                                                        }else{
                                                            if(getExtension(item) == 'vimeo'){
                                                                return <ReactPlayer url={item} controls={true} />
                                                            }else if (/\.(doc|docx|xls|xlsx|ppt|pptx|csv|pdf)$/i.test(item)){
                                                                return <div className="Doc-Wrap">
                                                                    <a href="#!">
                                                                        <div className="Doc-Name" onClick={goToDocuments}><i className="uil uil-paperclip"></i> Document</div>
                                                                    </a>
                                                                </div>
                                                            }
                                                            else{
                                                                if(getExtension(item) == 'mp4' || getExtension(item) == ('x-mpeg2') ||
                                                                getExtension(item) == ('x-msvideo') || getExtension(item) == ('quicktime')){
                                                                   return <ReactPlayer width='100%' height='300' controls={true}  url={item}/>
                                                                }else{
                                                                   return <img width="100%" height="300" src={item} alt="Project"/>
                                                                }
                                                            }
                                                        }
                                                    })()}
                                                    </div>
                                                </div>
                                                ))}
                                </div>

                                <div className="Signle-Offer-Content">
                                    <div className="reactions-wrap">
                                        <div className="reactions-box">
                                            <div className="row">
                                                <div className="col-6 col-md-4 col-lg-6">
                                                    <div className="reaction likes"><i className="dadupa-icon icon-clap"></i><span>{likeCount}</span></div>
                                                    <div className="reaction views"><i className="uil uil-eye"></i>
                                                        <span>{project.visit}</span></div>
                                                </div>
                                                <div className="col-6 col-md-8 col-lg-6 text-right">
                                                    <div className="reaction comments"><span>{countcomment} {t(`comments`)}</span></div>
                                                    <div className="reaction shares"><span>{t(`shares`)}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reactions-buttons">
                                        <button className={like ? 'reaction-button reaction-like post-liked' : 'reaction-button reaction-like'}
                                            onClick={likeAction} toggle="#password-field" type="button" name="button">
                                            <img src={like ? "/assets/images/icons/dadupa-clap-green.svg" : "/assets/images/icons/dadupa-clap.svg"} alt="" />
                                            {like ? "Dislike" : "Like"}
                                        </button>

                                        <a className="reaction-button reaction-comment" href="#Comments-Wrap">
                                            <img src="/assets/images/icons/dadupa-comment.svg" alt="" />
                                            {t(`commenter`)}
                                        </a>
                                        <button className="reaction-button" type="button" name="button" onClick={() => setShareUrl(true)}>
                                            <img src="/assets/images/icons/dadupa-share.svg" alt="" />
                                            {t(`partager`)}
                                        </button>
                                        <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
                                    </div>
                                    <div className="Signle-Offer-Text">
                                        {project.content ? parse(project.content) : project.content}
                                    </div>

                                </div>
                            </div>

                            <AddComment providerObject={project.id} providerType='funder' />
                        </div>
                        <div className="col-md-4">
                            <div className="Post-Actions">
                                {user.id == project.user_id && <div className="Update-Post">
                                    <button type="button" name="button" onClick={goToEditproject} data-toggle="tooltip" data-placement="bottom"
                                        title="Edit Post" className="edit-button"><i className="uil uil-pen"></i>
                                    </button>
                                </div>}
                                {user.id == project.user_id && <div className="Send-Message input-row input-select">
                                    <Select
                                        options={alloptions}
                                        value={optionSelected}
                                        placeholder={project.visibility}
                                        onChange={handleChange}
                                        styles={SelectStyleWithScrollbar}
                                        className="Select"
                                    />
                                </div>}
                                {is_loading === true && <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />}

                            </div>
                            <div className="Single-Offer-Details">
                                <ul className="Offer-Details-List">
                                    <li className="Offer-Item">
                                        <label className='mb-3'>{t(`owners`)}</label>
                                        <div className="d-flex align-items-start">
                                            <span>
                                                {project.owner && project.owner.map((value, index) => {
                                                    return <div key={index+1} className="Contact">
                                                        <Link to={`/profile/${value.profile_id}`} ref={ref} data-toggle="tooltip" data-placement="top">
                                                        <div className="d-flex align-items-start">
                                                            <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                                                            <div className="Contact-Thumb"> <img src={value.avatar} alt={value.username} /></div>
                                                            <div className="Contact-Infos">
                                                                <h4>{value.username}</h4>
                                                            </div>
                                                            {(user?.profile_id != value.profile_id) ? (<AvatarTooltip myRef={ref} data={value} styles={{ marginTop: "67px", marginRight: "69px" }} />) : ("")}
                                                        </div>
                                                        </Link>
                                                    </div>
                                                }
                                                )}
                                            </span>


                                            {project.visibility !== 'public' && user.id == project.user_id &&
                                                <>
                                                    <button className="reaction-button" id="shareButton" type="button" onClick={handleShow}>
                                                        <img src="/assets/images/icons/dadupa-sharewhite.svg" style={{ width: "13px", height: "13px" }} alt="" id="image_share" />
                                                    </button>

                                                    <Modal show={showmodal} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                        <Modale showmodal={showmodal} datatype={datatype} handleClose={handleClose} />
                                                    </Modal>
                                                </>
                                            }
                                        </div>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>{t(`publie-le`)}</label>
                                        <span>{project.created_at.date}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>{t(`you-are`)}</label>
                                        <span>{t(`${type}`)}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>{t(`Secteurs-activite`)}</label>
                                        <span>{t(`${sector}`)}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>{t(`Zones-ciblees`)}</label>
                                        <span>{country}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>{t(`budge`)}</label>
                                        <span>{t(`${finance}`)}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="Single-Offer-Tags">
                                <h3>{t(`tags`)}</h3>
                                {tags}
                            </div>
                            <div className="Co-Porteurs">
                                <h3>{t(`co-financeurs`)}</h3>
                                <ul className="Co-Porteurs-List">
                                    <li className="Co-Porteur">
                                    <a href="#">
                                        <div className="Co-Porteur-Profile">
                                        <img src="/assets/images/abbass-iya.jpg" />
                                        </div>
                                        <div className="Co-Porteur-Name">Abbass IYA</div>
                                    </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                ) : (
                    <div data-testid="error-message">{t(`loading`)} ...</div>
                )
            }
        </>
    )
}