/**
 * Created by k33g_org on 29/02/16.
 */
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class MotionService {
  constructor(http) {
    console.log("MotionService constructor");
    /*
    http.configure(config => {
      config.withBaseUrl('/api/motion');
    });
    */
    this.http = http;
  }
  
  left() {
    return this.http.fetch("/api/motion/left").then(response=> response.json());
  }

  right() {
    return this.http.fetch("/api/motion/right").then(response=> response.json());
  }

  forward() {
    return this.http.fetch("/api/motion/forward").then(response=> response.json());
  }

  backward() {
    return this.http.fetch("/api/motion/backward").then(response=> response.json());
  }

  stop() {
    return this.http.fetch("/api/motion/stop").then(response=> response.json());
  }
  
  speed(speed) {
    return this.http.fetch(`/api/motion/speed/${speed}`).then(response=> response.json());
  }
  
  meepMeep() {
    return this.http.fetch("/api/motion/meepmeep").then(response=> response.json());

  }
}