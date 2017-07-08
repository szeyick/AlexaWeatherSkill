/*
* The TemperatureIntentMessageStrategy.js
*
* This message strategy is responsible for constructing a message to send to
* AWS IoT. It will respond to the inbound Temperature Intent.
*
* The name of the strategy is required to match that of the intent it is responding
* to.
*
* Author - Sze Yick
* Last Updated - 17/04/2017
*/
var util = require('util');
var MessageStrategy = require('./MessageStrategy.js');

/**
* Constructor.
*/
function TemperatureIntentMessageStrategy() {
  TemperatureIntentMessageStrategy.super_.call(this);
  this.name = "TemperatureIntent";
};

/**
* return the message to send to AWS-IoT as a JSON String.
*/
TemperatureIntentMessageStrategy.prototype.createMessage = function(callback) {
  console.log("Constructing " + this.name + " Message");
  var city = "Melbourne";
  if (callback.event.request.intent.slots.cities.value) {
     city = callback.event.request.intent.slots.cities.value;
  }
  return JSON.stringify({
      "intent": this.name,
      "city": city
  });
}

util.inherits(TemperatureIntentMessageStrategy, MessageStrategy);
module.exports = TemperatureIntentMessageStrategy;
