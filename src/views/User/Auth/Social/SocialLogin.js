import React from 'react'

import UilGoogle from '@iconscout/react-unicons/icons/uil-google'
import UilLinkedin from '@iconscout/react-unicons/icons/uil-linkedin-alt'
import FacebookButton from "./Buttons/FacebookButton";

const SocialLogin = ({props}) => {
    return (

        <div>
            <div className="social-login ">
                <label className="social-login-label">or Sign Up with:</label>
                <div className="social-login-options">
                    <div className="social-option gmail">
                       {/* <div className="social-option gmail">
                            <a href="#!" data-toggle="tooltip" data-placement="bottom" title="Sign up with Gmail"><UilGoogle/>
                            </a>
                        </div>*/}
                    </div>
                    <div className="social-option facebook">
                        <FacebookButton props={props} />
                    </div>
                    <div className="social-option linkedin">
                        {/*<div className="social-option linkedin">
                            <a href="#!" data-toggle="tooltip" data-placement="bottom" title="Sign up with Linkedin"><UilLinkedin/>
                            </a>
                        </div>*/}
                    </div>
                </div>
            </div>
        </div>

    )

}


export default SocialLogin;