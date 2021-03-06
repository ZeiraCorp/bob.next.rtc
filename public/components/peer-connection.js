/**
 * Created by k33g_org on 28/02/16.
 */
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable} from 'aurelia-framework';
import {LanService} from '../services/lan';

@inject(EventAggregator, LanService)
export class PeerConnection {
  /*
    === WARNING!!! ===
    never use camel case or pascal case with 
    bindable properties: only lower case
   */
  @bindable peerport;
  @bindable peerpath;
  constructor(eventAggregator, lanService) {
    this.ea = eventAggregator;
    this.lanService = lanService;

    this.host = window.location.host.split(':')[0];
    this.ea.subscribe('callInitialized', response => {
      this.startCommunication(response.call);
    });
  }
  
  startCommunication(call) {
    // Hang up on an existing call if present
    if (window.existingCall) {
      window.existingCall.close();
    }
    // Wait for stream on the call, then set peer video display
    call.on('stream', (stream) => {
      this.ea.publish('setPeerVideoDisplay', {
        src:URL.createObjectURL(stream),
        remotePeerId: call.peer
      });
      window.existingCall = call;
    });
    
    call.on('close', () => {
      // foo...
    })
    
  }
  
  attached() {
    console.log("host", this.host);
    console.log("peerPort", this.peerport);
    console.log("peerPath", this.peerpath);

    /* get some informations from host */
    //this.lanService.getIp().then(data => this.ip = data.ip).catch(err => this.ip = "--.--.--.--");
    //this.lanService.getHostName().then(data => this.hostname = data.hostname).catch(err => this.hostname = "john.doe.nowhere");

    this.lanService.getHostInformations().then(data => {
      this.ip = data.ip;
      this.hostname = data.hostname;
    }).catch(err => {
      this.ip = "--.--.--.--";
      this.hostname = "john.doe.nowhere";
    });

    /**
     * Create a peer connection for using signaling
     */
    this.peer = new Peer({host: this.host, port: Number(this.peerport), path: this.peerpath});

    /**
     * Open the connection to the Peer server
     */
    this.peer.on('open', () => {
      console.info("Peer connection", this.peer)
      //this.connectionId = this.peer.id;
      this.ea.publish('peerIdGenerated', {peerId:this.peer.id});
      this.ea.publish('peerIsOpen', {peer:this.peer});
      
    });
    /**
     * Receiving a call
     */
    this.peer.on('call', (call) => {
      // Answer the call automatically (instead of prompting user) for demo purposes
      call.answer(window.localStream);
      this.startCommunication(call);
    });


    this.peer.on('error', (err) => {
      console.error(err);
    });

    // Get things started
    // Get audio/video stream
    navigator.getUserMedia({audio: true, video: true}, (stream) => {
      // Set your video displays
      //$('#my-video').prop('src', URL.createObjectURL(stream));
      this.ea.publish('setPeerLocalVideoDisplay', {
        src:URL.createObjectURL(stream),
      });
      window.localStream = stream;

    }, () => {
      // foo... error
    });


  }
}