import axios from './interceptors.js';
class HttpService {

    postData = async (item, added_url, tokenId = "", logged = true) =>
    {
        axios.defaults.withCredentials = false;
        if (logged) {
            item.profile_id = localStorage.getItem('profile_id');
            item.user_id = localStorage.getItem('user_id');
        }
        return await axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URL + "/" + added_url,
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
        axios.defaults.withCredentials = false;
        return await axios(process.env.REACT_APP_API_URL + "/" + added_url).then( response => response.data);
    }

    postLogout = async (added_url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URL + "/" + added_url,
        }).then(response => response.data)
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
    
    
    
    
    

    
    
    
    