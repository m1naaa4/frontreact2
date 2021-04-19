import Pusher from 'pusher-js';
import config from '../Config';
import Echo from 'laravel-echo'

let   app_key       = config.pusher.api_key;
let   app_cluster   = config.pusher.cluster;

// Pusher.log = function(message) {
//       console.log( JSON.stringify(message));

//   };

 
console.log('dddddddddddddddddddddddddddddddddddddddddd',`${process.env.REACT_APP_API_URL}`)
console.log('dddddddddddddddddddddddddddddddddddddddddd',`${process.env.APP_KEY}`)
console.log('dddddddddddddddddddddddddddddddddddddddddd',`${process.env.APP_CLUSTER}`)
console.log('dddddddddddddddddddddddddddddddddddddddddd',`${process.env}`)
class PusherService {
    

    // config =  new Pusher(`${process.env.WEB_SOCKET_API_KEY}` , {
    //     broadcaster: 'pusher',
    //     cluster : `${process.env.CLUSTER}`,
    //     authEndpoint: `${process.env.REACT_APP_API_URL}`+'broadcasting/auth',
    //     encrypted: true,

    //     auth:{
    //         headers:{
    //           'Accept':'application/json',
    //           'Authorization': localStorage.getItem('user-token')
    //         }
    //     }
    // });

    echo = new Echo({
        broadcaster: 'pusher',
        key: 'local',
        // cluster: `${process.env.CLUSTER}`,
        // encrypted: true,
        forceTLS:false,
        wsHost: `${process.env.REACT_APP_API_URL_NOT}`,
        wsPort: 6001,
        disableStats: true,
        authEndpoint: `${process.env.REACT_APP_API_URL}` + 'broadcasting/auth',
        auth:{
            headers:{
              'Accept':'application/json',
              'Authorization': localStorage.getItem('user-token')
            }
        }
    });
}


export default PusherService;