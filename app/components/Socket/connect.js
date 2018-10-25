import Alert from 'react-s-alert';
import axios from 'axios';
import socket from './index.js';

import Config from '../../config.js';

function connect(options) {
    socket.connect(options, (err) => {
        if (err) {
            Alert.error('Socket connection failed. Please refresh and try again.');
            return false;
        }
    });
}


export default function () {
    axios({
        withCredentials: true,
        url: `${Config.MAIN_API_BASE}/nes/auth`,
        method: 'get'
    }).then((xhrResponse) => {
        connect({auth: xhrResponse.data.token });
    }, (err) => {
        Alert.error('Socket authentication failed. Please refresh and try again.');
    });
}
