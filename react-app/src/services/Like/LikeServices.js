import Service from './Service';


export const PostService = (data, url) =>
{
    const http = new Service();
    return http.postData(data, url).then(data=>{
        return data;
    }).catch((error)=> {
        return error.response.data;
    });
}

export const GetService = (data, url ) =>
{
    const http = new Service();
    return http.GetData(data, url).then(data=>{
        return data
    }).catch((error)=> {
        return error;
    });
}

export const UpdateService = (data, url ) =>
{
    const http = new Service();
    return http.UpdateData(data, url).then(data=>{
        return data
    }).catch((error)=> {
        return error;
    });
}

export const DeleteService = (data, url ) =>
{
    const http = new Service();
    return http.DeleteData(data, url).then(data=>{
        return data
    }).catch((error)=> {
        return error;
    });
}

export const GetMyProject = (data, props, current) =>
{
    const http = new Service();
    let getProjectUrl = "project/getmyprojectlist";
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        return error;
    });
}

export const LoadProject = (data, props, current) =>
{
    const http = new Service();
    let getProjectUrl = "/get?page="+current;
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        return error;
    });
}

export const GetProject = (data ) =>
{
    const http = new Service();
    let getProjectUrl = "project/getProject";
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        return error;
    });
}
