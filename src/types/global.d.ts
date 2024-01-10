declare global {
  declare module "express-session" {
    export interface SessionData {
      userId?: string;
    }
  }
}
