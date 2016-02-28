/**
 * Created by k33g_org on 28/02/16.
 */
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable} from 'aurelia-framework';

@inject(EventAggregator)
export class VideoCard {
  /*
   never use camel case or pascal case with bindable properties: only lower case
   */
  @bindable videoid;
  @bindable description;
  @bindable who;
  @bindable muted;
  @bindable remote;
  @bindable local;
  
  constructor(eventAggregator) {
    this.ea = eventAggregator;

    let subscriptionToLocalPeerIdGeneration = this.ea.subscribe('peerIdGenerated', response => {

      if(this.local=="true") {
        console.log("subscriptionToLocalPeerIdGeneration", response)
        this.who = response.peerId;
      }
    });
    
    let subscriptionToSetPeerVideoDisplay = this.ea.subscribe('setPeerVideoDisplay', response => {
      if(this.remote=="true") {
        console.log("subscriptionToSetPeerVideoDisplay", response)
        this.src = response.src;

        // UI stuff
        this.who = response.remotePeerId;
        
      }
    });

    let subscriptionToSetPeerLocalVideoDisplay = this.ea.subscribe('setPeerLocalVideoDisplay', response => {
      if(this.local=="true") {
        console.log("subscriptionToSetPeerLocalVideoDisplay", response)
        this.src = response.src;
      }
    });   
    
  }
  attached() {
    console.log("VideoCard", this);
  }
}