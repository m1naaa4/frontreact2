import React from 'react'
import {NavLink} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LinkedInButton from './Buttons/LinkedInButton';
import FacebookButton from './Buttons/FacebookButton';
import GoogleButton from './Buttons/GoogleButton';


const SocialAuth = ({props}) => {
    const [t] = useTranslation();
    return (

        <div>
            <div className="social-login">
                <label className="social-login-label">{t('or_sign_up_with')}:</label>
                <div className="social-login-options">
                    <div className="social-option gmail">
                        <GoogleButton tooltipe={t('register')} link="signup" />
                    </div>
                    <div className="social-option facebook">
                        <FacebookButton tooltipe={t('register')} link="signup"/>
                    </div>
                    <div className="social-option linkedin">
                        <LinkedInButton props={props} link="signup" tooltipe={t('register')} />
                    </div>
                </div>
            </div>
            {/*<div className="login-link"><span>Already a member ? </span><a href="login.html">Sign In</a></div>*/}
            <NavLink className="login-link" to="/login"><span>{t('already_a_member')} ? </span>{t('login')}</NavLink>
        </div>

    )

}


export default SocialAuth;