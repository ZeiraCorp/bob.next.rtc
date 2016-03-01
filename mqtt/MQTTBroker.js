/**
 * Created by k33g_org on 29/02/16.
 */
import mosca from 'mosca';
import chalk from 'chalk';
import {Optional, Result, Identity} from '../libs/stairways.es2015';


export class MQTTBroker {

  static getInstance(options) {
    
    let mqttBroker = new mosca.Server({
      port: options.mqttPort
    });

    mqttBroker.on('clientConnected', (client) => {
      console.log(chalk.yellow('client connected:' + client.id));
    });

    // When a message is published
    mqttBroker.on('published', (packet, client) => {
      //TODO: How to get the topic?
      console.log(chalk.yellow("Message is published:" + Optional.ofNullable(client).orElse({id:""}).id + ":" +packet.payload.toString()));
      
    });

    // When a client subscribes to a topic
    mqttBroker.on('subscribed', (topic, client) => {
      console.log(chalk.yellow('subscribed : ' + topic + " by "+ client.id));
    });

    mqttBroker.on('clientDisconnected', (client) => {
      console.log(chalk.yellow('clientDisconnected : ' + client.id));
    });

    mqttBroker.on('ready', () => {
      console.log(chalk.yellow(`MQTT Broker is listening on ${options.mqttPort}`));
    });
    return mqttBroker;
  }

}


