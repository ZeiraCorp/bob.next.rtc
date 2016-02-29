/**
 * Created by k33g_org on 29/02/16.
 */
import {Optional, Result, Identity} from '../../libs/stairways.es2015';
import {RoutesController} from '../../libs/routesController';
import os from 'os';

let getIp = () => {
  let ifconfig = os.networkInterfaces();
  return Optional.ofNullable(ifconfig.en0[1].address);

};

export class LanController extends RoutesController {
  constructor(options) {
    super(options);

    this.router.get('/ip', (req, res) => this.Ip(req, res));
    
  }
  
  Ip(req, res) {
    res.send({ip: getIp().orElse("No address.")});
  }
}

