import HttpServiceAdmin from "../HttpServiceAdmin";

let http = new HttpServiceAdmin();
export const LoadAdmin = (data) =>{
    
    let url = data.url;
    const tokenId = "admin-token";

    return  http.getData(url, tokenId).then( data => {
        localStorage.setItem('admin_id', data.user.id);
        localStorage.setItem('notification_admin', data.user.new_notification ? data.user.new_notification : 0);
        return data;
    }).catch((error)=> {
        return error;
    });
}

export const generalePost = (data) =>{
    
    return  http.postData(data, data.url).then( data => {
        return data;
    }).catch((error)=> {
        return error;
    });
}

export const generaleGet = (url) =>{
    
    return  http.getData(url).then( data => {
        return data;
    }).catch((error)=> {
        return error;
    });
}

