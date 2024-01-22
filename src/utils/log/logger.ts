import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
  },
  base: null,
  level: "debug",
  timestamp: () => `,"time":"${new Date().toLocaleTimeString()}"`,
});
