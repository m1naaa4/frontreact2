import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('user-token');
axios.defaults.withCredentials = true;


axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
      if (error.response === undefined) {
        return Promise.reject(error);
      }
      if(error.response.status === 403)
      {
        window.location = '/noauthorization/:id';
      }
      if(error.response.status === 401)
      {
        axios.get('/logout');
        // history.push('/project/lists')
      }
  
      return Promise.reject(error);
    }
);

export default axios;