/**
 * Created by k33g_org on 29/02/16.
 */

import {RoutesController} from '../../libs/routesController';
import {TinyWorker} from '../../libs/tinyworker'

export class SSEController extends RoutesController {
  constructor(options) {
    super(options);
    
    this.mqttBroker = options.mqttBroker;
    this.openConnections = options.openConnections;
    this.worker = options.worker;
    
    this.router.get('/all', (req, res) => this.sse(req, res));

    this.router.get('/kill', (req, res) => this.killSseWorker(req, res));
  }

  killSseWorker(req, res) {
    this.worker.kill()
    delete this.worker;
    console.log("SSE Worker is killed.")
    res.json({message:"SSE Worker is killed."});
  }

  sse(req, res) {
    // set timeout as high as possible
    //req.socket.setTimeout(5000); //ms?

    // send headers for event-stream connection
    // see spec for more information
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('\n');

    // push this res object to our global variable
    this.openConnections.push(res);

    // When the request is closed, e.g. the browser window
    // is closed. We search through the open connections
    // array and remove this connection.
    req.on("close", function() {
      var toRemove;
      this.openConnections = this.openConnections != null ? this.openConnections : []
      for (var j =0 ; j < this.openConnections.length ; j++) {
        if (this.openConnections[j] == res) {
          toRemove =j;
          break;
        }
      }
      this.openConnections.splice(j,1);
      //console.log(this.openConnections.length);
    });
  }
  
}
