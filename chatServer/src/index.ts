import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { User } from './models/user';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

interface Message {
    name: string;
    message: string;
    deviceId: string;
    sentAt: Date;
}

let users: User[] = [];
let messages: Message[] = [];

io.on('connection', (socket) => {
  console.log('New socket connection with Socket ID:', socket.id);

  socket.on('joinChat', (u: User) => {
    const { name, surname, deviceId } = u;
    const user: User = { name, surname, socketId: socket.id, deviceId, connectedAt: new Date() };
    users.push(user);
    socket.emit('joinSuccess', user);
  });

  socket.on('sendMessage', (message: Message) => {
    messages.push({...message, sentAt: new Date()});
    const user = users.find(user => user.socketId === socket.id);
    if (!user) {return};
    io.emit('newMessage', messages);
  })

  socket.on('disconnect', () => {
    const user = users.find(user => user.socketId === socket.id);
    if (user) {
      user.socketId = undefined;
      console.log(`User ${user.name} ${user.surname} disconnected`);
    } else {
        console.log(`Unidentified user disconnected with socket ID: ${socket.id}`);
    }

  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
