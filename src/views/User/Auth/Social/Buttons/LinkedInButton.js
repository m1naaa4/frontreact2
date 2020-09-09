import React,{ useEffect } from 'react'
import UilLinkedin from '@iconscout/react-unicons/icons/uil-linkedin-alt'
import HttpService from "../../../../../services/HttpService";
import config from "../../../../../Config";
import LinkedIn from './LinkedIn';

export default function LinkedInButton(props) {

    const callbackLinkedIn = (error, code, redirectUri) => {
        var credentials = {
            code : code
        }
        const http = new HttpService();
        let signUpUrl = "auth/linkedin";
        http.postData(credentials,signUpUrl).then(res =>{
            if(res.hasOwnProperty('success') && res.success===true &&  res.hasOwnProperty('token')){
                localStorage.setItem('user-token','Bearer '+res.token);
                setTimeout(() => {
                    props.props.history.push("/projects/lists");
                }, 10);
            }
        }).catch((error)=> {
            console.log(error);
            return error;
        });
    };
    return (
        <div>
            <LinkedIn
                clientId="7742laxwuilhzo"
                callback={callbackLinkedIn}
                scope={["r_liteprofile","r_emailaddress"]}
                text="Login With LinkedIn"
            />
        </div>

)

}
