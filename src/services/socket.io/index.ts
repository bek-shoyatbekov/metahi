import { Server, Socket } from "socket.io";

import { logger } from "../../utils/log/logger";
import { IOnlineUser } from "../../interfaces/online-user-interface";
import { AppError } from "../../utils/error/app-error";
import calculateDistance from "../../utils/geo-point/calculate-distance";
import User from "../../models/user-model";
import Greeting from "../../models/greeting-model";

let onlineUsers: IOnlineUser[] = [];

export class SocketIOService {
  private io!: Server;
  constructor() {}
  init(io: Server) {
    this.io = io;
  }

  run() {
    this.onConnection();
  }
  private onConnection() {
    this.io.on("connection", (socket) => {
      try {
        logger.info(`New connection : ${socket.id}`);

        this.addOnlineUser(socket);

        this.setOnline(socket);

        this.setLocation(socket);

        this.getUsers(socket);

        this.greet(socket);

        this.onDisconnection(socket);
      } catch (err) {
        this.handleError(err, socket.id);
      }
    });
  }

  private addOnlineUser(socket: Socket) {
    socket.on("login", async (userData) => {
      try {
        const user = await User.findOne({ id: userData.userId });

        if (!user) {
          throw new AppError("User not found", 400);
        }

        const isNewUser = onlineUsers.find((u) => u.userId == userData.userId);

        if (isNewUser) {
          socket.emit("error", { message: "User already online" });
          return;
        }

        onlineUsers.push({
          userId: userData.userId as string,
          avatar: user.avatar,
          socketId: socket.id,
          lat: userData.lat,
          long: userData.long,
          username: user.username,
          online: true,
        });
        socket.emit("success", true);
      } catch (err) {
        this.handleError(err, socket.id);
      }
    });
  }

  private setOnline(socket: Socket) {
    socket.on("online", (data) => {
      try {
        const { online, userId } = data;
        const user = onlineUsers.find((u) => u.userId === userId);
        if (!user) throw new AppError("No such user", 400);
        user.online = online;
        logger.info(user);
        socket.emit("success", true);
      } catch (err) {
        this.handleError(err, socket.id);
      }
    });
  }

  getUsers(socket: Socket) {
    socket.on("users", (data) => {
      try {
        const { maxDistance, userId } = data;
        const user = onlineUsers.find((u) => u.userId === userId);
        if (!user) throw new AppError("No such user", 400);
        const nearby = this.filterUserOnDistance(user.userId, maxDistance);
        socket.emit("users", nearby);
      } catch (err) {
        this.handleError(err, socket.id);
      }
    });
  }

  private filterUserOnDistance(userId: string, maxDistance: number) {
    const users = onlineUsers.filter(
      (u) => u.userId !== userId && u.online === true
    );

    const user = onlineUsers.filter((u) => u.userId === userId)[0];
    const nearby = users.filter((u) => {
      logger.debug({ u });
      const distance = calculateDistance(
        { latitude: u.lat! as number, longitude: u.long! as number },
        { latitude: user.lat! as number, longitude: user.long! as number }
      );
      logger.info(distance);
      return distance <= maxDistance;
    });

    return nearby;
  }

  setLocation(socket: Socket) {
    socket.on("location", (data) => {
      try {
        const { userId, lat, long } = data;
        const user = onlineUsers.find((u) => u.userId === userId);
        if (!user) throw new AppError("No such user", 400);
        user.lat = lat;
        user.long = long;
        logger.info(user);
        socket.emit("success", true);
      } catch (err) {
        this.handleError(err, socket.id);
      }
    });
  }

  private removeUser(socketId: string) {
    onlineUsers = onlineUsers.filter((u) => u.socketId !== socketId);
  }

  private greet(socket: Socket) {
    socket.on("greet", async (data) => {
      try {
        const { from, to, message } = data;
        const fromUser = onlineUsers.find((u) => u.userId === from);
        const toUser = onlineUsers.find((u) => u.userId === to);
        if (!fromUser || !toUser) throw new AppError("No such user", 400);
        const greeting = await Greeting.create({
          from: fromUser.userId,
          to: toUser.userId,
          message,
        });
        const result = await greeting.save();
        logger.info(result);
        this.io.to(toUser.socketId).emit("greet", { fromUser, message });
        socket.emit("success", true);
      } catch (err) {
        this.handleError(err, socket.id);
      }
    });
  }

  private handleError(err: any, socketId: string) {
    logger.error(err);
    this.io.to(socketId).emit("error", err?.message);
  }

  private onDisconnection(socket: Socket) {
    socket.on("disconnect", () => {
      try {
        logger.info(`Client disconnected : ${socket.id}`);
        this.removeUser(socket.id);
      } catch (err) {
        this.handleError(err, socket.id);
      }
    });
  }
}
