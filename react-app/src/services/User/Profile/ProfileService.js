import HttpService from '../../HttpService';

let http = new HttpService();
export const LoadUser = () =>{
    
    let profileUpUrl = "user";
    const tokenId = "user-token";

    return  http.getData(profileUpUrl, tokenId).then( data => {
        // console.log(data)
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('profile_id', data.user.profile_id);
        localStorage.setItem('notification', data.user.new_notification ? data.user.new_notification : 0);
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const GetInvitations = (data) =>{
    
    let Url = "friend/getInvitations";
    const tokenId = "user-token";

    return  http.postData(Url, tokenId).then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const LoadProfile = (id) =>{
    
    let profileUpUrl = "profile/getProfile/"+ id;
    const tokenId = "user-token";

    return  http.getData(profileUpUrl, tokenId,).then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const UpdateProfile = (data) =>{
    const http = new HttpService();
    let profileUpUrl = "profile/update";

    return  http.postData(data, profileUpUrl,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const Cvsave = (data) =>{
    
    let cvUpUrl = "cvtheque/update";

    return  http.postData(data, cvUpUrl,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const CvUpdate = (data) =>{
    
    let cvUpUrl = "cvtheque/update/raw";

    return  http.postData(data, cvUpUrl,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}


export const Cvdelete = (data) =>{
    
    let cvUpUrl = "cvtheque/delete/raw";

    return  http.postData(data, cvUpUrl,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const Cvget = (data) =>{
    
    let cvUpUrl = "cvtheque/get";
    const tokenId = "user-token";

    return  http.postData(data, cvUpUrl, tokenId).then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}


export const AddPost = (data, props, current) =>{

    
    let addpost = 'post/addPost';
    const tokenId = "user-token";
    return http.postData(data, addpost, tokenId, '').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const DeletePost = (data, props, current) =>{

    
    let addpost = 'post/deletePost';
    const tokenId = "user-token";
    return http.postData(data, addpost, tokenId, '').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const GetYoutube = (data, props, current) =>{

    
    let addpost = 'post/getYoutubeVideo';
    const tokenId = "user-token";
    return http.postData(data, addpost, tokenId, '').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const GetPosts = (data, props, current) =>{

    
    let getposts = 'post/getPosts?page='+current;
    const tokenId = "user-token";
    return http.postData(data, getposts, tokenId, '').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const GetPost = (data, props) =>{

    
    let getposts = 'post/getPost';
    const tokenId = "user-token";
    return http.postData(data, getposts, tokenId, '').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const updateAccess = (data) =>{
    
    let Url = "password/resetpassword";

    return  http.postData(data, Url,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const updateInfo = (data) =>{
    
    let Url = "user/update/info";

    return  http.postData(data, Url,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const language = (data) =>{
    
    let Url = "user/update/language";

    return  http.postData(data, Url,'').then( data => {
        localStorage.getItem(data.profile.language)
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const confirme = (data) =>{
    
    const tokenId = "user-token";
    let Url = "register/resendconfirmation";
    return  http.getData(Url, tokenId).then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}



