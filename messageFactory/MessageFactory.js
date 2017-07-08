/**
* The MessageFactory.js
*
* This factory is responsible for constructing a JSON message that will be sent
* to AWS-IoT.
*
* Author - Sze Yick
* Last Updated - 17/04/2017
*/
var util = require('util');
var HashMap = require('hashmap');
var map = new HashMap();
var TemperatureIntentMessageStrategy = require('./TemperatureIntentMessageStrategy.js');
var WeatherReportIntentStrategy = require('./WeatherReportIntentStrategy.js');
var RangeReportShortIntentStrategy = require('./RangeReportShortIntentStrategy.js');

/**
* Constructor.
*/
function MessageFactory() {
  var temperatureIntent = new TemperatureIntentMessageStrategy();
  var weatherReportIntent = new WeatherReportIntentStrategy();
  var rangeReportShortIntent = new RangeReportShortIntentStrategy();
  map.set(temperatureIntent.getName(), temperatureIntent);
  map.set(weatherReportIntent.getName(), weatherReportIntent);
  map.set(rangeReportShortIntent.getName(), rangeReportShortIntent);
};

/**
* Create the message to send to AWS-IoT.
*/
MessageFactory.prototype.createMessage = function(callback) {
  var strategyName = callback.event.request.intent.name;
  var strategy = map.get(strategyName);
  return strategy.createMessage(callback);
}

module.exports = MessageFactory;
