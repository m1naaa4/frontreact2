import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetInvitationsAction } from '../../../store/actions/Friend/InvitationsAction';




const  Invitations = () => {
    const infoprofile = useSelector(state => state.infoProfile);
    const user = useSelector(state => state.userProfile.userProfile);

    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(GetInvitationsAction()); 
    // },[])

    return (
        <div className="Suggestion-List">
            <div className="Contact">
                <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                <div className="Contact-Thumb"><img src="/assets/images/profiles/profile-1.jpg" alt="" /></div>
                <div className="Contact-Infos">
                    <h4>Nom complet</h4>
                </div>
                <div className="Add-Contact Invitation-Options">
                    <button type="button" name="button" className="Invitation-Option_Confirm"><i className="uil uil-check"></i></button>
                    <button type="button" name="button" className="Invitation-Option_Delete"><i className="uil uil-times"></i></button>
                </div>
            </div>
        </div>
    )

}
export default Invitations;