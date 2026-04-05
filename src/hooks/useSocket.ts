import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { socketPath } from "../utils/const";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [progress, setProgress] = useState({ status: "", percent: 0 });

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch(socketPath);
      const newSocket = io();

      newSocket.on("progress", (data) => {
        setProgress(data);
      });

      setSocket(newSocket);
    };

    socketInitializer();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const startAnalysis = (payload: any) => {
    if (socket) socket.emit("start-analysis", payload);
  };

  return { progress, startAnalysis };
};
