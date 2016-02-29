import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import config from './app.config';
import {TinyWorker} from './libs/tinyworker'
import Peer from 'peer';
import {MQTTBroker} from './broker/MQTTBroker';


import {SSEController} from './features/sse/sseController';
import {LanController} from './features/lan/lanController';
import {MobileController} from './features/mobile/mobileController';


/**
 * ===============================================================
 * Certificates for SSL mode
 * ===============================================================
 */
var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

/**
 * ===============================================================
 * MQTT Broker
 * ===============================================================
 */

let mqttBroker = MQTTBroker.getInstance(config().mqttPort);

/**
 * ===============================================================
 * SSE Worker
 * ===============================================================
 */
let random = (maxNum) => {
  return Math.ceil(Math.random() * maxNum);
};

let openConnections = [];
let iotData = {};
// simulation of data
let dataWorker = new TinyWorker(iotData => {
  iotData.value = random(100);
});
dataWorker.start(iotData);

let sseWorker = new TinyWorker(options => {
  options.connections.forEach((resp) => {
    var d = new Date();
    resp.write('id: ' + d.getMilliseconds() + '\n');
    resp.write('data:' + JSON.stringify(options.data) +   '\n\n');
  });
});

sseWorker.start({
  connections: openConnections,
  data: iotData
});


/**
 * ===============================================================
 * Peer Server
 * ===============================================================
 */
let server = Peer.PeerServer({
  port: config().peerPort, 
  path: config().peerPath,
  ssl: {
    key: privateKey, 
    cert: certificate
  }
});

server.on('connection', (id) => {
  console.log("connection", id)
});

server.on('disconnect', (id) => {
  console.log("disconnect", id)
});


/**
 * ===============================================================
 * Express application
 * ===============================================================
 */
let app = express()
  , httpPort = config().httpPort
  , httpsPort = config().httpsPort;

app
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json());

/* --- routers --- */

app.use('/mob', new MobileController().router);

app.use('/api/lan', new LanController().router);

app.use('/api/sse', new SSEController({
  mqttBroker: mqttBroker,
  openConnections: openConnections,
  worker: sseWorker
}).router);


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
//app.listen(httpPort);
httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

console.log("Listening on (http):", httpPort, " (https):", httpsPort, " and (peer):", config().peerPort);

