import axios from 'axios';
import { svcUrl } from '../svcUrl';

class HttpComment {
    postData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'POST',
            url: svcUrl('comment', process.env.REACT_APP_COMMENT, url),
            data: data
        }).then(response => response.data)
    }

    GetData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: svcUrl('comment', process.env.REACT_APP_COMMENT, url) + '/' + data.project_id + '/' + data.provider,
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'UPDATE',
            url: svcUrl('comment', process.env.REACT_APP_COMMENT, url),
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: svcUrl('comment', process.env.REACT_APP_COMMENT, url),
            data: data
        }).then(response => response.data);
    }
}

export default HttpComment;
