import HttpService from '../../HttpService';


export const LoadUser = () =>{
    const http = new HttpService();
    let profileUpUrl = "user";
    const tokenId = "user-token";

    return  http.getData(profileUpUrl, tokenId).then( data => {
        console.log(data)
        return data;
    }).catch((error)=> {
        // console.log(error)
        return error;
         });
}

export const LoadProfile = (id) =>{
    const http = new HttpService();
    let profileUpUrl = "profile/getProfile/"+ id;
    const tokenId = "user-token";

    return  http.getData(profileUpUrl, tokenId).then( data => {
        // console.log(data)
        return data;
    }).catch((error)=> {
        // console.log(error)
        return error;
         });
}


