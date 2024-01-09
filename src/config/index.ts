import IConfig from "../interfaces/config-interface";
import devConfigs from "./dev/dev-configs";
import prodConfigs from "./prod/prod-configs";

let configs: IConfig;

if (devConfigs.nodeEnv === "dev") {
  configs = devConfigs;
} else {
  configs = prodConfigs;
}

export default Object.freeze(configs);
