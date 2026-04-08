import axios from 'axios';
import { svcUrl } from '../svcUrl';

class HttpLike {
    postData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        data.user_id = localStorage.getItem('user_id');
        return await axios({
            method: 'POST',
            url: svcUrl('like', process.env.REACT_APP_LIKE, url),
            data: data
        }).then(response => response.data)
    }

    GetData = async (url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: svcUrl('like', process.env.REACT_APP_LIKE, url),
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'PUT',
            url: svcUrl('like', process.env.REACT_APP_LIKE, url),
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: svcUrl('like', process.env.REACT_APP_LIKE, url),
            data: data
        }).then(response => response.data);
    }
}

export default HttpLike;
