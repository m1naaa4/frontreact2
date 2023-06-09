import axios from 'axios';


class HttpComment {
    postData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_COMMENT;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'POST',
            url: url,
            data: data
        }).then(response => response.data)
    }

    GetData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_COMMENT;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: url + '/' + data.project_id + '/' + data.provider,
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_COMMENT;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'UPDATE',
            url: url,
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_COMMENT;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: url,
            data: data
        }).then(response => response.data);
    }
}

export default HttpComment;


