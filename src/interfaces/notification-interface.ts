interface INotification {
  title: string;
  body: string;
}

export default interface IMessage {
  notification: INotification;
  token: string;
}
