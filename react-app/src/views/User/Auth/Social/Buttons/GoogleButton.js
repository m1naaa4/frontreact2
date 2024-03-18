import React from 'react';
import { useDispatch } from 'react-redux';
import { SocialLoginAction } from '../../../../../store/actions/User/Auth/AuthActions';
import UilGoogle from '@iconscout/react-unicons/icons/uil-google';
import { LoginSocialGoogle } from 'reactjs-social-login';

export default function GoogleButton({link, tooltipe}) 
{
    const dispatch = useDispatch();
    const callback = (provider, data) =>
    {
        var credentials = {
            access_token : data.access_token,
            provider : provider
        }

        let signUpUrl = "auth/google";
        if(link === "signup"){
            signUpUrl = "auth/google/signup";
        }

        dispatch(SocialLoginAction(credentials, signUpUrl));
    }

    return (
        <LoginSocialGoogle
            isOnlyGetToken
            client_id={process.env.REACT_APP_GG_APP_ID || ''}
            scope='profile email openid'
            onResolve={({ provider, data }) => {
                callback(provider, data)
            }}
        >
             <span
                data-toggle="tooltip"
                data-placement="bottom"
                title={`${tooltipe} with google`}
            >
                <UilGoogle/>
            </span>
        </LoginSocialGoogle>
    )

}
