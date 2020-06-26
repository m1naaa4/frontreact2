import React from 'react'

import UilGoogle from '@iconscout/react-unicons/icons/uil-google'
import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f'
import UilLinkedin from '@iconscout/react-unicons/icons/uil-linkedin-alt'


const SocialLogin = ({setForm, formData, navigation}) => {

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
        </div>

    )

}


export default SocialLogin;