import axios from 'axios';


class HttpProject {
    postData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_PROJCT;
        axios.defaults.withCredentials = false;
        data.user_id = localStorage.getItem('user_id');
        
        return await axios({
            method: 'POST',
            url: process.env.REACT_APP_PROJCT + url,
            data: data
        }).then(response => response.data)
    }

    GetData = async (id, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_PROJCT;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: process.env.REACT_APP_PROJCT + url + '/' + id,
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_PROJCT;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'PUT',
            url: url,
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_PROJCT;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: process.env.REACT_APP_PROJCT + url,
            data: data
        }).then(response => response.data);
    }
}

export default HttpProject;


