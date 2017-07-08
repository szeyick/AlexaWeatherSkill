/*
* The RangeReportShortIntentStrategy.js
*
* This message strategy is responsible for constructing a message to send to
* AWS IoT. It will respond to the inbound Range Report Short Intent.
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
function RangeReportShortIntentStrategy() {
  RangeReportShortIntentStrategy.super_.call(this);
  this.name = "RangeReportShortIntent";
};

/**
* return the message to send to AWS-IoT as a JSON String.
*/
RangeReportShortIntentStrategy.prototype.createMessage = function(callback) {
  console.log("Constructing " + this.name + " Message");
  var city = "Melbourne";
  var day = callback.event.request.intent.slots.day.value;
  if (callback.event.request.intent.slots.cities.value) {
     city = callback.event.request.intent.slots.cities.value;
  }

  return JSON.stringify({
      "intent": this.name,
      "city": city,
      "day": day
  });
}

util.inherits(RangeReportShortIntentStrategy, MessageStrategy);
module.exports = RangeReportShortIntentStrategy;
