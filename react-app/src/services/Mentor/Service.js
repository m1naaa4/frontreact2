import axios from 'axios';
import { svcUrl } from '../svcUrl';

class HttpMentor {
    postData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        data.user_id = localStorage.getItem('user_id');
        return await axios({
            method: 'POST',
            url: svcUrl('mentor', process.env.REACT_APP_MENTOR, url),
            data: data
        }).then(response => response.data)
    }

    GetData = async (url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: svcUrl('mentor', process.env.REACT_APP_MENTOR, url),
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
            url: svcUrl('mentor', process.env.REACT_APP_MENTOR, url),
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: svcUrl('mentor', process.env.REACT_APP_MENTOR, url),
            data: data
        }).then(response => response.data);
    }
}

export default HttpMentor;
