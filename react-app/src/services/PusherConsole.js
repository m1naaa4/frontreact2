import Pusher from 'pusher-js';

class PusherConsole {
    constructor() {
        if (!PusherConsole.instance) {
            const key = process.env.REACT_APP_KEY_PUSHER_CONSOLE;
            const cluster = process.env.REACT_APP_CLUSTER_PUSHER_CONSOLE;
            
            if (!key || !cluster) {
                console.warn('Pusher configuration missing. WebSocket features may not work.');
                PusherConsole.instance = null;
                return;
            }

            PusherConsole.instance = new Pusher(key, {
                cluster: cluster,
                encrypted: true,
                authEndpoint: null, // Public channels only for now
            });

            // Configure reconnection behavior
            PusherConsole.instance.connection.bind('state_change', (states) => {
                console.log(`WebSocket connection state: ${states.previous} -> ${states.current}`);
            });

            PusherConsole.instance.connection.bind('connected', () => {
                console.log('WebSocket connection established');
            });

            PusherConsole.instance.connection.bind('disconnected', () => {
                console.warn('WebSocket connection lost. Attempting to reconnect...');
            });

            PusherConsole.instance.connection.bind('error', (err) => {
                console.error('WebSocket error:', err);
            });
        }

        this.pusher = PusherConsole.instance;
    }

    subscribe(channelName) {
        if (!this.pusher) {
            console.warn('Pusher not initialized, cannot subscribe to:', channelName);
            return null;
        }
        return this.pusher.subscribe(channelName);
    }

    unsubscribe(channelName) {
        if (!this.pusher) return;
        this.pusher.unsubscribe(channelName);
    }

    disconnect() {
        if (!this.pusher) return;
        this.pusher.disconnect();
    }
}

export default PusherConsole;