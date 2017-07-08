/**
* The awsIotConnection.js
*
* This module is responsible for connecting to the Raspberry Pi through AWS IoT.
*
* Author - Sze Yick
* Last Updated - 14/04/2017
*/
const deviceModule = require('aws-iot-device-sdk').device;
const iotConstants = require('./iotConstants.js');
const MessageFactory = require('./messageFactory/MessageFactory.js');
var constants = require('./constants.js');
var messageFactory = new MessageFactory();
// messageFactory.init();

/**
* Module functions.
*/
var awsIotConnection = module.exports = {
  connect: function(callback) {
    processConnect(callback);
  }
}

/**
* Process the connection request
*/
function processConnect(callback) {
  const device = deviceModule(iotConstants.configuration);
  device.subscribe('topic_1');

  device.on('connect', function() {
      console.log('Connected to AWS IoT.');
      var message = messageFactory.createMessage(callback);
      device.publish('topic_2', message);
    });
  device.on('offline', function() {
    console.log('Device is offline.');
  });
  device.on('error', function(error) {
    console.log('Received error - ', error);
  });
  device.on('message', function(topic, payload) {
    console.log('message recieved from topic - ', topic, payload.toString());
    var response = JSON.parse(payload.toString());
    device.unsubscribe('topic_1');
    var city = "Melbourne"; // Default to Melbourne if no city is provided.
    if (callback.event.request.intent.slots.cities.value) {
      console.log(callback.event.request.intent.slots.cities.value);
      var city = callback.event.request.intent.slots.cities.value;
    }
    // var speechOutput = "The current temperature in " + city + " is " + response.temperature + " degrees ";
    var speechOutput = "The current temperature is " + response.temperature + " degrees.";
    callback.emit(':tellWithCard', speechOutput, constants.SKILL_NAME, speechOutput)
  });
}
