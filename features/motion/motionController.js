/**
 * Created by k33g_org on 01/03/16.
 */
import {RoutesController} from '../../libs/routesController';
import chalk from 'chalk';

/**
 * @class MotionController
 * 
 * Responsible of BoB motion
 * Waiting for command from the front end
 * then publish message to MQTT Broker
 */
export class MotionController extends RoutesController {
  constructor(options) {
    super(options);
    
    this.router.get('/left', (req, res) => this.left(req, res));
    this.router.get('/right', (req, res) => this.right(req, res));
    this.router.get('/forward', (req, res) => this.forward(req, res));
    this.router.get('/backward', (req, res) => this.backward(req, res));
    this.router.get('/stop', (req, res) => this.stop(req, res));

    this.router.get('/meepmeep', (req, res) => this.meepMeep(req, res));
    
    this.router.get('/speed/:speed', (req, res) => this.speed(req, res));

    this.mqttClient = options.mqttClient;
    
  }

  left(req, res) {
    console.log(chalk.blue("MotionController left"));
    this.mqttClient.publish('motion/left', JSON.stringify({
      action: "left"
    }));
    res.json({message:"ok"});
  }

  right(req, res) {
    console.log(chalk.blue("MotionController right"));
    this.mqttClient.publish('motion/right', JSON.stringify({
      action: "right"
    }));
    res.json({message:"ok"});
  }

  forward(req, res) {
    console.log(chalk.blue("MotionController forward"));
    this.mqttClient.publish('motion/forward', JSON.stringify({
      action: "forward"
    }));
    res.json({message:"ok"});
  }

  backward(req, res) {
    console.log(chalk.blue("MotionController backward"));
    this.mqttClient.publish('motion/backward', JSON.stringify({
      action: "backward"
    }));
    res.json({message:"ok"});
  }

  stop(req, res) {
    console.log(chalk.blue("MotionController stop"));
    this.mqttClient.publish('motion/stop', JSON.stringify({
      action: "stop"
    }));
    res.json({message:"ok"});
  }

  meepMeep(req, res) {
    console.log(chalk.blue("MotionController meep meep"));
    this.mqttClient.publish('motion/meepmeep', JSON.stringify({
      action: "meepMeep"
    }));
    res.json({message:"ok"});
  }
  
  
  speed(req, res) {
    console.log(chalk.blue("MotionController speed:" + req.params.speed));
    this.mqttClient.publish('motion/speed', JSON.stringify({
      action: "speed", speed:req.params.speed
    }));
    res.json({message:"ok"});
  }
}