import Pusher from 'pusher-js';
import Echo from 'laravel-echo'

 console.log(window.location.hostname)
class PusherService {
    echo = new Echo({
        broadcaster: 'pusher',
        key: `${process.env.REACT_APP_WEB_SOCKET_API_KEY}`,
        cluster: `${process.env.REACT_APP_WEB_SOCKET_CLUSTER}`,
        encrypted: true,
        wsHost: `${process.env.REACT_APP_WS_HOST}`,
        wsPort: 6001,
        wssPort: 6001,
        forceTLS: true,
        disableStats: false,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: 'https://' + `${process.env.REACT_APP_WS_HOST}` + '/src/public/broadcasting/auth',
        auth:{
            headers:{
            //   'Content-Type':'application/json',
              'Accept':'application/json',
              'Authorization': localStorage.getItem('user-token')
            }
        }
    });
}


export default PusherService;