import Pusher from 'pusher-js';

class PusherConsole {
    pusher = new Pusher(`${process.env.REACT_APP_KEY_PUSHER_CONSOLE}`, 
    {
        cluster: `${process.env.REACT_APP_CLUSTER_PUSHER_CONSOLE}`
    });
}


export default PusherConsole;