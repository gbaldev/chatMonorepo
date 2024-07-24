import { io } from 'socket.io-client';
import ChatInstance from '../services/chatInstance';

const socket = io(ChatInstance.base);

export default socket;
