import HttpService from '../../HttpService';


export const ProjectServices = (query) =>
{
    const http = new HttpService();
    let searchProject = "project/handleaction";
    return http.postData(query,searchProject).then(data=>{
        console.log(data)
        return data;
    }).catch((error)=> {
        return error;
    });
}
export const AddProjectProject = (query) =>
{
    const http = new HttpService();
    let searchProject = "project/handleaction";
    return http.postData(query,searchProject).then(data=>{
        return data;
    }).catch((error)=> {
        return error;
    });
}
