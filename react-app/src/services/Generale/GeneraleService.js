import HttpService from "../HttpService";


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

export const Get = (url) =>{
    const http = new HttpService();

    return  http.getData(url).then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const Post = (data, url) =>{
    const http = new HttpService();

    return  http.postData(data,url).then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const PostMessage = (data, url) =>{
    const http = new HttpService();

    return  http.postData(data,url).then( res => {
        return {data:res, id:data['receiver_id']};
    }).catch((error)=> {
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

export const deleteNotification = (data) =>{
    const http = new HttpService();
    let profileUpUrl = "notification/delete";
    const tokenId = "user-token";

    return http.postData(data, profileUpUrl, tokenId, '').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}


