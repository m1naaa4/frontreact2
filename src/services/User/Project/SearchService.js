import HttpService from '../../HttpService';


export const ProjectServices = (query) =>
{
    const http = new HttpService();
    let searchProject = "project/handleaction";
    console.log("query" , query)
    console.log("query" , query.logo)
    return http.postUploadData(query,searchProject).then(data=>{
        console.log(data)
        return data;
    }).catch((error)=> {
        return error;
    });
}
export const UploadFileService = (formdata) =>
{

    const http = new HttpService();
    let searchProject = "video/handleaction";
    return http.postUploadData(formdata, searchProject).then(data=>{
        return data;
    }).catch((error)=> {
        return error;
    });
}
