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
