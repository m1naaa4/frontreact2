import HttpService from '../../HttpService';


export const ProjectServices = (query, props, url) =>
{
    // console.log('query')
    // console.log(query)
    const http = new HttpService();
    let searchProject = "project"+url;
   
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
