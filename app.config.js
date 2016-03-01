import os from 'os';
import {Optional, Result, Identity} from './libs/stairways.es2015';

let getIp = () => {
  let ifconfig = os.networkInterfaces();
  return Optional.ofNullable(ifconfig.en0[1].address);

};

export default function config() {

  return {
    httpPort:8081,
    httpsPort:4041,
    peerPort:9000,
    peerPath:"/myapp",
    mqttPort: 1883,
    hostName: os.hostname(),
    hostIp: getIp().orElse("No address.")

  };

}

