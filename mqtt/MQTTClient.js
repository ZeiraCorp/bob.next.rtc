/**
 * Created by k33g_org on 01/03/16.
 */
import chalk from 'chalk';
import mqtt from 'mqtt';

/**
 * ...
 */
export class MQTTClient {
  static getInstance(options) {
    
    let mqttPort = options.mqttPort;
    let mqttBroker = options.mqttBroker;
    this.id = options.id;
    let client = mqtt.connect(`mqtt://${mqttBroker}:${mqttPort}?clientId=${this.id}`);
    //let client = mqtt.connect(`mqtt://localhost:${mqttPort}?clientId=${this.id}`);


    //console.log("MQTTClient options", options)
    //console.log("MQTTClient", client)

    client.on("connect", () => {
      options.subscriptions.forEach(subscription => {
        client.subscribe(subscription);
      });
      //client.subscribe("messages/+");
      //client.subscribe("motion/+");
      //client.subscribe("sensors/+");

      console.log(chalk.magenta(`MQTT client ${this.id} is Listening ...`));

      client.publish('news', JSON.stringify({
        message: "I'm connected"
      }));

    });

    client.on('message', (topic, message) => {
      console.log(chalk.magenta("message on topic:" + topic + ":" + message.toString()));
      //let json = JSON.parse(message.toString());

    });
    
    return client;


  }

}
