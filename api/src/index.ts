import http from 'http';
import app from './app';
import { Socket, Server } from 'socket.io';
import { mentalHealthResponse } from './services/mentalHealthAi.service';

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`SOCKET_ID: `, socket.id);

  socket.on("mentalhealth:message", async (data) => {
    if (!data || typeof data.message !== "string") {
      console.error("Invalid message received:", data);
      return;
    }

    const response = await mentalHealthResponse(data.message);
    io.emit("mentalhealth:message", {
      message: response,
      sender: "AI",
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
