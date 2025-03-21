import { io } from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {
  if (socketInstance) return socketInstance; // Avoid multiple connections

  const token = localStorage.getItem("token");
  console.log("🔍 Token before sending:", token);

  const options = {
    transports: ["websocket"], // ✅ Force WebSocket only
    withCredentials: true, // ✅ Ensure credentials are sent
    reconnection: true, // ✅ Enable auto-reconnection
    reconnectionAttempts: 5, // ✅ Retry 5 times before giving up
    reconnectionDelay: 2000, // ✅ Wait 2s before trying again
  };

  if (token) {
    options.auth = { token: `Bearer ${token}` }; // ✅ Pass token only if it exists
  }

  if (projectId) {
    options.query = { projectId }; // ✅ Include only if defined
  }

  socketInstance = io("http://localhost:5000", options);

  socketInstance.on("connect", () => {
    console.log("✅ WebSocket Connected:", socketInstance?.id);
  });

  socketInstance.on("disconnect", (reason) => {
    console.warn("⚠️ WebSocket Disconnected:", reason);
  });

  socketInstance.on("connect_error", (error) => {
    console.warn("⚠️ WebSocket Connection Error:", error);
  });

  return socketInstance;
};

export const sendMessage = (eventName, data) => {
  if (!socketInstance) {
    console.warn("⚠️ Cannot send message, socket not initialized.");
    return;
  }
  socketInstance.emit(eventName, data);
};

export const receiveMessage = (eventName, cb) => {
  if (!socketInstance) {
    console.warn("⚠️ No active socket connection.");
    return;
  }
  socketInstance.on(eventName, cb);
};
