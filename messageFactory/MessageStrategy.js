/**
* The MessageStrategy.js
*
* This strategy is the parent of all message strategy modules. It is responsible
* for providing the name of the strategy given by its children.
*
* Author - Sze Yick
* Last Updated - 17/04/2017
*/
var util = require('util');

/**
* Constructor.
*/
function MessageStrategy() {
    this.name = "defaultIntent";
};

/*
* return the name of the strategy.
*/
MessageStrategy.prototype.getName = function() {
  return this.name;
}

module.exports = MessageStrategy;
