import axios from 'axios';

// Use Vite dev proxy in development, and real API URL in production builds.
const isDev = (typeof import.meta !== 'undefined') && import.meta && import.meta.env && import.meta.env.DEV;
const apiBase = isDev ? '/api' : process.env.REACT_APP_API_URL;
const microservicePrefixes = [
    '/project',
    '/notification',
    '/comment',
    '/like',
    '/post',
    '/article',
    '/funder',
    '/mentor',
    '/video',
];

axios.defaults.baseURL = apiBase || '';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('user-token');
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    if (!isDev || typeof config.url !== 'string') {
        return config;
    }

    // Service-specific routes must hit their own Vite proxy entries instead of
    // being prefixed with the global /api base URL for the main auth API.
    if (microservicePrefixes.some((prefix) => config.url.startsWith(prefix))) {
        config.baseURL = '';
    }

    return config;
});

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
      if (error.response === undefined) {
        return Promise.reject(error);
      }

      const requestUrl = String(error.config?.url || '');
      const isMessengerOrFriend = /\/messages\/|\/messenger\/|\/friend\/|searchUsers|getusers/i.test(requestUrl);

      // Messenger/friend APIs return 403 for business rules (e.g. not friends).
      // Do not hard-redirect the whole app for those cases.
      if (error.response.status === 403 && !isMessengerOrFriend) {
        window.location = '/noauthorization/:id';
      }
      if (error.response.status === 401) {
        // Do not force-logout on messenger/friend local API errors.
        if (!isMessengerOrFriend) {
          axios.post('/logout');
        }
      }

      return Promise.reject(error);
    }
);

export default axios;
