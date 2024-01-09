import { Server, Socket } from "socket.io";
import { logger } from "../utils/log/logger";

export class SocketIOService {
  constructor(
    private readonly io: Server = io,
    private onlineUsers: string[] = []
  ) {
    this.onConnection();
  }
  private onConnection() {
    this.io.on("connection", (socket) => {
      logger.info(`New connection`, socket.id);
      this.onlineUsers.push(socket.id);

      // Handle disconnect event
      socket.on("disconnect", () => {
        this.onDisconnection(socket.id);
      });
    });
  }

  private onDisconnection(socketId: string) {
    logger.info(`Client disconnected`, socketId);
    this.removeUser(socketId);
  }
  onMessage() {}

  onError() {}

  private removeUser(socketId: string) {
    this.onlineUsers = this.onlineUsers.filter((u) => u !== socketId);
  }
}
