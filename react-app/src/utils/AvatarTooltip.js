import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function AvatarTooltip({ myRef, data }) {
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        const showTooltip = () => {
            setIsVisible(true)
        }
        const hideTooltip = () => {
            setIsVisible(false)
        }


        const element = myRef.current;
        element.addEventListener('mouseenter', showTooltip);
        element.parentNode.parentNode.addEventListener('mouseleave', hideTooltip);

        return () => {
            element.removeEventListener('mouseenter', showTooltip);;
            element.parentNode.parentNode.removeEventListener('mouseleave', hideTooltip);;
        };
    }, []);

    if (isVisible) {
        return (
            <div className="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active popup_project_details">
                <div className="project-popup-item">
                    <Link className='project-popup-item-avatar' to={`/profile/${data.profile_id}`}><img src={data.avatar} alt={data.username} /></Link>
                    <div className="project-popup-item-username">
                        <Link to={`/profile/${data.id}`}><h5>{data.username}</h5></Link>
                        <Link to={`/profile/${data.id}`}><span>{data.type}</span></Link>
                    </div>
                </div>
                <button className="DadupaModal-BTNSubmit tooltip-add-btn"><i className="uil uil-plus"></i> Send Invite</button>
            </div>
        )
    } else {
        return <></>
    }
}