import { io } from 'socket.io-client';
import ChatInstance from '../services/chatInstance';

const socket = io(ChatInstance.base);

export enum SocketEvents {
  JOIN = 'joinChat',
  JOIN_SUCCESS = 'joinSuccess',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  NEW_MESSAGE = 'newMessage',
  SEND_MESSAGE = 'sendMessage',
  CONNECTION = 'connection',
}

export default socket;
