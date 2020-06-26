import axios from "axios";

class HttpService {
    url = "http://api.projectauth.test/api";


    postDataa = async (item, added_url, tokenId = "") =>
    {
        const token = await localStorage.getItem(tokenId);

        const requestOptions = this.postRequestOptions(token, item);

        return fetch(this.url + "/" + added_url, requestOptions).then(
            response => response.json());
    }

    postData = async (item, added_url, tokenId = "") =>
    {
        return await axios({
            method: 'POST',
            url: this.url + "/" + added_url,
            params: item
        }).then(response => response.data)
    }

    getData = async (added_url, tokenId = "") =>
    {
        const token = await localStorage.getItem(tokenId);
        const requestOptions = this.getRequestOptions(token);

        return fetch(this.url + "/" + added_url, requestOptions).then(
            response => response.json());
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



}


export default HttpService;
    
    
    
    
    

    
    
    
    