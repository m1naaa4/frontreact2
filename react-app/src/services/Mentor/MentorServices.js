import Service from './Service';

export const PostService = (query, url) =>
{
    const http = new Service();
    let searchProject = url;
   
    return http.postData(query, searchProject).then(data=>{
        return data;
    }).catch((error)=> {
        return error.response.data;
    });
}
export const UploadFileService = (formdata) =>
{

    const http = new Service();
    let upload = "video/upload";
    return http.postUploadData(formdata, upload).then(data=>{
        return data;
    }).catch((error)=> {
        return error;
    });
}

export const GetService = (url) => {
    const http = new Service();
    return http.GetData(url).then(data => {
        return data
    }).catch((error) => {
        console.log(error)
        return error;
    });
}

export const UpdateService = (data, url) => {
    const http = new Service();
    return http.UpdateData(data, url).then(data => {
        return data
    }).catch((error) => {
        console.log(error)
        return error;
    });
}

export const GetView = (id) =>{
    const http = new Service();
    let getProjectUrl = '/' + id;
    const tokenId = "user-token";
    return http.GetData({}, getProjectUrl, tokenId, '').then(data => {
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const Listing = (data, current) => {
    const http = new Service();
    let getProjectUrl = "/?page=" + current;
    const tokenId = "user-token";
    return http.postData(data, getProjectUrl, tokenId, '').then(data => {
        return data
    }).catch((error) => {
        console.log(error)
        return error;
    });
}
export const GetProject = (data, props, current) =>{

    const http = new Service();
    let getProjectUrl = "project/getProject";
    const tokenId = "user-token";
    return http.postData(data, getProjectUrl, tokenId, '').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const GetMyProject = (data, props, current) =>{

    const http = new Service();
    let getProjectUrl = "project/getmyprojectlist";
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}
