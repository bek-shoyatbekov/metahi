export interface IOnlineUser {
  userId: string;
  socketId: string;
  username?: string;
  online?: boolean;
  avatar: string;
  lat?: number;
  long?: number;
}
