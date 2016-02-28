import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import config from './app.config';

import Peer from 'peer';


var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};


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

let app = express()
  , httpPort = config().httpPort
  , httpsPort = config().httpsPort;

app
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json());



app.get('/yo', (req, res) => {
  res.send('Hello World!');
});

app.get('/mob', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/mobile.html'));
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
//app.listen(httpPort);
httpServer.listen(httpPort);

httpsServer.listen(httpsPort);

console.log("Listening on (http):", httpPort, " (https):", httpsPort, " and (peer):", config().peerPort);

