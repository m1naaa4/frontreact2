import HttpService from '../../HttpService';


export const GetFileService = (data, props, current) =>{

    const http = new HttpService();
    let getMediaUrl = "video/getfile";
    const tokenId = "user-token";
    return http.postData(data,getMediaUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}


