import HttpService from '../HttpService';
import { useDispatch } from 'react-redux';



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

export const ResetpasswordUser = (credentials,dispatch) =>
{
    const http = new HttpService();
    let resetUrl = "password/create";
    return http.resetPasswordData(credentials,resetUrl).then(data=>{
        // console.log(JSON.stringify(data));
        console.log("email sent successfully");
        dispatch({type:'RESET_SUCCESS', data})
        return data;
    }).catch((error)=> {
        console.log("error");
        dispatch({type:'RESET_ERROR',error});
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