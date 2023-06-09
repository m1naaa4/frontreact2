import Service from './Service';


export const UploadLogoService = (providerId, file, provider, type, url) =>
{
    const http = new Service();

    const formData = new FormData();
    formData.append('attachments[]', file);
    formData.append("media_section", provider);
    formData.append("media_type", type);
    formData.append("type", "logo");
    formData.append("provider", provider);
    formData.append("visibility", 'public');
    formData.append("provider_id", providerId);

    return http.postData(formData, url).then(data=>
    {
        return data;
    }).catch((error)=> {
        return error.response.data;
    });
}

export const UploadMediaService = (formData, url) =>
{
    const http = new Service();

    return http.postData(formData, url).then(data=>
    {
        return data;
    }).catch((error)=> {
        return error.response.data;
    });
}

export const PostService = (data, url ) =>
{
    const http = new Service();
    return http.postData(data, url).then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const GetService = (data, url ) =>
{
    const http = new Service();
    return http.GetData(data, url).then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const UpdateService = (data, url ) =>
{
    const http = new Service();
    return http.UpdateData(data, url).then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}

export const DeleteService = (data, url ) =>
{
    const http = new Service();
    return http.DeleteData(data, url).then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}
