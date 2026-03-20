import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

export default function SocketHandler(req: NextApiRequest, res: any) {
  if (res.socket.server.io) {
    console.log("Socket sudah berjalan");
  } else {
    console.log("Socket baru diinisialisasi");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User terhubung:", socket.id);

      socket.on("start-analysis", (data) => {
        setTimeout(
          () =>
            socket.emit("progress", {
              status: "Scraping data...",
              percent: 30,
            }),
          1000,
        );
        setTimeout(
          () =>
            socket.emit("progress", {
              status: "Menganalisis dengan XGBoost...",
              percent: 70,
            }),
          3000,
        );
        setTimeout(
          () => socket.emit("analysis-finished", { result: "Selesai" }),
          5000,
        );
      });
    });
  }
  res.end();
}
