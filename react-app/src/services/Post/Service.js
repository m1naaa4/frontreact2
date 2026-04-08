import axios from 'axios';
import { svcUrl } from '../svcUrl';

class HttpPost {
    postData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        data.user_id = localStorage.getItem('user_id');
        return await axios({
            method: 'POST',
            url: svcUrl('post', process.env.REACT_APP_POST, url),
            data: data
        }).then(response => response.data)
    }

    GetData = async (id, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: svcUrl('post', process.env.REACT_APP_POST, url) + '/' + id,
        }).then(response => response.data);
    }

    GetsData = async (id, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: svcUrl('post', process.env.REACT_APP_POST, url),
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'PUT',
            url: svcUrl('post', process.env.REACT_APP_POST, url),
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: svcUrl('post', process.env.REACT_APP_POST, url),
            data: data
        }).then(response => response.data);
    }
}

export default HttpPost;
