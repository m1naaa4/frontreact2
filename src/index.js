import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import './bootstrap.css';
import './plyr.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import { store } from './createStore';

import { PusherProvider } from 'react-pusher-hoc';
import Pusher from 'pusher-js';

console.log(`${process.env.REACT_APP_API_URL}`)
console.log(`${process.env.APP_KEY}`)
console.log(`${process.env.APP_CLUSTER}`)
// const pusher = new Pusher('0eb0de6602610580c1bf', {
//     cluster:'eu',
//   });

ReactDOM.render(
    <Provider store={store}>
        {/* <PusherProvider value={pusher}> */}
            <App />
        {/* </PusherProvider>     */}
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
