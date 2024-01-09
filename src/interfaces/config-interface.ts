interface IConfig {
  port: number;
  mongodbURI: string;
  nodeEnv: string;
  sessionSecret: string;
}

export default IConfig;
