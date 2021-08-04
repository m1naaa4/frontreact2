import axios from "axios";
import config from '../Config'
class HttpService {
    url = config.urls.api;

    postDataa = async (item, added_url, tokenId = "") =>
    {
        item.profile_id = localStorage.getItem('profile_id');
        const token = await localStorage.getItem(tokenId);

        const requestOptions = this.postRequestOptions(token, item);

        return fetch( "/" + added_url, requestOptions).then(
            response => response.json());
    }

    postData = async (item, added_url, tokenId = "") =>
    {
        item.profile_id = localStorage.getItem('profile_id');
        item.user_id = localStorage.getItem('user_id');

        return await axios({
            method: 'POST',
            url: "/" + added_url,
            data: item
        }).then(response => response.data)
    }

    postUploadData = async (item, added_url, tokenId = "") =>
    {
        item.profile_id = localStorage.getItem('profile_id');
        return await axios({
            method: 'POST',
            url: "/" + added_url,
            data: item,
            onUploadProgress : progressEvent =>{
                console.log('upload progress: ' + Math.round(progressEvent.loaded / progressEvent.total *100)+'%')
            }
        }).then(response => response.data)
    }

    getData = async (added_url) =>
    {
        return await axios("/" + added_url).then( response => response.data);
    }

    getRequestOptions = (token) =>
    {
        let requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json',
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
                'Content-type': 'Application/json',
            },

            body: item,

        }

        return requestOptions;
    }

    postDataScroll = async (query, added_url, tokenId = "") =>
    {
        let sector  = query['sector']
        let search  = query['search']
        let zone    = query['zone']
        let financement = query['financement']
        let cancel
        let action  = 'getallProjects'
        axios({
            method      : 'POST',
            url         : added_url,
            cancelToken : new axios.CancelToken(c => cancel = c),
            params      : { search: search,sector: sector,financement: financement,zone: zone, action : action}
        }).then(resp => {
            return resp.json();
            // setHasMore(resp.data.result.next_page_url)
            // setLoading(false)
            console.log(resp.result)
        }).catch(err => {
            if(axios.isCancel(err)) return
            // setError(true)
        })
        return () => cancel()
    }


    getRequest = async (item, url, tokenId = "") =>
    {
        item.user_id = localStorage.getItem('user_id');
        return await axios({
            method: 'GET',
            url: "/" + url,
            params: item
        }).then(response => response.data)
    }


}


export default HttpService;
    
    
    
    
    

    
    
    
    