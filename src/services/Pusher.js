import Pusher from 'pusher-js';
import config from '../Config'

let   app_key       = config.pusher.api_key;
let   app_cluster   = config.pusher.cluster;

class PusherService {
    

    config =  new Pusher(app_key , {
            cluster : app_cluster,
        });    
}


export default PusherService;