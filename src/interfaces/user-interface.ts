interface IUser {
  id: string;
  username: string;
  avatar: string;
  lat?: number;
  long?: number;
  firebaseToken: string;
  isOnline?: boolean;
}

export default IUser;

