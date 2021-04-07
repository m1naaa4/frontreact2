import HttpService from '../HttpService';


export const SignUpService = (credentials) =>
{
    const http = new HttpService();
    let signUpUrl = "register";
    return http.postData(credentials,signUpUrl).then(data=>{
        // console.log(JSON.stringify(data));
        return data;
    }).catch((error)=> {
        return error;
         });
}

export const LoginUser = (credentials) =>
{
    const http = new HttpService();
    let signUpUrl = "login";
    return http.postData(credentials,signUpUrl).then(data=>{
        // console.log(JSON.stringify(data));
        return data;
    }).catch((error)=> {
        return error;
    });
}

export const LogoutUser = () =>
{
    const http = new HttpService();
    let logoutUrl = "logout";
    const tokenId = "user-token";
    return http.getData(logoutUrl,tokenId).then(data=>{
        // console.log(JSON.stringify(data));
        return data;
    }).catch((error)=> {
        return error;
    });
}