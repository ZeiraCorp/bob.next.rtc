import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import config from './app.config';
import Peer from 'peer';
import chalk from 'chalk';
import {MQTTBroker} from './mqtt/MQTTBroker';
import {MQTTClient} from './mqtt/MQTTClient';

import {SSEController} from './features/sse/sseController';
import {LanController} from './features/lan/lanController';
import {MobileController} from './features/mobile/mobileController';
import {MotionController} from './features/motion/motionController';


/**
 * ===============================================================
 * Certificates for SSL mode
 * ===============================================================
 */
let privateKey  = fs.readFileSync('key.pem', 'utf8');
let certificate = fs.readFileSync('cert.pem', 'utf8');
let credentials = {key: privateKey, cert: certificate};

/**
 * ===============================================================
 * MQTT Stuff
 * ===============================================================
 */
let mqttBroker = MQTTBroker.getInstance({mqttPort: config().mqttPort});
let mqttClient = MQTTClient.getInstance({
  mqttPort: config().mqttPort, 
  mqttBroker: "localhost", //config().hostName,
  id:"mediator",
  subscriptions:["messages/+", "sensors/+"]
});

/**
 * ===============================================================
 * Peer Server
 * TODO: Externalize
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
  console.log(chalk.green("connection:" + id));
});

server.on('disconnect', (id) => {
  console.log(chalk.green("disconnect:" + id));
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

app.use('/api/motion', new MotionController({
  mqttClient: mqttClient
}).router);

app.use('/api/sse', new SSEController({
  mqttClient: mqttClient
}).router);


let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);
//app.listen(httpPort);
httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

console.log(
  chalk.blue("Listening on (http):" + httpPort + " (https):" + httpsPort) +
  chalk.green(" and (peer):" + config().peerPort)
);

