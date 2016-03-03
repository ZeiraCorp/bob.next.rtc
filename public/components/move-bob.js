/**
 * Created by k33g_org on 01/03/16.
 */

import {inject} from 'aurelia-framework';
import {MotionService} from '../services/motion';

@inject(MotionService)
export class MoveBob {
  constructor(motionService) {
    this.speedValue = "slow";
    this.motionService = motionService;
  }
  
  left() {
    this.motionService.left().then(data => console.log("this.motionService.left", data))
  }

  right() {
    this.motionService.right().then(data => console.log("this.motionService.right", data))
  }

  forward() {
    this.motionService.forward().then(data => console.log("this.motionService.forward", data))
  }

  backward() {
    this.motionService.backward().then(data => console.log("this.motionService.backward", data))
  }

  stop() {
    this.motionService.stop().then(data => console.log("this.motionService.stop", data))
  }

  meepMeep() {
    this.motionService.meepMeep().then(data => console.log("this.motionService.meepMeep", data))
  }

  speed() {
    this.speedValue == "slow" ? this.speedValue = "fast" : this.speedValue = "slow";
    this.motionService.speed(this.speedValue).then(data => console.log("this.motionService.speed", this.speedValue, data))
  }
  
}