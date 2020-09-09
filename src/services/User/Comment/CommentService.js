import HttpService from '../../HttpService';


export const AddComment = (data, props, current) =>{

    const http = new HttpService();
    let addcommentUr = "comment/handleaction";
    const tokenId = "user-token";
    return http.postData(data,addcommentUr,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}
export const GetComment = (data, props, current) =>{

    const http = new HttpService();
    let getProjectUrl = "comment/handleaction";
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}


