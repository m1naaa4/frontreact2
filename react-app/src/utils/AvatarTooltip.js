import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function AvatarTooltip({ myRef, data, styles }) {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

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
            <div className="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active popup_project_details" style={styles}>
                <div className="project-popup-item d-flex">
                    <Link className='project-popup-item-avatar' to={`/profile/${data.profile_id}`}><img src={data.avatar} alt={data.username} /></Link>
                    <div className="project-popup-item-username-inner">
                        <Link to={`/profile/${data.profile_id}`}><h5 className='project-popup-item-username'>{data.username}</h5></Link>
                        <span className='project-popup-item-profile'>{data.type}</span>
                    </div>
                </div>
                <button className="DadupaModal-BTNSubmit tooltip-add-btn"><i className="uil uil-plus"></i>{t('sentInvitations')} </button>
            </div>
        )
    } else {
        return <></>
    }
}