import pino from "pino";

import path from "node:path";

export const logger = pino(
  {
    transport: {
      target: "pino-pretty",
    },
    base: null,
    level: "debug",
    timestamp: () => `,"time":"${new Date().toLocaleTimeString()}"`,
  },
  pino.destination(path.join("./logs/pino-logger.log"))
);
