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
    },[user.profile_id, params.id])

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
            
            <div className="Project-Thumb" style={{height:"120px",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px",marginBottom:"0px",backgroundColor:"#0c61cf"}}>
            <Link to={`/project/show/${realization.id}`}> <img style={{height:"200px"}} src={realization.media_link} alt="Project"/> </Link>
            </div>
            <div className="Project-Name"style={{padding:"5px",height:"30px",backgroundColor:"#dfe6e3",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",fontSize:"12px"}}>
            {
              action &&
              <>
                <span style={{fontWeight:"bold",paddingRight:"10px",fontSize:"12px"}}>Project:</span><Link to={`/project/show/${realization.id}`}>{realization.name}</Link>
              </>
            }
                
            </div>
        </>
    )
}