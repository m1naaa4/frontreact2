import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom';

export default function RealizationGrid({realization}) {
    const params = useParams();
    const user = useSelector(state => state.userProfile.userProfile);
    const [action, setAction] = useState(false);

    useEffect(() => {
        if (user?.profile_id) {
        user?.profile_id === params.id ? setAction(true) : setAction(false);
        }
    })

    const history  = useHistory();
    const goToEditproject = () => {
        history.push('/project/update/'+ realization.id);
    };
    return (
        <>
            {
              action &&
              <>
                <button type="button" onClick={goToEditproject} className="UpdateInfos-BTN CollapseUpdate-BTN" data-toggle="modal" data-target="#ProjectUpdateModal"><i className="uil uil-pen"></i></button>
              </>
            }
            
            <div className="Project-Thumb">
                <img width="100%" height="300" src={realization.media_link} alt="Project"/>
            </div>
            <div className="Project-Name">
            {
              action &&
              <>
                <Link to={`/project/show/${realization.id}`}>{realization.name}</Link>
              </>
            }
                
            </div>
        </>
    )
}