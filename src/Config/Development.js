import axios from 'axios'

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
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
    },
    pusher:{
        api_key : '0eb0de6602610580c1bf',
        cluster : 'eu',

        // api_key : `${process.env.APP_KEY}`,
        // cluster : `${process.env.APP_CLUSTER}`,

        
    }
};

export default dev;