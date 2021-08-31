import Pusher from 'pusher-js';
import config from '../Config';
import Echo from 'laravel-echo'



// Pusher.log = function(message) {
//       console.log( JSON.stringify(message));

//   };

 console.log(window.location.hostname)
// console.log('dddddddddddddddddddddddddddddddddddddddddd',`${process.env.REACT_APP_API_URL}`)
// console.log('dddddddddddddddddddddddddddddddddddddddddd',`${process.env.APP_KEY}`)
// console.log('dddddddddddddddddddddddddddddddddddddddddd',`${process.env.APP_CLUSTER}`)
// console.log('dddddddddddddddddddddddddddddddddddddddddd',`${process.env}`)
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
        cluster: 'eu',//`${process.env.CLUSTER}`,
        // encrypted: true,
        encrypted: true,
        wsHost: window.location.hostname,
        wsPort: 6004,
        wssPort: 6004,
        forceTLS: true,
        disableStats: false,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: `${process.env.REACT_APP_API_URL}` + '/broadcasting/auth',
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