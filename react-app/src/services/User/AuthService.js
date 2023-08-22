import HttpService from '../HttpService';

export const SignUpService = (credentials) =>
{
    const http = new HttpService();
    let signUpUrl = "register";
    return http.postData(credentials,signUpUrl).then(data=>{
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
        return data;
    }).catch((error)=> {
        return error;
    });
}

export const ResetpasswordUser = (credentials,dispatch) =>
{
    const http = new HttpService();
    let resetUrl = "password/create";
    return http.postData(credentials, resetUrl, '', true).then(data=>{
        dispatch({type:'RESET_SUCCESS', data})
        return data;
    }).catch((error)=> {
        dispatch({type:'RESET_ERROR',error});
        return error;
    });
}

export const LogoutUser = () =>
{
    const http = new HttpService();
    let logoutUrl = "logout";
    return http.postLogout(logoutUrl).then(data=>{
        return data;
    }).catch((error)=> {
        return error;
    });
}