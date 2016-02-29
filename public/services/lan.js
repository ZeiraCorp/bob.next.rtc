/**
 * Created by k33g_org on 29/02/16.
 */
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class LanService {
  constructor(http) {
    console.log("LanService constructor")
    http.configure(config => {
      config.withBaseUrl('/api/lan');
    });
    this.http = http;
  }
  
  getIp() {
    return this.http.fetch("/ip").then(response=> response.json());
  }
}