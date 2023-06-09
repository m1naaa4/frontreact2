import axios from 'axios';


class HttpMedia {
    postData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_MEDIA_UPLOAD;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'POST',
            url: process.env.REACT_APP_MEDIA_UPLOAD + url,
            data: data
        }).then(response => response.data)
    }

    GetData = async (id, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_MEDIA_UPLOAD;
        axios.defaults.withCredentials = false;
        console.log(url);
        return await axios({
            method: 'GET',
            url: process.env.REACT_APP_MEDIA_UPLOAD + url + '/' + id,
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_MEDIA_UPLOAD;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'UPDATE',
            url: url,
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_MEDIA_UPLOAD;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: url,
            data: data
        }).then(response => response.data);
    }
}

export default HttpMedia;


