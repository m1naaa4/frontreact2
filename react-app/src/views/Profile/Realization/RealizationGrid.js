import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function RealizationGrid({realization}) {
    const history  = useHistory();
    const goToEditproject = () => {
        history.push('/project/update/'+ realization.id);
    };
    return (
        <>
            <button type="button" onClick={goToEditproject} className="UpdateInfos-BTN CollapseUpdate-BTN" data-toggle="modal" data-target="#ProjectUpdateModal"><i className="uil uil-pen"></i></button>
            <div className="Project-Thumb">
                <img width="100%" height="300" src={realization.media_link} alt="Project"/>
            </div>
            <div className="Project-Name">
                <Link to={`/project/show/${realization.id}`}>{realization.name}</Link>
            </div>
        </>
    )
}