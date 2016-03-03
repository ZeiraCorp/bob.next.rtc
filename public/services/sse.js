/**
 * Created by k33g_org on 03/03/16.
 */

export class SSEService {

  constructor() {
    this.source = null;
  }
  
  initialize(url) {
    this.source = new EventSource(url);
  }
  
  onMessage(callback) {
    this.source.addEventListener('message', (e) => {
      callback(JSON.parse(e.data));
    }, false);
  }
  
}