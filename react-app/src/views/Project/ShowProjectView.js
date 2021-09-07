import React, {useEffect, useState} from 'react'
import {GetProjectAction} from "../../store/actions/User/Project/ProjectAction";
import {useDispatch, useSelector} from "react-redux";
import {Player} from 'video-react';
import AddComment from '../Comment/AddComment';
import { useHistory, useParams } from 'react-router-dom';
import { LikeAction } from '../../store/actions/Like/LikeAction';
import parse from 'html-react-parser';

import { useTranslation } from 'react-i18next';
import ProjectSkeletonGrid from '../../skeleton/ProjectSkeletonGrid';
import sectors from '../../data/sectors';
import etats from '../../data/Etats';
import countries from '../../data/countries';
import finances from '../../data/finances';

export default function ShowProjectView(props) {

    const params = useParams();
    const history  = useHistory();
    const [initial, setInitial] = useState(true);
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [countcomment, setCountcomment] = useState();
    const [ setClasse] = useState();
    const [sector, setSector] = useState();
    const [status, setStatus] = useState();
    const [country, setCountry] = useState();
    const [finance, setFinance] = useState();
    const [t] = useTranslation();

    const data = {
        project_id : params.id,
        action     : "getProject",
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetProjectAction(data, props));
    }, [dispatch])

    useEffect(() => {
        like ? setClasse('Dislike') : setClasse('Like');
        if (initial) {
            setLike(project?.project?.is_liked);
            setLikeCount(fullproject?.countlike)
            setCountcomment(fullproject?.countcomment)
        }
        
        if(counter?.countercomment){
            console.log(counter?.notification)
            setCountcomment(counter?.countercomment)
        }

        sectors.map((key) => 
        // console.log(key[0], project?.project?.sector)
          {if (key[0] === project?.project?.sector) {
            setSector(key[1])
          }}
        );

        
        etats.map((key) => 
        // console.log(key[0], sector_id)
          {if (key[0] === project?.project?.project_status) {
            setStatus(key[1])
          }}
        );

        countries.map((key) => 
        {if (key.value === project?.project?.project_area) {
          console.log(key.label)
          setCountry(key.label)
        }}
      );
      
      finances.map((key) => 
        {if (key[0] === project?.project?.funding_search) {
          setFinance(key[1])
        }}
      );


    })
    const counter = useSelector(state => state.addednotification);
    useEffect(() => {
        setLikeCount(counter.counterlike)
    },[counter?.counterlike])
    
    const fullproject = useSelector(state => state.getproject);
    const project = fullproject?.getproject;

    let tags;
    if (project.project) {
         tags = <ul className="Tags-List">
            {project.project.tags.map((name, index) => (
                <li className="Tag-Item" key={index}>
                    {name}
                </li>
            ))}
        </ul>;
    }else{
         tags = [];
    }
    const goToEditproject = () => {
        history.push('/project/update/'+ params.id);
    };

    const likeAAction = () => {
        setLike(!like);
        setInitial(false)
        const dataa = {
            action: "like",
            provider_id: params.id,
            provider: "project",
            type    : like?'dislike':'like',
        }
        // like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
        setClasse('Dislike');
        
        console.log(like)
        dispatch(LikeAction(dataa, 'like/like', props));        
    }

    const dislikeAction = () => {
        const dataa = {
            action: "like",
            provider_id: params.id,
            provider: "project",
            type    : 'dislike',
        }
        setLike(false);
        setClasse('Like');
        setLike(like ? false : true);
        console.log(like)
        // dispatch(LikeAction(dataa, 'like/like', props));
    }

    
    return (
        <div className="Single-Wrapper">
            <div className="container">

                {/* <!-- SINGLE -->*/}
                    {
                            project.success === 'loading' || project === 'loading' ? (
                                <ProjectSkeletonGrid/>
                            ) : project.success === true ? (


                                <div className="Single-Content">
                            <div className="row">
                        <div className="col-md-8">

                            {/*!--PAGE HEADER --*/}
                            <div className="single-header">
                                <div className="signle-offer-type">Project Business</div>
                                <div className="single-offer-header">
                                    <div className="single-offer-logo">
                                        <img src={project.project.logo_link} title="Nom du projet" alt=""/>
                                    </div>
                                    <h3 className="single-offer-name">{project.project.name}</h3>
                                </div>
                            </div>

                            <div className="Content-Wrap">
                                <div className="Signle-Offer-Media">

                                    {
                                        project.project.is_video ? (
                                        <Player width="100%" height="100%"
                                            playsInline
                                            poster="/assets/poster.png"
                                            src={project.project.media_link}
                                        />) : (<img width="100%" height="300" src={project.project.media_link} alt="Project"/>)
                                    }                             
                                </div>

                                <div className="Signle-Offer-Content">
                                    <div className="reactions-wrap">
                                        <div className="reactions-box">
                                            <div className="row">
                                                <div className="col-6 col-md-4 col-lg-6">
                                                    <div className="reaction likes"><i className="dadupa-icon icon-clap"></i><span>{likeCount}</span></div>
                                                    <div className="reaction views"><i className="uil uil-eye"></i>
                                                        <span>{project.project.visit}</span></div>
                                                </div>
                                                <div className="col-6 col-md-8 col-lg-6 text-right">
                                                    <div className="reaction comments"><span>{countcomment} Comments</span></div>
                                                    <div className="reaction shares"><span>Shares</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reactions-buttons">
                                        <button className={like ? 'reaction-button reaction-like post-liked' : 'reaction-button reaction-like'} 
                                            onClick={likeAAction} toggle="#password-field" type="button" name="button">
                                                <img src={like?"/assets/images/icons/dadupa-clap-green.svg":"/assets/images/icons/dadupa-clap.svg"} alt=""/>
                                                {like?"Dislike":"Like"}
                                            </button>
                                        
                                        <a className="reaction-button reaction-comment" href="">
                                            <img src="/assets/images/icons/dadupa-comment.svg" alt=""/>
                                                Commenter
                                        </a>
                                        <button className="reaction-button" type="button" name="button">
                                            <img src="/assets/images/icons/dadupa-share.svg" alt=""/>
                                                Partager
                                        </button>
                                    </div>
                                    <div className="Signle-Offer-Text">
                                        {project.project.description ? parse(project.project.description) : project.project.description}
                                    </div>

                                </div>
                            </div>

                            <AddComment  project={project}/>
                        </div>
                        <div className="col-md-4">
                            <div className="Post-Actions">
                                <div className="Update-Post">
                                    <button type="button" name="button" onClick={goToEditproject} data-toggle="tooltip" data-placement="bottom"
                                            title="Edit Post"  className="edit-button"><i className="uil uil-pen"></i>
                                    </button>
                                    {/* <NavLink 
                                        title="Edit Post"  className="edit-button" to={`update/${data.project_id}`}><i className="uil uil-pen"></i></NavLink> */}
                                </div>
                                {/* <div className="Send-Message">
                                    <button className="Button-Send" type="button" name="button" data-toggle="tooltip"
                                            data-placement="bottom" title="Send a message">
                                        <span>Envoyer un message</span> <i className="uil uil-message"></i></button>
                                </div> */}
                            </div>
                            <div className="Single-Offer-Details">
                                <ul className="Offer-Details-List">
                                    <li className="Offer-Item">
                                        <label>Publié le</label>
                                        <span>{project.project.date}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Etat du projet</label>
                                        <span>{t(`${status}`)}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Secteurs d’activité</label>
                                        <span>{t(`${sector}`)}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Zones ciblées</label>
                                        <span>{country}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Financement recherché</label>
                                        <span>{t(`${finance}`)}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="Single-Offer-Tags">
                                <h3>Tags</h3>
                                    {tags}
                            </div>
                        </div>
                    </div>
                        </div>

                                
                            ) : (
                                // console.log("dfsfdsffsdfdsfdsfdsffsdfds", project)
                                <div data-testid="error-message">ERROR</div>
                                     )
                                }


                

            </div>
        </div>
    )
}