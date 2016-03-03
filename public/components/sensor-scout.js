/**
 * Created by k33g_org on 03/03/16.
 */


import {inject} from 'aurelia-framework';
import {SSEService} from '../services/sse';

@inject(SSEService)
export class SensorScout {
  constructor(sseService) {
    this.sseService = sseService;
    this.distance = "";
  }
  attached() {
    this.sseService.initialize('/api/sse/all')
    this.sseService.onMessage((data) => {
      this.distance = data.distance;
    });
  }
}