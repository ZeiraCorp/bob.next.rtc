# BoB:next:RTC



## Components

- [PeerServer](https://github.com/peers/peerjs-server)
- [PeerJS](http://peerjs.com)
- Semantic UI - 2.0.0
- Traceur (ES2015 server side)
- Babel (ES2015 front side)
- Aurelia
- [https://github.com/webrtc/adapter](https://github.com/webrtc/adapter)

## Install

    WIP...
    - git clone
    - npm install
    - jspm install

    - generate certificate: ./gencertificate.sh

## Run

    node index.js

## Use

- mobile webapp [wip](wip) (*can't make call, only to receive call*)
- desktop webapp: [https://your_server_name:4041/](https://your_server_name:4041/)

## Remarks

### getUserMedia() no longer works on insecure origins

- use https
- create certificate: [http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/)