declare module "express-session" {
  interface SessionData {
    userId: string;
  }
  interface Session extends SessionData {}
}
