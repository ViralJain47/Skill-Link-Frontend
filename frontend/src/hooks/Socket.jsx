import { io } from "socket.io-client";
import { createContext } from "react";
import { useMemo } from "react";

const url = import.meta.env.VITE_API_URL;

const SocketContext = createContext();

const SocketProvider = ({ children, userID }) => {
  const socket = useMemo(() => {
    return io(url, {
      query: {
        userId: userID,
      },
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };