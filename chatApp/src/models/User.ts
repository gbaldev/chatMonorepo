interface User {
  name: string;
  surname: string;
  deviceId: string;
  socketId?: string;
  connectedAt: Date;
}

export default User;
