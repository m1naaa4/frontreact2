import axios from 'axios';
import { svcUrl } from '../svcUrl';

class HttpNotification {
    postData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        data.user_id = localStorage.getItem('user_id');
        return await axios({
            method: 'POST',
            url: svcUrl('notification', process.env.REACT_APP_Notification, url),
            data: data
        }).then(response => response.data)
    }

    GetData = async (url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: svcUrl('notification', process.env.REACT_APP_Notification, url),
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'PUT',
            url: svcUrl('notification', process.env.REACT_APP_Notification, url),
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: svcUrl('notification', process.env.REACT_APP_Notification, url),
            data: data
        }).then(response => response.data);
    }
}

export default HttpNotification;
