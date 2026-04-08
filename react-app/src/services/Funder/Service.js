import axios from 'axios';
import { svcUrl } from '../svcUrl';

class HttpFunder {
    postData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        data.user_id = localStorage.getItem('user_id');
        return await axios({
            method: 'POST',
            url: svcUrl('funder', process.env.REACT_APP_FUNDER, url),
            data: data
        }).then(response => response.data)
    }

    GetData = async (url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: svcUrl('funder', process.env.REACT_APP_FUNDER, url),
        }).then(response => response.data);
    }

    getRequest = async (item, url) => {
        item.user_id = localStorage.getItem('user_id');
        return await axios({
            method: 'GET',
            url: '/' + url,
            params: item
        }).then(response => response.data)
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'PUT',
            url: svcUrl('funder', process.env.REACT_APP_FUNDER, url),
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: svcUrl('funder', process.env.REACT_APP_FUNDER, url),
            data: data
        }).then(response => response.data);
    }
}

export default HttpFunder;
