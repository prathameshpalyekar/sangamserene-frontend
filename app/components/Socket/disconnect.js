import socket from './index.js';

export default function disconnectSocket() {
    socket.disconnect();
}
