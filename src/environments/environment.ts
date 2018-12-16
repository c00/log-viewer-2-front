import { EnvironmentBase } from './environment.base';

//const ip = "192.168.1.109";
//const ip = "192.168.1.46";
const ip = "127.0.0.1";

export const environment: EnvironmentBase = {
  production: false,
  api: `http://${ip}/log-viewer-2/log-viewer-2-api/public/api/`,
  environment: 'Test'
};
