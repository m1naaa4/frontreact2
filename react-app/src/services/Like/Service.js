import axios from 'axios';


class HttpLike {
    postData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_LIKE;
        axios.defaults.withCredentials = false;
        data.user_id = localStorage.getItem('user_id');
        
        return await axios({
            method: 'POST',
            url: process.env.REACT_APP_LIKE + url,
            data: data
        }).then(response => response.data)
    }

    GetData = async (url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_LIKE;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'GET',
            url: process.env.REACT_APP_LIKE + url ,
        }).then(response => response.data);
    }

    UpdateData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_LIKE;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'PUT',
            url: url,
            data: data
        }).then(response => response.data);
    }

    DeleteData = async (data, url) =>
    {
        axios.defaults.baseURL = process.env.REACT_APP_LIKE;
        axios.defaults.withCredentials = false;
        return await axios({
            method: 'DELETE',
            url: process.env.REACT_APP_LIKE + url,
            data: data
        }).then(response => response.data);
    }
}

export default HttpLike;


