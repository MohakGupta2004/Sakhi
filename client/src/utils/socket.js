import { io } from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {
  if (socketInstance && socketInstance.connected) {
    console.log("⚡ Reusing existing WebSocket connection:", socketInstance.id);
    return socketInstance;
  }

  console.log("🔄 Initializing WebSocket...");
  const options = {
    transports: ["websocket"],
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  };

  const token = localStorage.getItem("token");
  if (token) {
    options.auth = { token: `Bearer ${token}` };
  }

  if (projectId) {
    options.query = { projectId };
  }

  socketInstance = io("https://sakhi-nltm.onrender.com", options);

  socketInstance.on("connect", () => {
    console.log("✅ WebSocket Connected:", socketInstance.id);
  });

  socketInstance.on("disconnect", (reason) => {
    console.warn("⚠️ WebSocket Disconnected:", reason);
    socketInstance = null; // Reset instance so it can reconnect properly
  });

  socketInstance.on("connect_error", (error) => {
    console.error("❌ WebSocket Connection Error:", error);
  });

  return socketInstance;
};

export const sendMessage = (eventName, data) => {
  if (!socketInstance || !socketInstance.connected) {
    console.warn("⚠️ Cannot send message, socket not initialized or disconnected.");
    return;
  }
  console.log("📤 Sending message:", eventName, data);
  socketInstance.emit(eventName, data);
};
export const receiveMessage = (eventName, cb) => {
  if (!socketInstance) {
    console.warn("⚠️ No active socket connection.");
    return;
  }
  socketInstance.on(eventName, cb);
};
