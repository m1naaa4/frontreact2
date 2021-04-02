import HttpService from "../HttpService";
import PusherService from "../Pusher";


export const LoadNotification = () =>{
    const http = new HttpService();
    let profileUpUrl = "notification/getNotifications";
    const tokenId = "user-token";

    return  http.getData(profileUpUrl, tokenId).then( data => {
        // console.log(data)
        return data;
    }).catch((error)=> {
        // console.log(error)
        return error;
         });
}


export const SeenNotification = (data) =>{
    const http = new HttpService();
    let profileUpUrl = "notification/see";
    const tokenId = "user-token";

    return http.postData(data, profileUpUrl, tokenId, '').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}


