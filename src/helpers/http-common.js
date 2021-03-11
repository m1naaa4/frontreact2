import axios from "axios";

axios.defaults.baseURL = 'http://api.gatway.test/api/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('user-token');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Accept'] = 'application/json';
export default axios.create({
  headers: {
    "Content-type": "application/json",
  },
});