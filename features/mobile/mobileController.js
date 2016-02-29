/**
 * Created by k33g_org on 29/02/16.
 */
import {RoutesController} from '../../libs/routesController';
import path from 'path';

export class MobileController extends RoutesController {
  constructor(options) {
    super(options);
    this.router.get('/', (req, res) => this.serveMobileVersion(req, res));
  }

  serveMobileVersion(req, res) {
    res.sendFile(path.join(__dirname + '/../../public/mobile.html'));
  }
}

