import axios from "axios";
import config from '../Config'
class HttpServiceAdmin {
    url   =  config.urls.api;
    token =  localStorage.getItem('admin-token');

    postDataa = async (item, added_url, tokenId = "") =>
    {
        item.profile_id = localStorage.getItem('profile_id');

        const requestOptions = this.postRequestOptions(this.token, item);

        return fetch(this.url + "/" + added_url, requestOptions).then(
            response => response.json());
    }

    postData = async (item, added_url, tokenId = "") =>
    {

        const requestOptions = this.postRequestOptions(this.token, item);
        return axios(this.url + "/" + added_url, requestOptions).then(
            response => response.json()
        );
    }

    getData = async (data) =>
    {
        const requestOptions = this.getRequestOptions(this.token);
        return axios(this.url + "/" + data.url, requestOptions).then(
            response => response.data
        );
    }

    getRequestOptions = (token) =>
    {
        let requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-type' : 'application/json',
                'Accept'       : 'application/json',
            }
        }
        return requestOptions;
    }

    postRequestOptions = (token, item) =>
    {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-type' : 'Application/json',
                'Accept'       : 'Application/json',
            },

            data: item,

        }
        return requestOptions;
    }
}


export default HttpServiceAdmin;
    
    
    
    
    

    
    
    
    