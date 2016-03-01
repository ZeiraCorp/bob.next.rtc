/**
 * Created by k33g_org on 29/02/16.
 */
import config from '../../app.config';
import {RoutesController} from '../../libs/routesController';

export class LanController extends RoutesController {
  constructor(options) {
    super(options);
    this.router.get('/ip', (req, res) => this.ip(req, res));
    this.router.get('/hostname', (req, res) => this.hostName(req, res));
    this.router.get('/hostinformations', (req, res) => this.hostInformations(req, res));
  }
  
  hostName(req, res) {
    res.send({hostname: config().hostName});
  }
  
  ip(req, res) {
    res.send({ip: config().hostIp});
  }

  hostInformations(req, res) {
    res.send({ip: config().hostIp, hostname: config().hostName});
  }

}

