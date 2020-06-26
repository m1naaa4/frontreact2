import React from 'react'
import {Text} from "../../../../containers/Language";
import {NavLink} from "react-router-dom";

import UilGoogle from '@iconscout/react-unicons/icons/uil-google'
import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f'
import UilLinkedin from '@iconscout/react-unicons/icons/uil-linkedin-alt'


const SocialAuth = ({setForm, formData, navigation}) => {

    return (

        <div>
            <div className="social-login">
                <label className="social-login-label">or Sign Up with:</label>
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
            <NavLink className="login-link" to="/login"><span>Already a member ? </span><Text tid="login" /></NavLink>
        </div>

    )

}


export default SocialAuth;