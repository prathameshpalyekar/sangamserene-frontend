import Nes from 'nes/client';
import Config from '../../config.js';

const socket = new Nes.Client(Config.SOCKET_URL);

export default socket;
