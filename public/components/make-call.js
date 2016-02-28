/**
 * Created by k33g_org on 28/02/16.
 */
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class MakeCall {
  constructor(eventAggregator) {
    this.ea = eventAggregator;
    //nickName is the nickName of the person you want to reach
    this.nickName = "bob";
    this.peer = null;

    let subscriptionToPeerIsOpen = this.ea.subscribe('peerIsOpen', response => {
      this.peer = response.peer;
    });

  }

  attached() {}

  /**
   * Initiate a call
   */
  call() {
    console.log(this.nickName);
    let call = this.peer.call(this.nickName, window.localStream);
    this.ea.publish('callInitialized', {call: call});
    
  }
  
  endCall() {
    window.existingCall.close();
  }
}