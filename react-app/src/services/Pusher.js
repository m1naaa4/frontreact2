import Pusher from 'pusher-js';
import config from '../Config';
import Echo from 'laravel-echo'

 console.log(window.location.hostname)
class PusherService {
    echo = new Echo({
        broadcaster: 'pusher',
        key: 'local',
        cluster: 'eu',//`${process.env.CLUSTER}`,
        encrypted: true,
        wsHost: `${process.env.REACT_APP_WS_HOST}`,
        wsPort: 6001,
        wssPort: 6001,
        forceTLS: true,
        disableStats: false,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: `${process.env.REACT_APP_API_URL}` + 'broadcasting/auth',
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