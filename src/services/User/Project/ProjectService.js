import HttpService from '../../HttpService';
import {useState} from "react";


export const LoadProject = (data, props, current) =>{

    const http = new HttpService();
    // const [projects, setProject]     = useState([])
    let getProjectUrl = "project/handleaction"+"?page="+current;
    const tokenId = "user-token";
    return http.postData(data,getProjectUrl,tokenId,'').then(data=>{
        return data
    }).catch((error)=> {
        console.log(error)
        return error;
    });
}


