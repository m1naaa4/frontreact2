import axios from 'axios';
import { svcUrl } from '../svcUrl';

class HttpMedia {
    postData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'POST',
            url: svcUrl('video', process.env.REACT_APP_MEDIA_UPLOAD, url),
            data: data
        }).then(response => response.data)
    }

    GetData = async (id, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: svcUrl('video', process.env.REACT_APP_MEDIA_UPLOAD, url) + '/' + id,
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'UPDATE',
            url: svcUrl('video', process.env.REACT_APP_MEDIA_UPLOAD, url),
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: svcUrl('video', process.env.REACT_APP_MEDIA_UPLOAD, url),
            data: data
        }).then(response => response.data);
    }
}

export default HttpMedia;
