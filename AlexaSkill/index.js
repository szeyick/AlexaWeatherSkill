/**
* Index.js
*
* This is the entry point for the Amazon Alexa Skill responsible for providing
* weather information for Australian cities. The weather information is retrieved
* from the Bureau of Metereology (BOM).
*
* Author - Sze Yick
* Last Updated - 14/04/2017
*/
'use strict';
var Alexa = require('alexa-sdk');
var awsIotConnection = require('./awsIotConnection.js');
var constants = require('./constants.js');
var speechConstants = require('./speechConstants.js')

/**
* Entry point.
*/
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = constants.APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

/**
* Function Handlers
*/
var handlers = {
    'LaunchRequest': function () {
        var speechOutput = speechConstants.WELCOME_SPEECH;
        var prompt = speechConstants.WELCOME_PROMPT;
        this.emit(':ask', speechOutput, prompt);
    },
    'TemperatureIntent': function () {
        awsIotConnection.connect(this);
    },
    'WeatherReportIntent': function () {
        awsIotConnection.connect(this);
    },
    'RangeReportShortIntent': function () {
        awsIotConnection.connect(this);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = speechConstants.HELP_SPEECH;
        var reprompt = speechConstants.HELP_PROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', speechConstants.GOODBYE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', speechConstants.GOODBYE);
    }
};
