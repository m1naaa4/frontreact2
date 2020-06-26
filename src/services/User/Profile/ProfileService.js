import HttpService from '../../HttpService';

import axios from 'axios'



export const LoadUserProfile = () =>{
    const http = new HttpService();
    let profileUpUrl = "user";
    const tokenId = "user-token";

    return http.getData(profileUpUrl,tokenId).then(data=>{
        // console.log(JSON.stringify(data));
        return data;
    }).catch((error)=> {
        // console.log(error)
        return error;
         });
}


