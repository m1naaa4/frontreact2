import React,{ useEffect } from 'react'
import UilFacebook from "@iconscout/react-unicons/icons/uil-facebook-f";
import HttpService from "../../../../../services/HttpService";
import config from "../../../../../Config";

export default function FacebookButton(props) {
    useEffect(() => {
        if (document.contains(document.getElementById("facebook-jssdk"))) {
            document.getElementById("facebook-jssdk").remove();
        }
        window.fbAsyncInit = function() {
            window.FB.init({
                appId      : config.facebook.appId,
                cookie     : true,
                xfbml      : true,
                version    : 'v7.0'
            });

            window.FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });

    const loginAction = (credentials) =>
    {

        const http = new HttpService();
        let signUpUrl = "auth/facebook";
        http.postData(credentials,signUpUrl).then(res =>{
            if(res.hasOwnProperty('success') && res.success===true &&  res.hasOwnProperty('token')){
                localStorage.setItem('user-token','Bearer '+res.token);
                setTimeout(() => {
                    props.props.history.push("/project/lists");
                }, 10);
            }
        }).catch((error)=> {
            return error;
        });
    }

    const handleClick = () =>
    {
        window.FB.login(function (response) {
            if (response.authResponse) {
                var authResponse = response.authResponse;
                window.FB.api('/me?fields=email,name', function (response) {
                    var dataLogin = {
                        email : response.email,
                        name : response.name,
                        provider_id : response.id,
                       // accessToken : authResponse.accessToken,
                       // expiresIn : authResponse.expiresIn,
                       // signedRequest : authResponse.signedRequest,
                       // data_access_expiration_time : authResponse.data_access_expiration_time
                    }
                    loginAction(dataLogin);
                });
            }
        },{scope: 'public_profile,email'});

    }

    return (
        <a href="#!"
           data-toggle="tooltip"
           data-placement="bottom"
           title="Sign up with Facebook"
           onClick={handleClick}
        >
            <UilFacebook/>
        </a>

    )

}
