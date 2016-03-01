# BoB:next:RTC



## Components

- [PeerServer](https://github.com/peers/peerjs-server)
- [PeerJS](http://peerjs.com)
- [Chalk](https://github.com/chalk/chalk)
- Semantic UI - 2.0.0
- Traceur (ES2015 server side)
- Babel (ES2015 front side)
- Mosca & MQTT.js
- Aurelia
- [https://github.com/webrtc/adapter](https://github.com/webrtc/adapter)

- [Stairways](https://github.com/k33g/stairways) - Experimental (functional) project

## Install

    WIP...
    - git clone
    - npm install
    - jspm install

    - generate certificate: ./gencertificate.sh

## Run

    node index.js

## Use

- mobile webapp [https://ip_of_your_server_name:4041/mob](https://ip_of_your_server_name:4041/mob) (*can't make call, only to receive call*)
- desktop webapp: [https://your_server_name:4041/](https://your_server_name:4041/)

## Remarks

### getUserMedia() no longer works on insecure origins

- use https
- create certificate: [http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/)