interface IConfig {
  port: number;
  mongodbURI: string;
  nodeEnv: string;
  sessionSecret: string;
  greetingInterval: number;
}

export default IConfig;
