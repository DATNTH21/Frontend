'use client';

import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(process.env.NEXT_PUBLIC_API_URL, {
      autoConnect: true
    });
  }
  return socketInstance;
};

export const initializeSocket = async (userId: string) => {
  const socket = getSocket();

  if (socket.connected) {
    socket.disconnect();
  }

  socket.auth = { userId };
  socket.connect();

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socketInstance?.connected) {
    socketInstance.disconnect();
  }
};
