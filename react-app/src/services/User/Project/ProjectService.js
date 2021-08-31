import HttpService from '../../HttpService';


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


