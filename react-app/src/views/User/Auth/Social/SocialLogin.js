import React from 'react'

import FacebookButton from "./Buttons/FacebookButton";
import LinkedInButton from "./Buttons/LinkedInButton";
import { useTranslation } from 'react-i18next';
import GoogleButton from './Buttons/GoogleButton';


const SocialLogin = () => {
    const [t] = useTranslation();
    return (

        <div>
            <div className="social-login ">
                <label className="social-login-label">{t('signUpWith')}</label>
                <div className="social-login-options">
                    <div className="social-option gmail">
                        <GoogleButton tooltipe={t('register')}/>
                    </div>
                    <div className="social-option facebook">
                        <FacebookButton tooltipe={t('login')}/>
                    </div>
                    <div className="social-option linkedin">
                        <LinkedInButton link="" tooltipe={t('login')}/>
                    </div>
                </div>
            </div>
        </div>

    )

}


export default SocialLogin;