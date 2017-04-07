/**
* Index.js
*
* This is the entry point for the Amazon Alexa Skill responsible for providing
* weather information for Australian cities. The weather information is retrieved
* from the Bureau of Metereology (BOM).
*
* Author - Sze Yick
* Last Updated - 29/03/2017
*/
'use strict';
var Alexa = require('alexa-sdk');
var Client = require('ftp');
var fs = require('fs');
var xml2js = require('xml2js');
var util = require('util');
var events = require('events');
var parser = new xml2js.Parser();
var c = new Client();
var eventEmitter = new events.EventEmitter();
var data = '';

// connect to ftp2.bom.gov.au on port:21 as anonymous
var connectionProperties = {
    host: "ftp2.bom.gov.au",
    user: "anonymous",
    password: "guest"
};

//OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var APP_ID = "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'BOM Weather';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        var speechOutput = "Hello this is the BOM weather skill, I can tell you the weather for cities around Australia";
        var prompt = "What weather information would you like to know?";
        this.emit(':ask', speechOutput, prompt);
    },
    'TemperatureIntent': function () {
      connected(this);
    },
    'GetTemperature': function () {
        // Get a temperature reading.
        var speechOutput = "This function will contact BOM to retrieve the file information";
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "I am here to tell you the weather. You can ask me for help, or you can say exit.";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};

/**
* Function to connect to the BOM FTP Server.
*/
function connected(callback) {
  console.log('Connecting to BOM.');
  c.connect(connectionProperties);
  getCurrentWeather(callback);
}

var currentTmp = '';
/**
* Function that is executed once the connection to the BOM FTP
* server is completed.
*/
function getCurrentWeather(callback) {
console.log('Connection Successful.');
c.get('anon/gen/fwo/IDV60920.xml', function(err, stream) {
  if (err) {
    throw err;
  }
  stream.once('close', function() {
    console.log("Closing");
    c.end();
  });
  stream.on('data', function(chunk) {
    console.log("Receiving Data");
    data += chunk;
  });
  stream.on('end', function() {
    console.log("End");
    parser.parseString(data, function (err, result) {
      console.log('Done');
      result.product.observations[0].station[0].period[0].level[0].element.forEach(function (el) {
        if (el.$.type === "air_temperature") {
          console.log(el.$.type); // Key
          currentTmp = el._;
          console.log(el._); // Value of the node.
        }
      });
  });
  var speechOutput = "The current temperature is " + currentTmp + " degrees ";
  callback.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
  });
});
}
