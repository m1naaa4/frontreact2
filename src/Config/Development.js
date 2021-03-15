import axios from 'axios'



axios.defaults.baseURL = 'http://projectauth.test/api/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('user-token');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Accept'] = 'application/json';
const dev = {
    urls: {
        // 'api' : 'http://projectauth.test/api',
        'front' : 'http://localhost:3000',
        'api' : 'http://localhost:8090/api/'
    },
    facebook:{
        appId      : '2711133325873185'
    }
};

export default dev;