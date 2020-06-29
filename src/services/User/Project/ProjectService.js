import HttpService from '../../HttpService';


export const LoadProject = (data, props, current) =>{

    const http = new HttpService();
    let getProjectUrl = "project/handleaction"+"?page="+current;
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}


