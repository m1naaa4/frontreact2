import React from 'react'
import UilFacebook from "@iconscout/react-unicons/icons/uil-facebook-f";

import { LoginSocialFacebook } from 'reactjs-social-login';
import { useDispatch } from 'react-redux';
import { SocialLoginAction } from '../../../../../store/actions/User/Auth/AuthActions';

export default function FacebookButton({link, tooltipe}) 
{
    const dispatch = useDispatch();
    const callbackFacebook = (provider, data) =>
    {
        var credentials = {
            access_token : data.accessToken,
            provider : provider
        }

        let signUpUrl = "auth/facebook";
        if(link === "signup"){
            signUpUrl = "auth/facebook/signup";
        }

        dispatch(SocialLoginAction(credentials, signUpUrl));
    }

    return (
        <LoginSocialFacebook
            isOnlyGetToken
            appId={process.env.REACT_APP_FB_APP_ID || ''}
            onResolve={({ provider, data }) => {
                callbackFacebook(provider, data)
            }}
        >
            <span
                data-toggle="tooltip"
                data-placement="bottom"
                title={`${tooltipe} with Facebook`}
            >
                <UilFacebook/>
            </span>
        </LoginSocialFacebook>
    )

}
