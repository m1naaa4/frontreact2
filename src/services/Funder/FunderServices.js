import HttpService from '../HttpService';


export const FunderServices = (query, props, url) =>
{
   
    const http = new HttpService();
    let searchProject = "funders"+url;
   
    return http.postData(query,searchProject).then(data=>{
        // console.log(data)
        return data;
    }).catch((error)=> {
        return error.response.data;
    });
}
export const UploadFileService = (formdata) =>
{

    const http = new HttpService();
    let upload = "video/upload";
    return http.postUploadData(formdata, upload).then(data=>{
        return data;
    }).catch((error)=> {
        return error;
    });
}

export const LoadProject = (data, props, current) =>{

    const http = new HttpService();
    let getProjectUrl = "project/getallProjects?page="+current;
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}
export const GetProject = (data, props, current) =>{

    const http = new HttpService();
    let getProjectUrl = "project/getProject";
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const GetMyProject = (data, props, current) =>{

    const http = new HttpService();
    let getProjectUrl = "project/getmyprojectlist";
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}
