import React from 'react'
import {NavLink} from "react-router-dom";
import UilGoogle from '@iconscout/react-unicons/icons/uil-google'
import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f'
import UilLinkedin from '@iconscout/react-unicons/icons/uil-linkedin-alt'
import { useTranslation } from 'react-i18next';


const SocialAuth = () => {
    const [t] = useTranslation();
    return (

        <div>
            <div className="social-login">
                <label className="social-login-label">{t('or_sign_up_with')}:</label>
                <div className="social-login-options">
                    <div className="social-option gmail">
                        <a href="#!" data-toggle="tooltip" data-placement="bottom" title="Sign up with Gmail"><UilGoogle/>
                            </a>
                    </div>
                    <div className="social-option facebook">
                        <a href="#!" data-toggle="tooltip" data-placement="bottom" title="Sign up with Facebook"><UilFacebook/>
                            </a>
                    </div>
                    <div className="social-option linkedin">
                        <a href="#!" data-toggle="tooltip" data-placement="bottom" title="Sign up with Linkedin"><UilLinkedin/>
                        </a>
                    </div>
                </div>
            </div>
            {/*<div className="login-link"><span>Already a member ? </span><a href="login.html">Sign In</a></div>*/}
            <NavLink className="login-link" to="/login"><span>{t('already_a_member')} ? </span>{t('login')}</NavLink>
        </div>

    )

}


export default SocialAuth;