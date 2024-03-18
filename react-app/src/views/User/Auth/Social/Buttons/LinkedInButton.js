import React from 'react';
import { LoginSocialLinkedin } from 'reactjs-social-login';
import UilLinkedinAlt from '@iconscout/react-unicons/icons/uil-linkedin-alt';
import { useDispatch } from 'react-redux';
import { SocialLoginAction } from '../../../../../store/actions/User/Auth/AuthActions';

export default function LinkedInButton({link, tooltipe}) 
{
    const dispatch = useDispatch();
    const REDIRECT_URI = window.location.href;
    const callbackLinkedIn = (provider, data) => {
        var credentials = {
            access_token : data.access_token,
            provider : provider
        }
        let signUpUrl = "auth/linkedin-openid";
        if(link === "signup"){
            signUpUrl = "auth/linkedin-openid/signup";
        }

        dispatch(SocialLoginAction(credentials, signUpUrl));
    };
    return (
        <div>
            <LoginSocialLinkedin
                isOnlyGetToken
                client_id={process.env.REACT_APP_LKEDIN_CLIENT_ID || ''}
                client_secret={process.env.REACT_APP_LKEDIN_CLIENT_SECRET || ''}
                scope= {["openid","profile", "email"]}
                redirect_uri={REDIRECT_URI}
                onResolve={({ provider, data }) => {
                    callbackLinkedIn(provider, data)
                }}
            >
                <span 
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={`${tooltipe} with Linkedin`}
                >
                    <UilLinkedinAlt/>
                </span>
            </LoginSocialLinkedin>
        </div>

)

}
