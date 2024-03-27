'use client';

import {
  createContext, PropsWithChildren, useContext, useEffect, useState,
} from 'react';
import { io as ClientIO } from 'socket.io-client';
import { SocketContextType } from '@/types/socketIo';

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export default function SocketIoProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('disconnect', async () => {
      setIsConnected(false);
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // 임시 테스트 NEXT_PUBLIC_SOCKET_URL=http://10.10.10.16:8888
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SOCKET_URL, {});

    socketInstance.on('connect', async () => {
      setIsConnected(true);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
