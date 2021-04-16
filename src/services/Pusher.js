import Pusher from 'pusher-js';
import config from '../Config';
import Echo from 'laravel-echo'

let   app_key       = config.pusher.api_key;
let   app_cluster   = config.pusher.cluster;

Pusher.log = function(message) {
    if (window.console && window.console.log) {
      window.console.log(message);
    }
  };

class PusherService {
    

    config =  new Pusher(app_key , {
        broadcaster: 'pusher',
        cluster : app_cluster,
        authEndpoint: 'http://api.dockergateway.test/src/public/api/broadcasting/auth',
        encrypted: true,

        auth:{
            headers:{
              'Accept':'application/json',
              'Authorization': localStorage.getItem('user-token')
            }
        }
    });

    echo = new Echo({
        broadcaster: 'pusher',
        key: app_key,
        cluster: app_cluster,
        encrypted: true,
        wsHost: 'http://dockergateway.test/src/public',
        wsPort: 6001,
        disableStats: true,
        authEndpoint: 'http://dockergateway.test/src/public/api/broadcasting/auth',
        auth:{
            headers:{
              'Accept':'application/json',
              'Authorization': localStorage.getItem('user-token')
            }
        }
    });
}


export default PusherService;