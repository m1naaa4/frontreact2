import axios from 'axios';
import { svcUrl } from '../svcUrl';

class HttpProject {
    postData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        data.user_id = localStorage.getItem('user_id');
        return await axios({
            method: 'POST',
            url: svcUrl('project', process.env.REACT_APP_PROJCT, url),
            data: data
        }).then(response => response.data)
    }

    GetData = async (id, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: svcUrl('project', process.env.REACT_APP_PROJCT, url) + '/' + id,
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'PUT',
            url: svcUrl('project', process.env.REACT_APP_PROJCT, url),
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: svcUrl('project', process.env.REACT_APP_PROJCT, url),
            data: data
        }).then(response => response.data);
    }
}

export default HttpProject;
