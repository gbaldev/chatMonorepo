import { Platform } from 'react-native';
import { io } from 'socket.io-client';

/*
   Android and iOS handle localhost differently, to access from Android
    it should be specified as http://10.0.2.2:3000, instead, iOS works
    and MUST use localhost.
*/
const localhost = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
}) as string;

const socket = io(localhost);

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
