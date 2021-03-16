import React, {useEffect} from 'react'
import {getProjectAction} from "../../../store/actions/User/Project/GetProjectActions";
import {useDispatch, useSelector} from "react-redux";
import {Player} from "video-react";
import AddComment from "../Comment/AddComment";
import ProjectSkeleton from '../../../skeleton/ProjectSkeleton';

export default function ViewProject(props) {

    let id = 0;
    if (props.location.state){
        id = props.location.state.id
    }
    const data = {
        project_id : id,
        action      : "getProject",
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProjectAction(data,props));
    }, [dispatch])

    const project = useSelector(state => state.getproject.getproject);
    console.log("salammmmmmmmmmmmmmmmmmmmmmm", project)
    const projectadd = useSelector(state => state.addproject);
    console.log("hhhhhhhhhhhhhhhhhhhhamdo li ALLAH", projectadd)

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
        props.history.push('/project/update', { id: project.project.id });
    };
    return (
        <div className="Single-Wrapper">
            <div className="container">

                {/* <!-- SINGLE -->*/}
                    {
                            project.success === 'loading' ? (
                                <ProjectSkeleton/>
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
                                                    <div className="reaction likes"><img src=""/><span>145</span></div>
                                                    <div className="reaction views"><i className="uil uil-eye"></i>
                                                        <span>1500</span></div>
                                                </div>
                                                <div className="col-6 col-md-8 col-lg-6 text-right">
                                                    <div className="reaction comments"><span>1.9K Comments</span></div>
                                                    <div className="reaction shares"><span>380 Shares</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reactions-buttons">
                                        <button className="reaction-button reaction-like" type="button" name="button">
                                            <img src="assets/images/icons/dadupa-like.svg" alt=""/>
                                                Aimer
                                        </button>
                                        <a className="reaction-button reaction-comment" href="#Comments-Wrap">
                                            <img src="assets/images/icons/dadupa-comment.svg" alt=""/>
                                                Commenter
                                        </a>
                                        <button className="reaction-button" type="button" name="button">
                                            <img src="assets/images/icons/dadupa-share.svg" alt=""/>
                                                Partager
                                        </button>
                                    </div>
                                    <div className="Signle-Offer-Text">
                                        <p>
                                            {project.project.description}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* <AddComment  project={project}/> */}
                        </div>
                        <div className="col-md-4">
                            <div className="Post-Actions">
                                <div className="Update-Post">
                                    <button type="button" name="button" onClick={goToEditproject} data-toggle="tooltip" data-placement="bottom"
                                            title="Edit Post"  className="edit-button"><i className="uil uil-pen"></i>
                                    </button>
                                </div>
                                <div className="Send-Message">
                                    <button className="Button-Send" type="button" name="button" data-toggle="tooltip"
                                            data-placement="bottom" title="Send a message">
                                        <span>Envoyer un message</span> <i className="uil uil-message"></i></button>
                                </div>
                            </div>
                            <div className="Single-Offer-Details">
                                <ul className="Offer-Details-List">
                                    <li className="Offer-Item">
                                        <label>Publié le</label>
                                        <span>{project.project.date}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Etat du projet</label>
                                        <span>{project.project.project_status}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Secteurs d’activité</label>
                                        <span>{project.project.sector_id}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Zones ciblées</label>
                                        <span>{project.project.project_area}</span>
                                    </li>
                                    <li className="Offer-Item">
                                        <label>Financement recherché</label>
                                        <span>{project.project.funding_search}</span>
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
                                <div data-testid="error-message">ERROR</div>
                                     )
                                }


                

            </div>
        </div>
    )
}