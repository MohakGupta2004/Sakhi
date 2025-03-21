import http from 'http';
import app from './app';
import { Socket, Server } from 'socket.io';
import { mentalHealthResponse } from './services/mentalHealthAi.service';
import jwt from 'jsonwebtoken';

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

type DecodedUser = {
  _id: string;
  email: string;
};

interface AuthSocket extends Socket {
  mentalhealth?: {
    _id: string;
    email: string;
  };
}

io.use((socket: AuthSocket, next) => {
  try {
    const token =
      socket.handshake.auth?.token?.split(" ")[1] ||
      socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    socket.mentalhealth = decoded;
    next();
  } catch (error) {
    return next(new Error("Invalid JWT"));
  }
});

io.on("connection", (socket: AuthSocket) => {
  if (!socket.mentalhealth) {
    socket.disconnect();
    return;
  }

  console.log(`SOCKET_ID: `, socket.id);
  socket.join(socket.mentalhealth._id);

 
socket.on("mentalhealth:message", async (data) => {
  if (!data || typeof data.message !== "string") {
    console.error("Invalid message received:", data);
    return;
  }

  const response = await mentalHealthResponse(data.message);
  io.to(socket.mentalhealth?._id as string).emit("mentalhealth:message", {
    message: response,
    sender: "AI",
  });
});

  socket.on("mentalhealth:disconnect", () => {
    socket.leave(socket.mentalhealth!._id);
    socket.disconnect(true);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.mentalhealth?._id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
