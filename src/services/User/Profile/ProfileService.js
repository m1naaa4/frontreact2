import HttpService from '../../HttpService';


export const LoadUser = () =>{
    const http = new HttpService();
    let profileUpUrl = "user";
    const tokenId = "user-token";

    return  http.getData(profileUpUrl, tokenId).then( data => {
        // console.log(data)
        localStorage.setItem('user_id', data.user.id);
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const LoadProfile = (id) =>{
    const http = new HttpService();
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
    const http = new HttpService();
    let cvUpUrl = "cvtheque/update";

    return  http.postData(data, cvUpUrl,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const CvUpdate = (data) =>{
    const http = new HttpService();
    let cvUpUrl = "cvtheque/update/raw";

    return  http.postData(data, cvUpUrl,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}


export const Cvdelete = (data) =>{
    const http = new HttpService();
    let cvUpUrl = "cvtheque/delete/raw";

    return  http.postData(data, cvUpUrl,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const Cvget = () =>{
    const http = new HttpService();
    let cvUpUrl = "cvtheque/get";
    const tokenId = "user-token";

    return  http.getData(cvUpUrl, tokenId).then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}


export const AddPost = (data, props, current) =>{

    const http = new HttpService();
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

    const http = new HttpService();
    let addpost = 'post/deletePost';
    const tokenId = "user-token";
    return http.postData(data, addpost, tokenId, '').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const GetPosts = (data, props, current) =>{

    const http = new HttpService();
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

    const http = new HttpService();
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
    const http = new HttpService();
    let Url = "password/resetpassword";

    return  http.postData(data, Url,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const updateInfo = (data) =>{
    const http = new HttpService();
    let cvUpUrl = "cvtheque/update";

    return  http.postData(data, cvUpUrl,'').then( data => {
        return data;
    }).catch((error)=> {
        return error;
         });
}



